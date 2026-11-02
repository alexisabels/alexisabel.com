// @astrojs/vercel 7.x (el último compatible con Astro 4) solo conoce Node 18 y 20.
// Con cualquier otra versión escribe "nodejs18.x" en las funciones, y Vercel ya no
// acepta ese runtime. Este script corrige el runtime tras el build para que use la
// misma versión mayor de Node con la que Vercel ha construido el proyecto.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const FUNCTIONS_DIR = ".vercel/output/functions";
const major = Number(process.versions.node.split(".")[0]);
const runtime = `nodejs${major >= 22 ? major : 22}.x`;

async function* findConfigs(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* findConfigs(path);
    else if (entry.name === ".vc-config.json") yield path;
  }
}

for await (const file of findConfigs(FUNCTIONS_DIR)) {
  const config = JSON.parse(await readFile(file, "utf8"));
  if (typeof config.runtime === "string" && config.runtime.startsWith("nodejs")) {
    if (config.runtime !== runtime) {
      console.log(`[fix-vercel-runtime] ${file}: ${config.runtime} -> ${runtime}`);
      config.runtime = runtime;
      await writeFile(file, JSON.stringify(config, null, 2));
    }
  }
}

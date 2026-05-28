import { config, fields, collection } from "@keystatic/core";

// Modos de almacenamiento:
//   - 'local':   guarda en tu filesystem (sólo dev local). Sin auth.
//   - 'github':  edita desde el navegador en producción contra el repo,
//                login con GitHub via GitHub App. Necesita:
//                  storage: { kind: 'github', repo: 'alexisabels/alexisabel.com' }
//                  + crear un GitHub App: https://keystatic.com/docs/github-mode
//                  + setear KEYSTATIC_ENABLED=true y
//                    PUBLIC_KEYSTATIC_STORAGE_KIND=github en Vercel
// Nota: este archivo se ejecuta también en el navegador (admin UI de Keystatic),
// así que la variable de modo debe llevar prefijo PUBLIC_ y leerse vía import.meta.env.
const storage =
  import.meta.env.PUBLIC_KEYSTATIC_STORAGE_KIND === "github"
    ? ({
        kind: "github",
        repo: "alexisabels/alexisabel.com",
      } as const)
    : ({ kind: "local" } as const);

export default config({
  storage,
  ui: {
    brand: { name: "Alejandro Isabel · Blog" },
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/blog/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "date", "draft"],
      schema: {
        title: fields.slug({
          name: { label: "Título" },
          slug: {
            label: "Slug (URL)",
            description: "Se usa en /blog/<slug>",
          },
        }),
        description: fields.text({
          label: "Descripción",
          description: "Resumen corto para SEO y para el listado (~160 chars).",
          multiline: true,
          validation: { length: { min: 10, max: 240 } },
        }),
        date: fields.date({
          label: "Fecha de publicación",
          defaultValue: { kind: "today" },
        }),
        updated: fields.date({ label: "Última actualización" }),
        cover: fields.image({
          label: "Imagen de portada",
          directory: "public/blog/covers",
          publicPath: "/blog/covers/",
        }),
        coverAlt: fields.text({
          label: "Texto alternativo (cover)",
          description: "Importante para accesibilidad y SEO.",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        draft: fields.checkbox({
          label: "Borrador",
          description:
            "Si está marcado, el post no se publica en producción (sí en dev).",
          defaultValue: true,
        }),
        content: fields.mdx({
          label: "Contenido",
          description:
            "Markdown + componentes. Para diagramas usa ```mermaid; para mates, $LaTeX$.",
          options: {
            image: {
              directory: "public/blog/images",
              publicPath: "/blog/images/",
            },
          },
        }),
      },
    }),
  },
});

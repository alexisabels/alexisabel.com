import { visit } from "unist-util-visit";

export default function remarkMermaid() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (node.lang !== "mermaid" || !parent || index === undefined) return;
      parent.children[index] = {
        type: "mdxJsxFlowElement",
        name: "pre",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "className",
            value: "mermaid not-prose",
          },
        ],
        children: [{ type: "text", value: node.value }],
      };
    });
  };
}

import * as acorn from "acorn";
import * as acornWalk from "acorn-walk";

export const deriveCell = (source) => {
  const sourceCode = source.toString();
  const sourceTree = acorn.Parser.parse(sourceCode, {
    ecmaVersion: 2020,
  });

  const result = acornWalk.findNodeAfter(sourceTree, null, (type, node) => {
    return type === "FunctionDeclaration" || type === "ArrowFunctionExpression";
  });
  const node: any = result.node;

  return {
    index: null,
    source,
    info: {
      type: node.type,
      name: node.id?.name || null,
      params: node.params,
      expression: node.expression,
      generator: node.generator,
      async: node.async,
    },
  };
};

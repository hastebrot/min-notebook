import { test } from "zora";
import { Notebook } from "./notebook";
import { deriveCell } from "./parser";

test("compute single cell with function", async (t) => {
  const notebook = new Notebook();
  const cell_1 = notebook.cell(
    deriveCell(function cell_1() {
      return 1;
    })
  );
  t.equal(cell_1.info, {
    type: "FunctionDeclaration",
    name: "cell_1",
    params: [],
    expression: false,
    generator: false,
    async: false,
  });
  t.equal(await cell_1.compute(), { value: 1 });
});

test("compute single cell with generator function", async (t) => {
  const notebook = new Notebook();
  const cell_2 = notebook.cell(
    deriveCell(function* cell_2() {
      yield 1;
      yield 2;
    })
  );
  t.equal(cell_2.info, {
    type: "FunctionDeclaration",
    name: "cell_2",
    params: [],
    expression: false,
    generator: true,
    async: false,
  });
  t.equal(await cell_2.compute(), { value: 1 });
});

test("compute single cell with async function", async (t) => {
  const notebook = new Notebook();
  const cell_3 = notebook.cell(
    deriveCell(async function cell_3() {
      return await 1;
    })
  );
  t.equal(cell_3.info, {
    type: "FunctionDeclaration",
    name: "cell_3",
    params: [],
    expression: false,
    generator: false,
    async: true,
  });
  t.equal(await cell_3.compute(), { value: 1 });
});

test("compute single cell with arrow function", async (t) => {
  const notebook = new Notebook();
  const cell_4 = notebook.cell(
    deriveCell(() => {
      return 1;
    })
  );
  t.equal(cell_4.info, {
    type: "ArrowFunctionExpression",
    name: null,
    params: [],
    expression: false,
    generator: false,
    async: false,
  });
  t.equal(await cell_4.compute(), { value: 1 });
});

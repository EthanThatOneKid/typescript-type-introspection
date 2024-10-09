import { assert, assertEquals } from "@std/assert";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import {
  compileClassToInterface,
  getTypeBoxSchemaFromTreeSitterTypeScriptClass,
} from "./typescript-class.ts";
import {
  EXAMPLE_CAPTURES,
  EXAMPLE_CLASS_TREE_SITTER_CAPTURE_NAME_MAP,
  EXAMPLE_INTERFACE_CODE,
  EXAMPLE_TREE,
  ExamplePerson,
} from "./example-person.ts";

Deno.test("compileClassToInterface compiles a class to an interface", () => {
  const interfaceCode = compileClassToInterface(
    EXAMPLE_CAPTURES,
    EXAMPLE_CLASS_TREE_SITTER_CAPTURE_NAME_MAP,
  );
  assertEquals(interfaceCode, EXAMPLE_INTERFACE_CODE);
});

Deno.test("getTypeBoxSchemaFromTreeSitterTypeScriptClass gets the properties of a TypeScript class via Tree Sitter and returns a TypeBox schema", async () => {
  const schema = getTypeBoxSchemaFromTreeSitterTypeScriptClass(
    EXAMPLE_TREE,
    ExamplePerson.name,
  );
  const typeCheck = TypeCompiler.Compile(schema);
  const examplePerson = new ExamplePerson("Ethan", 23);
  assert(typeCheck.Check(examplePerson));
});

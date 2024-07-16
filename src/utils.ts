import ts from 'typescript';
import path from 'path';
import { generateSchema } from './schema';
import { JSONSchema7 } from 'json-schema';

// add name of type to list of strings
const getName = (node: ts.Node, typeNames: string[]) => {
  // ensure type or interface
  if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
    typeNames.push(node.name.escapedText.toString());
  }
};

// get the types and interface that exist in a file
const getTypesAndInterfaces = (filePath: string): string[] => {
  // build program for parsing
  const program = ts.createProgram([filePath], {});
  const typeNames: string[] = [];

  // get source file
  const sourceFile = program.getSourceFile(filePath);

  if (sourceFile) {
    // grab "statements" and iterate over them
    const statements = sourceFile.statements;
    for (const statement of statements) {
      getName(statement, typeNames);
    }
  } else {
    console.warn(`${filePath} cannot be parsed.`);
  }

  return typeNames;
};

// given a filepath, convert to folder of schemas
const filePathToSchemas = (filePath: string) => {
  const pathObj: path.ParsedPath = path.parse(filePath);
  if (pathObj.base !== 'types.ts' && pathObj.base !== 'types.tsx') {
    console.log(`[NOT types.ts or types.tsx]: ${filePath}`);
    return;
  }

  const types: string[] = getTypesAndInterfaces(filePath);
  for (const type of types) {
    generateSchema(pathObj.dir, pathObj.base, type, true);
    console.log(`${type} generated for ${filePath} in /schema/ subdir`);
  }
};

const prepSchema = (schema: object): JSONSchema7 => {
  return schema as JSONSchema7;
};

// const directoryToSchemas = () => {}

// filePathToSchemas(
//   '/Users/willcorcoran__/Work/MAX/schemaValidationPOC/test/types.ts'
// );

// filePathToSchemas(
//   '/Users/willcorcoran__/Work/MAX/schemaValidationPOC/test/validate.test.ts'
// );

export { getTypesAndInterfaces, filePathToSchemas, prepSchema };

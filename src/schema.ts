import { createGenerator, Config } from 'ts-json-schema-generator';
import { JSONSchema7 } from 'json-schema';
import { writeFileSync } from 'fs';
import path from 'path';

const generateSchema = (
  cwd: string,
  loc: string,
  type: string,
  save: boolean = false
): JSONSchema7 => {
  console.log(path.join(cwd, loc));
  // create schema config
  const config: Config = {
    path: path.join(cwd, loc),
    type: type,
  };

  // generate schema
  const schema: JSONSchema7 = createGenerator(config).createSchema(type);

  // add title if undefined
  if (schema.title === undefined) {
    schema.title = type;
  }

  // save to directory if save is true
  if (save) {
    saveSchema(cwd, schema);
  }

  // return schema
  return schema;
};

const saveSchema = (cwd: string, schema: JSONSchema7): boolean => {
  // check to make sure title exists
  if (schema.title === undefined) {
    console.error('schema title is undefined');
    return false;
  }

  // turn schema to string
  const jsonString: string = JSON.stringify(schema, null, 2);
  const address: string = `/schema/${schema.title}.json`;

  // try to write to correct address
  try {
    writeFileSync(address, jsonString, 'utf8');
  } catch {
    console.error(`failed to write to ${address}`);
    return false;
  }

  // return true if has failed
  return true;
};

export { generateSchema, saveSchema };

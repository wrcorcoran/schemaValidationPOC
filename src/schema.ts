import { createGenerator, Config } from 'ts-json-schema-generator';
import { JSONSchema7 } from 'json-schema';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import path, { dirname } from 'path';

const generateSchema = (
  cwd: string,
  loc: string,
  type: string,
  save: boolean = false
): JSONSchema7 => {
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
  const address: string = `${cwd}/schema/${schema.title}.json`;

  // try to write to correct address
  try {
    // grab directory from address
    const directory = dirname(address);

    // check if directory exists, if no, make it
    if (!existsSync(directory)) {
      mkdirSync(directory, { recursive: true });
    }

    writeFileSync(address, jsonString, 'utf8');
  } catch {
    console.error(`failed to write to ${address}`);
    return false;
  }

  // return true if has failed
  return true;
};

const loadSchema = (cwd: string, name: string): JSONSchema7 => {
  // open requested schema file and convert to JSONSchema7,
  // which we know it is, then return
  const file: JSONSchema7 = JSON.parse(
    readFileSync(`${cwd}/schema/${name}.json`, 'utf-8')
  ) as JSONSchema7;
  return file;
};

export { generateSchema, saveSchema, loadSchema };

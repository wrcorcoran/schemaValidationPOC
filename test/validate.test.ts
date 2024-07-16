import { JSONSchema7 } from 'json-schema';
import {
  isValidatedBySchema,
  generateSchema,
  saveSchema,
  loadSchema,
  getTypesAndInterfaces,
} from '../src/index';

import json1 from './data/test1.json';
import json2 from './data/test2.json';
import json3 from './data/test3.json';

describe('isValidatedBySchema Tests', () => {
  const filePath = `${process.cwd()}/test/types.ts`;
  const types = getTypesAndInterfaces(filePath);

  let schemas: JSONSchema7[] = [];
  for (const type of types) {
    const schema = generateSchema(
      `${process.cwd()}/test`,
      'types.ts',
      type,
      true
    );
    schemas.push(schema);
  }

  test('testing `getTypesAndInterfaces`', () => {
    expect(types).toEqual(['Foo', 'Bar']);
  });

  test('testing `loadSchema`', () => {
    for (let i = 0; i < types.length; i++) {
      const loaded = loadSchema(`${process.cwd()}/test`, types[i]);
      expect(loaded).toEqual(schemas[i]);
    }
  });

  const schema = schemas[0];

  test('completely correct', () => {
    expect(isValidatedBySchema(json1, schema)).toBe(true);
  });

  test('missing field', () => {
    expect(isValidatedBySchema(json2, schema)).toBe(false);
  });

  test('all fields, but incorrect types', () => {
    expect(isValidatedBySchema(json3, schema)).toBe(false);
  });
});

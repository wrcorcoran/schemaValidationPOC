import { isValidatedBySchema, generateSchema, saveSchema } from '../src/index';

import json1 from './data/test1.json';
import json2 from './data/test2.json';
import json3 from './data/test3.json';

describe('isValidatedBySchema Tests', () => {
  const schema = generateSchema(
    `${process.cwd()}/test/`,
    'types.ts',
    'Foo',
    false
  );

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

import { isValidatedBySchema, prepSchema } from '../src/index';

import json1 from './data/test1.json';
import json2 from './data/test2.json';

import FooSchema from './schema/foo.json';
import { Foo } from './types';

const example = (input: unknown) => {
  if (!isValidatedBySchema(input, prepSchema(FooSchema))) {
    console.log(`[FAILED VALIDATION] ${JSON.stringify(input)}`);
    return;
  }

  const data = input as Foo;

  console.log('[PASSED VALIDATION]');
  console.log(`bar1: ${data.bar1}`);
};

example(json1);
example(json2);

import { isValidatedBySchema, prepSchema } from '../../src/index';

import json1 from './data/test1.json';
import json2 from './data/test2.json';

import BarSchema from './schema/bar.json';
import { Bar } from './types';

const example = async (input: unknown) => {
  if (!isValidatedBySchema(input, prepSchema(BarSchema))) {
    console.log(`[FAILED VALIDATION] ${JSON.stringify(input)}`);
    return;
  }

  const data = input as Bar;

  console.log('[PASSED VALIDATION]');
  console.log(`bar1: ${data.foo1}`);
};

example(json1);
example(json2);

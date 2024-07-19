# README

## SchemaValidationPOC

The following is a proof of concept for a safe, lightweight, and efficient`type` and `interface` validator for unknown (typically, JSON) data.

**Note**: can easily be modified to work with just specific files/types/etc.

### Example Usage:

1. Store all types in a `types.ts` or `types.tsx` file. The directories do not matter as long as they are accessible by your entrypoint.
2. Run `./spider.sh {dir}` for each directory that you want to turn types into schemas. This will generate a schema for each type and interface in this directory and sub-directories. They can be accessed in the `/schema/` folder at the same-level.
3. Call the functionality as such:

```TypeScript
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
```

For reference, the `Bar` interface appeared as:

```TypeScript
export interface Bar {
  foo1: string;
}
```

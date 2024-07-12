import Ajv, { ValidateFunction } from 'ajv';
import { JSONSchema7 } from 'json-schema';

type validFn = ValidateFunction<{
  [x: string]: {};
}>;

const isValidatedBySchema = (data: unknown, schema: JSONSchema7): boolean => {
  const ajv: Ajv = new Ajv();
  const compSchema: validFn = ajv.compile(schema);

  return compSchema(data);
};

export { isValidatedBySchema };

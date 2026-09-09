import { errors } from '@strapi/utils';

export function validateStringArray(value: unknown, field: string): string[] | null | undefined {
  let normalizedValue = value;

  if (typeof normalizedValue === 'string') {
    try {
      normalizedValue = JSON.parse(normalizedValue);
    } catch {
      throw new errors.ValidationError(`${field} must be an array of strings`);
    }
  }

  if (
    normalizedValue != null &&
    (!Array.isArray(normalizedValue) || normalizedValue.some(item => typeof item !== 'string'))
  ) {
    throw new errors.ValidationError(`${field} must be an array of strings`);
  }

  return normalizedValue as string[] | null | undefined;
}

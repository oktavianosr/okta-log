import { errors } from '@strapi/utils';

export function validateStringArray(value: unknown, field: string): void {
  if (value != null && (!Array.isArray(value) || value.some(item => typeof item !== 'string'))) {
    throw new errors.ValidationError(`${field} must be an array of strings`);
  }
}

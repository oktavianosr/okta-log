import type { Core } from '@strapi/strapi';

export default ({ env }: Core.Config.Shared.ConfigParams) => ({
  exampleSeed: env.bool('EXAMPLE_SEED', false),
});

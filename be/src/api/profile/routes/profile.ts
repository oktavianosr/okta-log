import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::profile.profile', {
  only: ['find'],
  config: { find: { auth: false } },
});

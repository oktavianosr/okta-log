import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::post.post', {
  only: ['find', 'findOne'],
  config: { find: { auth: false }, findOne: { auth: false } },
});

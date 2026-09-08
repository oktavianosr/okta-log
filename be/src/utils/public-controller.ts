import { factories } from '@strapi/strapi';

import { forcePublishedQuery, forceSafeQuery } from './public-query';

type ContentType = Parameters<typeof factories.createCoreController>[0];

export function createPublishedController(
  uid: ContentType,
  populate: Record<string, unknown>,
  draftAndPublish = true,
) {
  return factories.createCoreController(uid, () => ({
    async find(ctx) {
      ctx.query = (draftAndPublish ? forcePublishedQuery : forceSafeQuery)(
        ctx.query,
        populate,
      ) as typeof ctx.query;
      return super.find(ctx);
    },
    async findOne(ctx) {
      ctx.query = (draftAndPublish ? forcePublishedQuery : forceSafeQuery)(
        ctx.query,
        populate,
      ) as typeof ctx.query;
      return super.findOne(ctx);
    },
  }));
}

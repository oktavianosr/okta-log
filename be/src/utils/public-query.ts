type Query = Record<string, unknown>;
type Populate = Record<string, unknown>;

export const publicPopulates = {
  profile: { avatar: true },
  project: { cover: true },
  post: {
    cover: true,
    tags: true,
    project: {
      filters: { publishedAt: { $notNull: true } },
      populate: { cover: true },
    },
  },
  tag: {},
} as const;

export function forcePublishedQuery(query: Query, populate: Populate): Query {
  return { ...forceSafeQuery(query, populate), status: 'published' };
}

export function forceSafeQuery(query: Query, populate: Populate): Query {
  const { populate: _populate, status: _status, ...safeQuery } = query;
  return { ...safeQuery, populate };
}

import { z } from 'zod';
const mediaSchema = z
    .object({
        alternativeText: z.string().nullable().optional(),
        url: z.string(),
    })
    .nullable()
    .optional();
const strings = z
    .array(z.string())
    .nullish()
    .transform((value) => value ?? []);
export const tagSchema = z.object({
    documentId: z.string(),
    name: z.string(),
    slug: z.string(),
});
export const profileSchema = z.object({
    avatar: mediaSchema,
    bio: z.string().nullish(),
    documentId: z.string(),
    email: z.string().nullish(),
    githubUrl: z.string().nullish(),
    headline: z.string(),
    linkedinUrl: z.string().nullish(),
    location: z.string().nullish(),
    name: z.string(),
    skills: strings,
});
export const projectSchema = z.object({
    body: z.string().nullish(),
    category: z.string().nullish(),
    cover: mediaSchema,
    demoUrl: z.string().nullish(),
    documentId: z.string(),
    featured: z.boolean().nullish(),
    repositoryUrl: z.string().nullish(),
    slug: z.string(),
    summary: z.string(),
    technologies: strings,
    title: z.string(),
});
export const postSchema = z.object({
    activityDate: z.string(),
    body: z.string().nullish(),
    cover: mediaSchema,
    documentId: z.string(),
    excerpt: z.string(),
    featured: z.boolean().nullish(),
    kind: z.enum(['article', 'update', 'solution']),
    project: projectSchema.nullish(),
    slug: z.string(),
    tags: z
        .array(tagSchema)
        .nullish()
        .transform((value) => value ?? []),
    title: z.string(),
});
export const paginationSchema = z.object({
    page: z.number(),
    pageCount: z.number(),
    pageSize: z.number(),
    total: z.number(),
});

import type { z } from 'zod';

import type {
    postSchema,
    profileSchema,
    projectSchema,
    tagSchema,
} from '@/lib/content-schema';
export type Profile = z.infer<typeof profileSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Post = z.infer<typeof postSchema>;
export type Tag = z.infer<typeof tagSchema>;
export type PostKind = Post['kind'];
export interface PostFilters {
    kind: 'all' | PostKind;
    page: number;
    search: string;
}

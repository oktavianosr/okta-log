import type { z } from 'zod';

import type { ApiPagination } from '@/types/api';
import type { QueryViewState } from '@/types/component';
import type { Post } from '@/types/content';

import type { postSearchSchema } from './schema';
export type PostSearch = z.infer<typeof postSearchSchema>;
export interface PostListViewProps extends QueryViewState {
    compact: boolean;
    fetching: boolean;
    filters: PostSearch;
    meta?: ApiPagination;
    onFilters: (filters: Partial<PostSearch>) => void;
    posts: Post[];
}

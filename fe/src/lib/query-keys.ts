import type { PostFilters } from '@/types/content';
export const queryKeys = {
    posts: {
        all: ['posts'] as const,
        detail: (slug: string) => ['posts', 'detail', slug] as const,
        list: (filters: PostFilters) => ['posts', 'list', filters] as const,
    },
    profile: ['profile'] as const,
    projects: {
        all: ['projects'] as const,
        detail: (slug: string) => ['projects', 'detail', slug] as const,
        list: (page: number) => ['projects', 'list', page] as const,
    },
} as const;

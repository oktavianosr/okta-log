import { normalizeList } from '@/lib/api';
import { isDemo, publicApi } from '@/lib/axios';
import { buildPostParams } from '@/lib/content';
import { postSchema } from '@/lib/content-schema';
import { demoPosts } from '@/lib/demo-data';
import type { PostFilters } from '@/types/content';
export async function fetchPosts(filters: PostFilters) {
    if (isDemo) {
        const search = filters.search.trim().toLowerCase();
        const all = demoPosts.filter(
            (post) =>
                (filters.kind === 'all' || post.kind === filters.kind) &&
                (post.title + ' ' + post.excerpt).toLowerCase().includes(search)
        );
        return {
            data: all.slice((filters.page - 1) * 6, filters.page * 6),
            message: '',
            meta: {
                page: filters.page,
                pageCount: Math.ceil(all.length / 6),
                pageSize: 6,
                total: all.length,
            },
            success: true,
        };
    }
    const response = await publicApi.get('/posts', {
        params: buildPostParams(filters),
    });
    return normalizeList(response.data, postSchema);
}
export async function fetchPost(slug: string) {
    if (isDemo)
        return {
            data: demoPosts.find((post) => post.slug === slug) ?? null,
            message: '',
            success: true,
        };
    const params = buildPostParams({ kind: 'all', page: 1, search: '' });
    params.set('filters[slug][$eq]', slug);
    const response = await publicApi.get('/posts', { params });
    return {
        data: normalizeList(response.data, postSchema).data[0] ?? null,
        message: '',
        success: true,
    };
}

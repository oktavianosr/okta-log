import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { fetchPosts } from '@/api/posts';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { queryKeys } from '@/lib/query-keys';

import { postSearchSchema } from './schema';
import type { PostSearch } from './types';
import PostListView from './view';
export default function PostList({ compact = false }: { compact?: boolean }) {
    const filters = postSearchSchema.parse(useSearch({ strict: false }));
    const navigate = useNavigate();
    const search = useDebouncedValue(filters.search);
    const queryFilters = { ...filters, search };
    const query = useQuery({
        placeholderData: keepPreviousData,
        queryFn: () => fetchPosts(queryFilters),
        queryKey: queryKeys.posts.list(queryFilters),
    });
    function onFilters(update: Partial<PostSearch>) {
        void navigate({
            replace: update.search !== undefined,
            resetScroll: false,
            search: { ...filters, page: 1, ...update },
            to: compact ? '/' : '/posts',
        });
    }
    return (
        <PostListView
            compact={compact}
            error={query.isError}
            fetching={query.isFetching}
            filters={filters}
            loading={query.isPending}
            meta={query.data?.meta}
            onFilters={onFilters}
            onRetry={() => {
                void query.refetch();
            }}
            posts={query.data?.data ?? []}
        />
    );
}

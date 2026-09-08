import { useQuery } from '@tanstack/react-query';

import { fetchPost } from '@/api/posts';
import { usePageMeta } from '@/hooks/use-page-meta';
import { queryKeys } from '@/lib/query-keys';

import PostDetailView from './view';
export default function PostDetail({ slug }: { slug: string }) {
    const query = useQuery({
        queryFn: () => fetchPost(slug),
        queryKey: queryKeys.posts.detail(slug),
    });
    usePageMeta(
        query.data?.data?.title ?? 'Detail catatan',
        query.data?.data?.excerpt
    );
    return (
        <PostDetailView
            error={query.isError}
            loading={query.isPending}
            onRetry={() => {
                void query.refetch();
            }}
            post={query.data?.data ?? null}
        />
    );
}

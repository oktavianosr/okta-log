import { createLazyFileRoute } from '@tanstack/react-router';

import PostList from '@/features/posts/list';
import { usePageMeta } from '@/hooks/use-page-meta';
function PostsPage() {
    usePageMeta(
        'Catatan',
        'Catatan pekerjaan, solusi, dan pelajaran dari perjalanan sebagai developer.'
    );
    return <PostList />;
}
export const Route = createLazyFileRoute('/posts/')({ component: PostsPage });

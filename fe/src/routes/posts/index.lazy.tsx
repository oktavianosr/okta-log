import { createLazyFileRoute } from '@tanstack/react-router';

import PostList from '@/features/posts/list';
import { usePageMeta } from '@/hooks/use-page-meta';
function PostsPage() {
    usePageMeta(
        'Notes',
        'Work notes, solutions, and lessons from a developer journey.'
    );
    return <PostList />;
}
export const Route = createLazyFileRoute('/posts/')({ component: PostsPage });

import { createLazyFileRoute } from '@tanstack/react-router';

import PostDetail from '@/features/posts/details';
function PostPage() {
    const { slug } = Route.useParams();
    return <PostDetail slug={slug} />;
}
export const Route = createLazyFileRoute('/posts/$slug')({
    component: PostPage,
});

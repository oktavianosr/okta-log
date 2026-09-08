import { createFileRoute } from '@tanstack/react-router';

import { postSearchSchema } from '@/features/posts/list/schema';
export const Route = createFileRoute('/posts/')({
    validateSearch: postSearchSchema,
});

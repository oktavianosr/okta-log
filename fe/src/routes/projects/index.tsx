import { createFileRoute } from '@tanstack/react-router';

import { projectSearchSchema } from '@/features/portfolio/list/schema';
export const Route = createFileRoute('/projects/')({
    validateSearch: projectSearchSchema,
});

import { createLazyFileRoute } from '@tanstack/react-router';

import ProjectList from '@/features/portfolio/list';
export const Route = createLazyFileRoute('/projects/')({
    component: ProjectList,
});

import { createLazyFileRoute } from '@tanstack/react-router';

import ProjectDetail from '@/features/portfolio/details';
function ProjectPage() {
    const { slug } = Route.useParams();
    return <ProjectDetail slug={slug} />;
}
export const Route = createLazyFileRoute('/projects/$slug')({
    component: ProjectPage,
});

import { useQuery } from '@tanstack/react-query';

import { fetchProject } from '@/api/projects';
import { usePageMeta } from '@/hooks/use-page-meta';
import { queryKeys } from '@/lib/query-keys';

import ProjectDetailView from './view';
export default function ProjectDetail({ slug }: { slug: string }) {
    const query = useQuery({
        queryFn: () => fetchProject(slug),
        queryKey: queryKeys.projects.detail(slug),
    });
    usePageMeta(
        query.data?.data?.title ?? 'Project details',
        query.data?.data?.summary
    );
    return (
        <ProjectDetailView
            error={query.isError}
            loading={query.isPending}
            onRetry={() => {
                void query.refetch();
            }}
            project={query.data?.data ?? null}
        />
    );
}

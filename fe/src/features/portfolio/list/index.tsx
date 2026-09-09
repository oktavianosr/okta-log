import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { fetchProjects } from '@/api/projects';
import { usePageMeta } from '@/hooks/use-page-meta';
import { queryKeys } from '@/lib/query-keys';

import { projectSearchSchema } from './schema';
import ProjectListView from './view';
export default function ProjectList() {
    usePageMeta(
        'Projects',
        'A collection of projects, experiments, and the stories behind them.'
    );
    const { page } = projectSearchSchema.parse(useSearch({ strict: false }));
    const navigate = useNavigate();
    const query = useQuery({
        placeholderData: keepPreviousData,
        queryFn: () => fetchProjects(page),
        queryKey: queryKeys.projects.list(page),
    });
    return (
        <ProjectListView
            error={query.isError}
            fetching={query.isFetching}
            loading={query.isPending}
            meta={query.data?.meta}
            onPage={(next) => {
                void navigate({ search: { page: next }, to: '/projects' });
            }}
            onRetry={() => {
                void query.refetch();
            }}
            projects={query.data?.data ?? []}
        />
    );
}

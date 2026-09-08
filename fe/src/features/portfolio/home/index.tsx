import { useQuery } from '@tanstack/react-query';

import { fetchProfile } from '@/api/profile';
import { fetchProjects } from '@/api/projects';
import PostList from '@/features/posts/list';
import { usePageMeta } from '@/hooks/use-page-meta';
import { queryKeys } from '@/lib/query-keys';

import HomeView from './view';
export default function Home() {
    usePageMeta('Portofolio & Catatan');
    const profile = useQuery({
        queryFn: fetchProfile,
        queryKey: queryKeys.profile,
    });
    const projects = useQuery({
        queryFn: () => fetchProjects(1),
        queryKey: queryKeys.projects.list(1),
    });
    return (
        <HomeView
            feed={<PostList compact />}
            profile={profile.data?.data ?? null}
            profileState={{
                error: profile.isError,
                loading: profile.isPending,
                onRetry: () => {
                    void profile.refetch();
                },
            }}
            projects={
                projects.data?.data
                    .filter((project) => project.featured)
                    .slice(0, 2) ?? []
            }
            projectState={{
                error: projects.isError,
                loading: projects.isPending,
                onRetry: () => {
                    void projects.refetch();
                },
            }}
            projectTotal={projects.data?.meta?.total ?? 0}
        />
    );
}

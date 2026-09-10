import Pagination from '@/components/data/pagination';
import ProjectCard from '@/components/data/project-card';
import DataState from '@/components/fallback/data-state';

import type { ProjectListViewProps } from './types';
export default function ProjectListView({
    fetching,
    meta,
    onPage,
    projects,
    ...state
}: ProjectListViewProps) {
    return (
        <>
            <header className="page-header">
                <div className="eyebrow">PORTOFOLIO / SELECTED WORK</div>
                <h1>From idea to reality</h1>
                <p>
                    A collection of projects and experiments. Each piece
                    embodies its own process, decisions, and lessons.
                </p>
            </header>
            <section
                aria-busy={fetching}
                aria-label="Project list"
                className="page-content"
            >
                <DataState
                    {...state}
                    empty={projects.length === 0}
                    emptyDescription="Published projects will appear here."
                    emptyTitle="No projects yet"
                >
                    <div className="project-grid">
                        {projects.map((project, index) => (
                            <ProjectCard
                                index={index}
                                key={project.documentId}
                                project={project}
                            />
                        ))}
                    </div>
                </DataState>
                <Pagination disabled={fetching} meta={meta} onPage={onPage} />
            </section>
        </>
    );
}

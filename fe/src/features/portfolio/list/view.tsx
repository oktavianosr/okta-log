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
                <h1>Dari ide menjadi nyata.</h1>
                <p>
                    Kumpulan proyek dan eksperimen. Setiap karya menyimpan
                    proses, keputusan, dan pelajarannya sendiri.
                </p>
            </header>
            <section
                aria-busy={fetching}
                aria-label="Daftar proyek"
                className="page-content"
            >
                <DataState
                    {...state}
                    empty={projects.length === 0}
                    emptyDescription="Proyek yang telah dipublikasikan akan tampil di sini."
                    emptyTitle="Belum ada proyek"
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

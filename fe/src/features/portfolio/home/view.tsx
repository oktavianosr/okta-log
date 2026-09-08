import { Link } from '@tanstack/react-router';
import { ArrowRight, Asterisk } from 'lucide-react';

import ProjectCard from '@/components/data/project-card';
import DataState from '@/components/fallback/data-state';

import ProfileCard from './components/profile-card';
import type { HomeViewProps } from './types';
export default function HomeView({
    feed,
    profile,
    profileState,
    projects,
    projectState,
    projectTotal,
}: HomeViewProps) {
    return (
        <>
            <section className="hero">
                <div>
                    <div className="eyebrow">
                        <span className="dot" />
                        PORTOFOLIO & CATATAN PERSONAL
                    </div>
                    <h1>
                        Yang dibangun.
                        <br />
                        <span>Yang dipelajari.</span>
                    </h1>
                    <p>
                        Proyek, eksperimen, dan cerita di balik penyelesaian
                        masalah. Mendokumentasikan perjalanan, satu catatan
                        setiap waktu.
                    </p>
                </div>
                <div aria-hidden="true" className="hero-art">
                    <div className="orbit" />
                    <div className="orbit two" />
                    <div className="core-mark">
                        <Asterisk size={65} strokeWidth={1.8} />
                    </div>
                    <span className="art-label">a work in progress ↗</span>
                </div>
            </section>
            <div className="content-grid">
                <aside aria-label="Tentang penulis" className="profile">
                    <DataState
                        {...profileState}
                        empty={!profile}
                        emptyDescription="Profil penulis akan tampil setelah dipublikasikan."
                        emptyTitle="Profil belum tersedia"
                    >
                        {profile && <ProfileCard profile={profile} />}
                    </DataState>
                </aside>
                <div className="min-w-0">
                    <section aria-labelledby="projects-heading">
                        <div className="section-head">
                            <h2 id="projects-heading">
                                Proyek pilihan{' '}
                                <span className="section-count">
                                    {projects.length
                                        .toString()
                                        .padStart(2, '0')}
                                </span>
                            </h2>
                            <Link className="text-link" to="/projects">
                                Semua proyek <ArrowRight size={14} />
                                <span className="sr-only">
                                    ({projectTotal})
                                </span>
                            </Link>
                        </div>
                        <DataState
                            {...projectState}
                            empty={projects.length === 0}
                            emptyTitle="Proyek pilihan belum tersedia"
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
                    </section>
                    <div className="feed-section">{feed}</div>
                </div>
            </div>
        </>
    );
}

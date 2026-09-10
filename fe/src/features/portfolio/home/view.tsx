import { Link } from '@tanstack/react-router';
import { ArrowRight, Asterisk } from 'lucide-react';

import ProjectCard from '@/components/data/project-card';
import DataState from '@/components/fallback/data-state';
import { Marquee } from '@/components/ui/marquee';

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
                        <Marquee pauseOnHover reverse={false}>
                            <span className="mx-4 w-full text-xl font-bold">
                                PORTOFOLIO & PERSONAL NOTES
                            </span>
                        </Marquee>
                    </div>
                    <h1>
                        What I’ve built.
                        <br />
                        <span>What I've learned</span>
                    </h1>
                    <p>
                        Projects, experiments, and the stories behind solving
                        problems. Documenting the journey, one entry at a time.
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
                <aside aria-label="About the author" className="profile">
                    <DataState
                        {...profileState}
                        empty={!profile}
                        emptyDescription="The author profile will appear once published."
                        emptyTitle="Profile unavailable"
                    >
                        {profile && <ProfileCard profile={profile} />}
                    </DataState>
                </aside>
                <div className="min-w-0">
                    <section aria-labelledby="projects-heading">
                        <div className="section-head">
                            <h2 id="projects-heading">
                                Selected Project{' '}
                                <span className="section-count">
                                    {projects.length
                                        .toString()
                                        .padStart(2, '0')}
                                </span>
                            </h2>
                            <Link className="text-link" to="/projects">
                                All projects <ArrowRight size={14} />
                                <span className="sr-only">
                                    ({projectTotal})
                                </span>
                            </Link>
                        </div>
                        <DataState
                            {...projectState}
                            empty={projects.length === 0}
                            emptyTitle="Selected projects unavailable"
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

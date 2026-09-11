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
                            <span className="mx-4 w-1/2 text-xl font-bold">
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
                    {/* <div className="orbit" />
                    <div className="orbit two" />
                    <div className="core-mark">
                        <Asterisk size={65} strokeWidth={1.8} />
                    </div> */}
                    <img alt="Closing Tag" draggable="false" src="/assets/end-of-block.png"/>
                    <span className="art-label">ever-evolving ↗</span>
                </div>
            </section>
            {/* Describe Myself */}
            {/* <div className='content-grid'> */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* <!-- Left Info Block --> */}
            <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-mono">
            <span>IDENTITY &amp; PHILOSOPHY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                            Engineering with craft,<br/>purpose &amp; precision.
                        </h2>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                            I am <span className="text-white font-medium">Oktaviano Sahru</span>, a Professional Full-Stack Developer dedicated to transforming complex challenges into sleek, human-centered digital experiences.
                        </p>
            {/* <!-- Quick Stats Grid --> */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/[0.06]">
            <div>
            <div className="text-2xl font-bold text-white font-mono">5+</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mt-0.5">Years Exp.</div>
            </div>
            <div>
            <div className="text-2xl font-bold text-white font-mono">40+</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mt-0.5">Projects</div>
            </div>
            <div>
            <div className="text-2xl font-bold text-white font-mono">100%</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mt-0.5">Commitment</div>
            </div>
            </div>
            </div>
            {/* <!-- Right Narrative & Stack Highlights --> */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4 text-neutral-300 text-sm md:text-base leading-relaxed">
            <p>
                            Specializing in modern JavaScript/TypeScript ecosystems, I bridge architectural thinking with thoughtful UI aesthetics. Whether engineering robust backend microservices or creating pixel-perfect, responsive client architectures, I treat every project as an evolving craftsmanship challenge.
                            </p>
            <p className="text-neutral-400">
                            When I'm not writing production code, you can find me analyzing emerging tech frameworks, writing technical insights, and contributing to developer communities.
                            </p>
            </div>
            {/* <!-- Tech Stack Tags --> */}
            <div>
            <span className="block text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">Core Technologies</span>
            <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded bg-neutral-800/80 border border-neutral-700 text-xs font-mono text-neutral-200">React &amp; Next.js</span>
            <span className="px-3 py-1 rounded bg-neutral-800/80 border border-neutral-700 text-xs font-mono text-neutral-200">TypeScript</span>
            <span className="px-3 py-1 rounded bg-neutral-800/80 border border-neutral-700 text-xs font-mono text-neutral-200">Node.js</span>
            <span className="px-3 py-1 rounded bg-neutral-800/80 border border-neutral-700 text-xs font-mono text-neutral-200">Tailwind CSS</span>
            <span className="px-3 py-1 rounded bg-neutral-800/80 border border-neutral-700 text-xs font-mono text-neutral-200">GraphQL / REST</span>
            <span className="px-3 py-1 rounded bg-neutral-800/80 border border-neutral-700 text-xs font-mono text-neutral-200">PostgreSQL / MongoDB</span>
            <span className="px-3 py-1 rounded bg-neutral-800/80 border border-neutral-700 text-xs font-mono text-neutral-200">Cloud Architecture</span>
            </div>
            </div>
            </div>
            </div>
            {/* </div> */}
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

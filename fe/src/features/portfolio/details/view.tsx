import { Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';

import Markdown from '@/components/data/markdown';
import DataState from '@/components/fallback/data-state';
import NotFound from '@/components/fallback/not-found';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { safeUrl } from '@/lib/content';
import { mediaUrl } from '@/lib/media';

import type { ProjectDetailViewProps } from './types';
export default function ProjectDetailView({
    project,
    ...state
}: ProjectDetailViewProps) {
    if (!state.loading && !state.error && !project) return <NotFound />;
    const demo = safeUrl(project?.demoUrl);
    const repository = safeUrl(project?.repositoryUrl);
    const cover = mediaUrl(project?.cover?.url);
    return (
        <div className="reading">
            <Link className="text-link" to="/projects">
                <ArrowLeft size={15} />
                Semua proyek
            </Link>
            <DataState {...state}>
                {project && (
                    <article>
                        <div className="eyebrow mt-9">
                            {project.category || 'PROYEK'}
                        </div>
                        <h1>{project.title}</h1>
                        <div className="tag-list">
                            {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                        <p className="reading-lead">{project.summary}</p>
                        <div className="mb-7 flex flex-wrap gap-3">
                            {demo && (
                                <Button asChild>
                                    <a
                                        href={demo}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        Buka proyek
                                        <ArrowUpRight size={15} />
                                    </a>
                                </Button>
                            )}
                            {repository && (
                                <Button asChild variant="outline">
                                    <a
                                        href={repository}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <Github size={15} />
                                        Repository
                                    </a>
                                </Button>
                            )}
                        </div>
                        {cover && (
                            <img
                                alt={
                                    project.cover?.alternativeText ||
                                    project.title
                                }
                                className="reading-cover"
                                src={cover}
                            />
                        )}
                        <Markdown body={project.body} />
                    </article>
                )}
            </DataState>
        </div>
    );
}

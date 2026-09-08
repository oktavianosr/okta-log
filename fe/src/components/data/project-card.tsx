import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { mediaUrl } from '@/lib/media';
import type { Project } from '@/types/content';
export function ProjectArtwork({
    index = 0,
    project,
}: {
    index?: number;
    project: Project;
}) {
    const cover = mediaUrl(project.cover?.url);
    return (
        <div className={'project-art variant-' + (index % 2)}>
            {cover ? (
                <img
                    alt={project.cover?.alternativeText || project.title}
                    loading="lazy"
                    src={cover}
                />
            ) : (
                <div aria-hidden="true" className="mini-window">
                    <div className="mini-dots">
                        <i />
                        <i />
                        <i />
                    </div>
                    <div className="mini-content">
                        <div className="mini-sidebar" />
                        <div>
                            <div className="mini-line" />
                            <div className="mini-line" />
                            <div className="mini-blocks">
                                <i />
                                <i />
                                <i />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default function ProjectCard({
    index = 0,
    project,
}: {
    index?: number;
    project: Project;
}) {
    return (
        <Link
            className="project-card"
            params={{ slug: project.slug }}
            to="/projects/$slug"
        >
            <ProjectArtwork index={index} project={project} />
            <div className="project-card-body">
                <div className="project-category">
                    {project.category || 'Proyek'}
                </div>
                <div className="project-title">
                    <h3>{project.title}</h3>
                    <ArrowUpRight
                        className="shrink-0 text-muted-foreground"
                        size={17}
                    />
                </div>
                <p>{project.summary}</p>
                <div className="tag-list">
                    {project.technologies.slice(0, 3).map((tech) => (
                        <Badge
                            className="rounded-sm px-1.5 text-[11px] font-normal"
                            key={tech}
                            variant="secondary"
                        >
                            {tech}
                        </Badge>
                    ))}
                </div>
            </div>
        </Link>
    );
}

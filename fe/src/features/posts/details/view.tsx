import { Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

import Markdown from '@/components/data/markdown';
import { kindLabels } from '@/components/data/post-item';
import DataState from '@/components/fallback/data-state';
import NotFound from '@/components/fallback/not-found';
import { Badge } from '@/components/ui/badge';
import { formatDate, readingTime } from '@/lib/datetime';
import { mediaUrl } from '@/lib/media';

import type { PostDetailViewProps } from './types';
export default function PostDetailView({
    post,
    ...state
}: PostDetailViewProps) {
    if (!state.loading && !state.error && !post) return <NotFound />;
    const cover = mediaUrl(post?.cover?.url);
    return (
        <div className="reading">
            <Link className="text-link" to="/posts">
                <ArrowLeft size={15} />
                Semua catatan
            </Link>
            <DataState {...state}>
                {post && (
                    <article>
                        <div className="feed-meta mt-9">
                            <Badge variant="secondary">
                                {kindLabels[post.kind]}
                            </Badge>
                            <span>·</span>
                            <time dateTime={post.activityDate}>
                                {formatDate(post.activityDate, 'long')}
                            </time>
                            <span>·</span>
                            <span>{readingTime(post.body)} menit baca</span>
                        </div>
                        <h1>{post.title}</h1>
                        <p className="reading-lead">{post.excerpt}</p>
                        <div className="tag-list mb-7">
                            {post.tags.map((tag) => (
                                <Badge key={tag.documentId} variant="outline">
                                    #{tag.name}
                                </Badge>
                            ))}
                        </div>
                        {cover && (
                            <img
                                alt={post.cover?.alternativeText || post.title}
                                className="reading-cover"
                                src={cover}
                            />
                        )}
                        <Markdown body={post.body} />
                        {post.project && (
                            <Link
                                className="related-project"
                                params={{ slug: post.project.slug }}
                                to="/projects/$slug"
                            >
                                <span>PROYEK TERKAIT</span>
                                <div className="flex justify-between gap-4">
                                    {post.project.title}
                                    <ArrowUpRight size={17} />
                                </div>
                            </Link>
                        )}
                    </article>
                )}
            </DataState>
        </div>
    );
}

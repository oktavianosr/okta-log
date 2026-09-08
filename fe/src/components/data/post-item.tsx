import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Check, FileText, Zap } from 'lucide-react';

import { formatDate, readingTime } from '@/lib/datetime';
import type { Post, PostKind } from '@/types/content';
export const kindLabels: Record<PostKind, string> = {
    article: 'Artikel',
    solution: 'Problem solved',
    update: 'Update',
};
const icons = { article: FileText, solution: Check, update: Zap };
export default function PostItem({ post }: { post: Post }) {
    const Icon = icons[post.kind];
    return (
        <article className="feed-item">
            <div className={'feed-icon ' + post.kind}>
                <Icon size={16} />
            </div>
            <div>
                <div className="feed-meta">
                    <span className="kind-label">{kindLabels[post.kind]}</span>
                    <span>·</span>
                    <time dateTime={post.activityDate}>
                        {formatDate(post.activityDate)}
                    </time>
                    {post.kind === 'article' && (
                        <>
                            <span>·</span>
                            <span>{readingTime(post.body)} menit baca</span>
                        </>
                    )}
                </div>
                <h3>
                    <Link params={{ slug: post.slug }} to="/posts/$slug">
                        {post.title}
                    </Link>
                </h3>
                <p>{post.excerpt}</p>
                <div className="feed-bottom">
                    <div className="tag-list">
                        {post.tags.map((tag) => (
                            <span className="small-tag" key={tag.documentId}>
                                #{tag.name}
                            </span>
                        ))}
                    </div>
                    <Link
                        aria-label={'Baca ' + post.title}
                        className="feed-read"
                        params={{ slug: post.slug }}
                        to="/posts/$slug"
                    >
                        <ArrowUpRight size={17} />
                    </Link>
                </div>
            </div>
        </article>
    );
}

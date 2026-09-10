import { Link } from '@tanstack/react-router';
import { ArrowRight, Search } from 'lucide-react';

import Pagination from '@/components/data/pagination';
import PostItem from '@/components/data/post-item';
import DataState from '@/components/fallback/data-state';
import { Input } from '@/components/ui/input';

import type { PostListViewProps } from './types';
const filtersList = [
    { label: 'All', value: 'all' },
    { label: 'Solved', value: 'solution' },
    { label: 'Articles', value: 'article' },
    { label: 'Update', value: 'update' },
] as const;
export default function PostListView({
    compact,
    fetching,
    filters,
    meta,
    onFilters,
    posts,
    ...state
}: PostListViewProps) {
    return (
        <section aria-label="Activity feed" className={compact ? 'feed-panel' : undefined}>
            {compact ? (
                <div className="section-head">
                    <h2>
                        Recent notes <span className="section-count">↳</span>
                    </h2>
                    <Link className="text-link" to="/posts">
                        Archive <ArrowRight size={14} />
                    </Link>
                </div>
            ) : (
                <header className="page-header">
                    <div className="eyebrow">JOURNAL / ACTIVITY FEED</div>
                    <h1>Notes along the way.</h1>
                    <p>
                        Work in progress, problems solved, and lessons worth
                        keeping.
                    </p>
                </header>
            )}
            <div className={compact ? undefined : 'feed-panel'}>
                <div className="feed-toolbar">
                    <div
                        aria-label="Note type"
                        className="filter-tabs"
                        role="group"
                    >
                        {filtersList.map((item) => (
                            <button
                                aria-pressed={filters.kind === item.value}
                                className="filter-tab"
                                key={item.value}
                                onClick={() => onFilters({ kind: item.value })}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <div className="feed-search">
                        <Search size={14} />
                        <Input
                            aria-label="Search notes"
                            maxLength={200}
                            onChange={(event) =>
                                onFilters({ search: event.target.value })
                            }
                            placeholder="Search notes..."
                            value={filters.search}
                        />
                    </div>
                </div>
                <div aria-busy={fetching}>
                    <DataState
                        {...state}
                        empty={posts.length === 0}
                        emptyDescription={
                            filters.search || filters.kind !== 'all'
                                ? 'Try another keyword or select All.'
                                : 'Published notes will appear here.'
                        }
                        emptyTitle={
                            filters.search || filters.kind !== 'all'
                                ? 'No matching notes'
                                : 'No notes yet'
                        }
                    >
                        <div>
                            {posts.map((post) => (
                                <PostItem key={post.documentId} post={post} />
                            ))}
                        </div>
                    </DataState>
                </div>
                <Pagination
                    disabled={fetching}
                    meta={meta}
                    onPage={(page) => onFilters({ page })}
                />
            </div>
        </section>
    );
}

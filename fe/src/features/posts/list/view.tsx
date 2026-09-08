import { Link } from '@tanstack/react-router';
import { ArrowRight, Search } from 'lucide-react';

import Pagination from '@/components/data/pagination';
import PostItem from '@/components/data/post-item';
import DataState from '@/components/fallback/data-state';
import { Input } from '@/components/ui/input';

import type { PostListViewProps } from './types';
const filtersList = [
    { label: 'Semua', value: 'all' },
    { label: 'Solved', value: 'solution' },
    { label: 'Artikel', value: 'article' },
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
        <section aria-label="Activity feed">
            {compact ? (
                <div className="section-head">
                    <h2>
                        Catatan terbaru <span className="section-count">↳</span>
                    </h2>
                    <Link className="text-link" to="/posts">
                        Arsip <ArrowRight size={14} />
                    </Link>
                </div>
            ) : (
                <header className="page-header">
                    <div className="eyebrow">JURNAL / ACTIVITY FEED</div>
                    <h1>Catatan sepanjang jalan.</h1>
                    <p>
                        Hal yang dikerjakan, masalah yang dipecahkan, dan
                        pelajaran yang layak disimpan.
                    </p>
                </header>
            )}
            <div className={compact ? '' : 'page-content'}>
                <div className="feed-toolbar">
                    <div
                        aria-label="Jenis catatan"
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
                            aria-label="Cari catatan"
                            maxLength={200}
                            onChange={(event) =>
                                onFilters({ search: event.target.value })
                            }
                            placeholder="Cari catatan..."
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
                                ? 'Coba kata kunci lain atau pilih jenis Semua.'
                                : 'Catatan yang sudah dipublikasikan akan muncul di sini.'
                        }
                        emptyTitle={
                            filters.search || filters.kind !== 'all'
                                ? 'Tidak ada catatan yang cocok'
                                : 'Belum ada catatan'
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

import { RefreshCw } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
export interface DataStateProps {
    children: ReactNode;
    empty?: boolean;
    emptyDescription?: string;
    emptyTitle?: string;
    error: boolean;
    loading: boolean;
    onRetry: () => void;
}
export default function DataState({
    children,
    empty,
    emptyDescription = 'The next note will appear here.',
    emptyTitle = 'No content yet',
    error,
    loading,
    onRetry,
}: DataStateProps) {
    if (loading)
        return (
            <div
                aria-label="Loading content"
                className="space-y-4 py-5"
                role="status"
            >
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-5 w-1/2" />
            </div>
        );
    if (error)
        return (
            <div className="empty-state" role="alert">
                <h3>Content could not be loaded</h3>
                <p>
                    There is a problem connecting to the content source. Please
                    try again.
                </p>
                <Button onClick={onRetry} size="sm" variant="outline">
                    <RefreshCw size={14} />
                    Try again
                </Button>
            </div>
        );
    if (empty)
        return (
            <div className="empty-state">
                <h3>{emptyTitle}</h3>
                <p>{emptyDescription}</p>
            </div>
        );
    return children;
}

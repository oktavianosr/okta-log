import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { ApiPagination } from '@/types/api';
export default function Pagination({
    disabled = false,
    meta,
    onPage,
}: {
    disabled?: boolean;
    meta?: ApiPagination;
    onPage: (page: number) => void;
}) {
    if (!meta || (meta.pageCount <= 1 && meta.page === 1)) return null;
    return (
        <nav aria-label="Result pages" className="pagination">
            <Button
                disabled={disabled || meta.page <= 1}
                onClick={() => onPage(meta.page - 1)}
                size="sm"
                variant="outline"
            >
                <ArrowLeft size={14} />
                Previous
            </Button>
            <span>
                Page {meta.page} of {Math.max(meta.pageCount, 1)}
            </span>
            <Button
                disabled={disabled || meta.page >= meta.pageCount}
                onClick={() => onPage(meta.page + 1)}
                size="sm"
                variant="outline"
            >
                Next
                <ArrowRight size={14} />
            </Button>
        </nav>
    );
}

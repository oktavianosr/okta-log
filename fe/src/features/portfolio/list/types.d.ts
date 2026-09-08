import type { ApiPagination } from '@/types/api';
import type { QueryViewState } from '@/types/component';
import type { Project } from '@/types/content';
export interface ProjectListViewProps extends QueryViewState {
    fetching: boolean;
    meta?: ApiPagination;
    onPage: (page: number) => void;
    projects: Project[];
}

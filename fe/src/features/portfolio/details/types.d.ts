import type { QueryViewState } from '@/types/component';
import type { Project } from '@/types/content';
export interface ProjectDetailViewProps extends QueryViewState {
    project: null | Project;
}

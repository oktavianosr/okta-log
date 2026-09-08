import type { ReactNode } from 'react';

import type { QueryViewState } from '@/types/component';
import type { Profile, Project } from '@/types/content';
export interface HomeViewProps {
    feed: ReactNode;
    profile: null | Profile;
    profileState: QueryViewState;
    projects: Project[];
    projectState: QueryViewState;
    projectTotal: number;
}

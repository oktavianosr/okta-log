import type { QueryViewState } from '@/types/component';
import type { Post } from '@/types/content';
export interface PostDetailViewProps extends QueryViewState {
    post: null | Post;
}

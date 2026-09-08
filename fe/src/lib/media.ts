import { cmsUrl } from '@/lib/axios';
import { safeUrl } from '@/lib/content';
export function mediaUrl(url: null | string | undefined) {
    if (!url) return undefined;
    return safeUrl(
        url.startsWith('/') && !url.startsWith('//') ? cmsUrl + url : url
    );
}

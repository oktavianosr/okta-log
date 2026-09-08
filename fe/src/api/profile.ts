import { normalizeSingle } from '@/lib/api';
import { isDemo, publicApi } from '@/lib/axios';
import { profileSchema } from '@/lib/content-schema';
import { demoProfile } from '@/lib/demo-data';
export async function fetchProfile() {
    if (isDemo) return { data: demoProfile, message: '', success: true };
    const response = await publicApi.get('/profile', {
        params: { 'populate[0]': 'avatar', status: 'published' },
    });
    return normalizeSingle(response.data, profileSchema);
}

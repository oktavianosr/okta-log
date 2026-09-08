import { normalizeList } from '@/lib/api';
import { isDemo, publicApi } from '@/lib/axios';
import { projectSchema } from '@/lib/content-schema';
import { demoProjects } from '@/lib/demo-data';
export async function fetchProjects(page = 1) {
    if (isDemo)
        return {
            data: demoProjects.slice((page - 1) * 6, page * 6),
            message: '',
            meta: {
                page,
                pageCount: 1,
                pageSize: 6,
                total: demoProjects.length,
            },
            success: true,
        };
    const response = await publicApi.get('/projects', {
        params: {
            'pagination[page]': page,
            'pagination[pageSize]': 6,
            'populate[0]': 'cover',
            'sort[0]': 'featured:desc',
            'sort[1]': 'createdAt:desc',
            status: 'published',
        },
    });
    return normalizeList(response.data, projectSchema);
}
export async function fetchProject(slug: string) {
    if (isDemo)
        return {
            data: demoProjects.find((item) => item.slug === slug) ?? null,
            message: '',
            success: true,
        };
    const response = await publicApi.get('/projects', {
        params: {
            'filters[slug][$eq]': slug,
            'populate[0]': 'cover',
            status: 'published',
        },
    });
    return {
        data: normalizeList(response.data, projectSchema).data[0] ?? null,
        message: '',
        success: true,
    };
}

export function buildPostParams(filters: {
    kind: string;
    page: number;
    search: string;
}): URLSearchParams {
    const page =
        Number.isInteger(filters.page) && filters.page > 0 ? filters.page : 1;
    const params = new URLSearchParams({
        'pagination[page]': String(page),
        'pagination[pageSize]': '6',
        'populate[0]': 'tags',
        'populate[1]': 'project',
        'populate[2]': 'cover',
        'sort[0]': 'activityDate:desc',
        'sort[1]': 'documentId:asc',
        status: 'published',
    });
    if (filters.search.trim()) {
        params.set('filters[$or][0][title][$containsi]', filters.search.trim());
        params.set(
            'filters[$or][1][excerpt][$containsi]',
            filters.search.trim()
        );
    }
    if (['article', 'update', 'solution'].includes(filters.kind))
        params.set('filters[kind][$eq]', filters.kind);
    return params;
}
export function safeUrl(value: null | string | undefined): string | undefined {
    if (!value) return undefined;
    try {
        const url = new URL(value);
        return ['http:', 'https:'].includes(url.protocol)
            ? url.href
            : undefined;
    } catch {
        return undefined;
    }
}

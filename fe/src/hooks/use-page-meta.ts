import { useEffect } from 'react';
export function usePageMeta(title: string, description?: string) {
    useEffect(() => {
        document.title = title + ' — Devlog';
        const element = document.querySelector('meta[name="description"]');
        const previous = element?.getAttribute('content') ?? '';
        if (description) element?.setAttribute('content', description);
        return () => {
            element?.setAttribute('content', previous);
        };
    }, [title, description]);
}

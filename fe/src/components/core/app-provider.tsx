import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import NotFound from '@/components/fallback/not-found';
import { routeTree } from '@/routeTree.gen';
const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 1, staleTime: 60000 } },
});
export const router = createRouter({
    defaultNotFoundComponent: NotFound,
    defaultPreload: 'intent',
    routeTree,
    scrollRestoration: true,
});
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
export default function AppProvider() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

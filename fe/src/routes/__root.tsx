import { createRootRoute } from '@tanstack/react-router';

import AppLayout from '@/components/layouts/app-layout';
import { Button } from '@/components/ui/button';
export const Route = createRootRoute({
    component: AppLayout,
    errorComponent: ({ reset }) => (
        <div className="shell empty-state" role="alert">
            <h1>This page could not be displayed</h1>
            <p>A problem occurred while opening this page.</p>
            <Button onClick={reset}>Try again</Button>
        </div>
    ),
});

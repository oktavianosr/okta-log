import { createRootRoute } from '@tanstack/react-router';

import AppLayout from '@/components/layouts/app-layout';
import { Button } from '@/components/ui/button';
export const Route = createRootRoute({
    component: AppLayout,
    errorComponent: ({ reset }) => (
        <div className="shell empty-state" role="alert">
            <h1>Halaman belum bisa ditampilkan</h1>
            <p>Terjadi masalah saat membuka halaman.</p>
            <Button onClick={reset}>Coba lagi</Button>
        </div>
    ),
});

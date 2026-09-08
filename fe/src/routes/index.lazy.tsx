import { createLazyFileRoute } from '@tanstack/react-router';

import Home from '@/features/portfolio/home';
export const Route = createLazyFileRoute('/')({ component: Home });

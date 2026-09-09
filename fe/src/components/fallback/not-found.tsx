import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
export default function NotFound() {
    return (
        <div className="reading">
            <div className="eyebrow">404 / PAGE NOT FOUND</div>
            <h1>Looks like a dead end.</h1>
            <p className="reading-lead">
                This page is unavailable or has moved.
            </p>
            <Button asChild>
                <Link to="/">
                    <ArrowLeft size={16} />
                    Back to home
                </Link>
            </Button>
        </div>
    );
}

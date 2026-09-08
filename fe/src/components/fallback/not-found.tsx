import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
export default function NotFound() {
    return (
        <div className="reading">
            <div className="eyebrow">404 / HALAMAN TIDAK DITEMUKAN</div>
            <h1>Sepertinya jalan buntu.</h1>
            <p className="reading-lead">
                Halaman ini belum tersedia atau sudah dipindahkan.
            </p>
            <Button asChild>
                <Link to="/">
                    <ArrowLeft size={16} />
                    Kembali ke beranda
                </Link>
            </Button>
        </div>
    );
}

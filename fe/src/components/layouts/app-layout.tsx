import { Link, Outlet } from '@tanstack/react-router';
import { Asterisk } from 'lucide-react';

import { isDemo } from '@/lib/axios';
export default function AppLayout() {
    return (
        <>
            <a className="skip-link" href="#main-content">
                Lewati ke konten
            </a>
            {isDemo && (
                <div className="demo-notice">
                    Mode demo · Semua profil, proyek, dan tulisan di sini adalah
                    contoh.
                </div>
            )}
            <header className="topbar">
                <div className="shell nav">
                    <Link aria-label="Devlog, beranda" className="brand" to="/">
                        <Asterisk strokeWidth={2.5} />
                        OktaLog<span className="text-primary">.</span>
                    </Link>
                    <nav aria-label="Navigasi utama" className="nav-links">
                        <Link activeOptions={{ exact: true }} to="/">
                            Beranda
                        </Link>
                        <Link to="/projects">Proyek</Link>
                        <Link to="/posts">Catatan</Link>
                    </nav>
                    <span className="nav-note">BUILD / LEARN / SHARE</span>
                </div>
            </header>
            <main className="shell" id="main-content" tabIndex={-1}>
                <Outlet />
            </main>
            <footer className="footer">
                <div className="shell footer-inner">
                    <span>© {new Date().getFullYear()} Devlog</span>
                    <span>Setiap proses punya cerita.</span>
                </div>
            </footer>
        </>
    );
}

import { Link, Outlet } from '@tanstack/react-router';
import { Asterisk } from 'lucide-react';

import { isDemo } from '@/lib/axios';
export default function AppLayout() {
    return (
        <>
            <a className="skip-link" href="#main-content">
                Skip to content
            </a>
            {isDemo && (
                <div className="demo-notice">
                    Demo mode · All profiles, projects, and posts shown here are
                    examples.
                </div>
            )}
            <header className="topbar">
                <div className="shell nav">
                    <Link aria-label="Devlog, home" className="brand" to="/">
                        <Asterisk strokeWidth={2.5} />
                        OktaLog<span className="text-primary">.</span>
                    </Link>
                    <nav aria-label="Main navigation" className="nav-links">
                        <Link activeOptions={{ exact: true }} to="/">
                            Home
                        </Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/posts">Notes</Link>
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
                    <span>Every process has a story.</span>
                </div>
            </footer>
        </>
    );
}

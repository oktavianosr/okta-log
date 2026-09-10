import { Link, Outlet, useRouterState } from '@tanstack/react-router';
import { Asterisk } from 'lucide-react';
import { useEffect, useState } from 'react';

import Footer from '@/components/layouts/footer';
import { isDemo } from '@/lib/axios';
export default function AppLayout() {
    const pathname = useRouterState({
        select: (state) => state.location.pathname,
    });

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 16);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isNotHomePage = pathname !== '/' || pathname.startsWith('/?');
    const showNavbarGlass = isScrolled;

    return (
        <div className={isNotHomePage ? 'app-shell home-page' : 'app-shell'}>
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
                <div
                    className={`shell nav ${showNavbarGlass ? 'navbar--sticky' : ''}`}
                >
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
            <Footer />
        </div>
    );
}

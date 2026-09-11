import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from 'lucide-react';

import { fetchProfile } from '@/api/profile';
import { safeUrl } from '@/lib/content';
import { queryKeys } from '@/lib/query-keys';

const isEmail = (value: null | string | undefined) =>
    Boolean(value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

export default function Footer() {
    const profileQuery = useQuery({
        queryFn: fetchProfile,
        queryKey: queryKeys.profile,
    });
    const profile = profileQuery.data?.data;
    const email = isEmail(profile?.email) ? profile?.email : undefined;
    const github = safeUrl(profile?.githubUrl);
    const linkedin = safeUrl(profile?.linkedinUrl);
    const name = profile?.name || 'OktaLog';

    return (
        <footer className="footer">
            <div className="shell footer-inner">
                <section
                    aria-labelledby="footer-cta-title"
                    className="footer-cta-panel"
                >
                    <div>
                        <p className="footer-kicker">
                            AVAILABLE FOR COLLABORATION
                        </p>
                        <h2 id="footer-cta-title">
                            Have a thoughtful project in mind?
                        </h2>
                        <p>
                            I enjoy turning open questions into useful, clear
                            products.
                        </p>
                    </div>
                    {email ? (
                        <a className="footer-cta" href={`mailto:${email}`}>
                            Start a conversation <Mail size={16} />
                        </a>
                    ) : (
                        <p className="footer-cta-unavailable">
                            Contact details coming soon.
                        </p>
                    )}
                </section>

                <div className="footer-grid">
                    <section className="footer-brand">
                        <p className="footer-identity">{name}</p>
                        <p className="footer-headline">
                            {profile?.headline || 'A personal development log.'}
                        </p>
                        {profile?.location && (
                            <p className="footer-location">
                                <MapPin size={14} />
                                {profile.location}
                            </p>
                        )}
                        <p className="footer-manifesto">
                            BUILD / LEARN / SHARE
                        </p>
                    </section>

                    <nav aria-label="Portfolio" className="footer-column">
                        <h2>Portfolio</h2>
                        <div className="footer-links">
                            <Link className="footer-link" to="/">
                                Home
                            </Link>
                            <Link className="footer-link" to="/projects">
                                Projects
                            </Link>
                        </div>
                    </nav>

                    <nav aria-label="Writing" className="footer-column">
                        <h2>Writing</h2>
                        <div className="footer-links">
                            <Link className="footer-link" to="/posts">
                                Notes
                            </Link>
                            <Link
                                className="footer-link"
                                search={{
                                    kind: 'article',
                                    page: 1,
                                    search: '',
                                }}
                                to="/posts"
                            >
                                Articles
                            </Link>
                            <Link
                                className="footer-link"
                                search={{
                                    kind: 'solution',
                                    page: 1,
                                    search: '',
                                }}
                                to="/posts"
                            >
                                Solutions
                            </Link>
                            <Link
                                className="footer-link"
                                search={{ kind: 'update', page: 1, search: '' }}
                                to="/posts"
                            >
                                Updates
                            </Link>
                        </div>
                    </nav>

                    <section className="footer-column">
                        <h2>Building in public</h2>
                        <p className="footer-proof">
                            Projects, notes, and small experiments shared along
                            the way.
                        </p>
                        <div className="footer-socials">
                            {github && (
                                <a
                                    aria-label="GitHub"
                                    className="footer-social-link"
                                    href={github}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <Github size={16} /> GitHub{' '}
                                    <ArrowUpRight size={13} />
                                </a>
                            )}
                            {linkedin && (
                                <a
                                    aria-label="LinkedIn"
                                    className="footer-social-link"
                                    href={linkedin}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <Linkedin size={16} /> LinkedIn{' '}
                                    <ArrowUpRight size={13} />
                                </a>
                            )}
                        </div>
                    </section>
                </div>

                <div className="footer-signature">
                    <span>
                        © {new Date().getFullYear()} {name}
                    </span>
                    <span>Built with React, TypeScript &amp; Strapi</span>
                    <span>Every process has a story.</span>
                </div>
            </div>
        </footer>
    );
}

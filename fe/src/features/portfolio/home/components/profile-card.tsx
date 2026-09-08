import { Asterisk, Github, Linkedin, Mail, MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { safeUrl } from '@/lib/content';
import { mediaUrl } from '@/lib/media';
import type { Profile } from '@/types/content';
export default function ProfileCard({ profile }: { profile: Profile }) {
    const avatar = mediaUrl(profile.avatar?.url);
    const github = safeUrl(profile.githubUrl);
    const linkedin = safeUrl(profile.linkedinUrl);
    const email =
        profile.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)
            ? profile.email
            : null;
    return (
        <>
            <div className="avatar">
                {avatar ? (
                    <img
                        alt={profile.avatar?.alternativeText || profile.name}
                        src={avatar} draggable="false"
                    />
                ) : (
                    <Asterisk size={32} />
                )}
            </div>
            <h2>{profile.name}</h2>
            <div className="profile-headline">{profile.headline}</div>
            <p className="profile-bio">{profile.bio}</p>
            {profile.location && (
                <div className="profile-location">
                    <MapPin size={14} />
                    {profile.location}
                </div>
            )}
            <div className="profile-social">
                {github && (
                    <a
                        aria-label="GitHub"
                        className="social-link"
                        href={github}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <Github size={16} />
                    </a>
                )}
                {linkedin && (
                    <a
                        aria-label="LinkedIn"
                        className="social-link"
                        href={linkedin}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <Linkedin size={16} />
                    </a>
                )}
                {email && (
                    <a
                        aria-label="Kirim email"
                        className="social-link"
                        href={'mailto:' + email}
                    >
                        <Mail size={16} />
                    </a>
                )}
            </div>
            {profile.skills.length > 0 && (
                <div className="skills">
                    <div className="eyebrow">TOOLBOX</div>
                    <div className="tag-list">
                        {profile.skills.map((skill) => (
                            <Badge
                                className="rounded-md text-xs font-normal"
                                key={skill}
                                variant="outline"
                            >
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

import * as React from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
    speed?: number;
    pauseOnHover?: boolean;
    reverse: boolean;
}

export function Marquee({
    children,
    speed = 20,
    pauseOnHover = false,
    reverse = false,
    className,
    ...props
}: MarqueeProps) {
    return (
        <div
            className={cn(
                'group flex max-w-full gap-4 overflow-hidden p-2 select-none',
                className
            )}
            style={{ '--duration': `${speed}s` } as React.CSSProperties}
            {...props}
        >
            <div
                className={cn(
                    'animate-marquee flex min-w-full shrink-0 items-center justify-around gap-4',
                    pauseOnHover && 'group-hover:[animation-play-state:paused]',
                    reverse && '[animation-direction:reverse]'
                )}
            >
                {children}
            </div>
            {/* Duplicated track for perfect seamless looping */}
            <div
                aria-hidden="true"
                className={cn(
                    'animate-marquee flex min-w-full shrink-0 items-center justify-around gap-4',
                    pauseOnHover && 'group-hover:[animation-play-state:paused]',
                    reverse && '[animation-direction:reverse]'
                )}
            >
                {children}
            </div>
        </div>
    );
}

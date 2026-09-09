import * as React from 'react';

import { cn } from '@/lib/utils';

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
    pauseOnHover?: boolean;
    reverse?: boolean;
    speed?: number;
}

export function Marquee({
    children,
    className,
    pauseOnHover = false,
    reverse = false,
    speed = 20,
    ...props
}: MarqueeProps) {
    return (
        <div
            className={cn(
                'group flex w-1/2  max-w-full overflow-hidden p-2 select-none',
                className
            )}
            style={{ '--duration': `${speed}s` } as React.CSSProperties}
            {...props}
        >
            <div
                className={cn(
                    'animate-marquee flex w-[200%] shrink-0',
                    pauseOnHover && 'group-hover:[animation-play-state:paused]',
                    reverse && '[animation-direction:reverse]'
                )}
            >
                <div className="flex w-1/2 shrink-0 items-center justify-around gap-4">
                    {children}
                </div>
                <div
                    aria-hidden="true"
                    className="flex w-1/2 shrink-0 items-center justify-around gap-4"
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

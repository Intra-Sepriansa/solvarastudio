import { cn } from '@/lib/utils';

type LogoProps = {
    className?: string;
    compact?: boolean;
};

export function Logo({ className, compact = false }: LogoProps) {
    return (
        <a
            href="#top"
            className={cn(
                'group inline-flex items-center gap-2 rounded-md px-1 py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-teal)_40%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white',
                className,
            )}
            aria-label="Solvara Studio — beranda"
        >
            <span
                aria-hidden
                className="relative inline-flex size-8 items-center justify-center overflow-hidden rounded-full border border-line bg-white"
            >
                <img
                    src="/logo.png"
                    alt=""
                    className="size-full object-cover"
                />
            </span>
            {!compact && (
                <span className="font-display text-[18px] tracking-tight text-ink">
                    Solvara{' '}
                    <span className="text-muted-ink italic">Studio</span>
                </span>
            )}
        </a>
    );
}

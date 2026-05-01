import { cn } from '@/lib/utils';

type SectionLabelProps = {
    children: React.ReactNode;
    number?: string;
    className?: string;
};

export function SectionLabel({
    children,
    number,
    className,
}: SectionLabelProps) {
    return (
        <div
            className={cn(
                'flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] text-muted-ink uppercase',
                className,
            )}
        >
            {number ? (
                <span className="font-mono text-gold">{number}</span>
            ) : (
                <span
                    aria-hidden
                    className="block h-1 w-1 rounded-full bg-gold"
                />
            )}
            <span>{children}</span>
        </div>
    );
}

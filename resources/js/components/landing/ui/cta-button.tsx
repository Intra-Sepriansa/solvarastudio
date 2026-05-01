import { ArrowUpRight } from 'lucide-react';
import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';

type CommonProps = {
    variant?: Variant;
    children: ReactNode;
    className?: string;
    icon?: boolean;
};

const baseStyles =
    'group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[13px] font-medium tracking-tight transition-[background,color,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

const variantStyles: Record<Variant, string> = {
    primary:
        'bg-[var(--color-teal)] text-white hover:bg-[var(--color-teal-soft)] focus-visible:ring-[color-mix(in_srgb,var(--color-teal)_50%,transparent)]',
    secondary:
        'border border-line bg-white text-ink hover:border-[var(--color-teal)] hover:text-[var(--color-teal)] focus-visible:ring-[color-mix(in_srgb,var(--color-teal)_30%,transparent)]',
    ghost: 'text-ink hover:text-[var(--color-teal)] focus-visible:ring-[color-mix(in_srgb,var(--color-teal)_30%,transparent)]',
};

export function CTAButton({
    variant = 'primary',
    children,
    className,
    icon = true,
    ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type="button"
            {...rest}
            className={cn(baseStyles, variantStyles[variant], className)}
        >
            <span>{children}</span>
            {icon && (
                <ArrowUpRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
            )}
        </button>
    );
}

export function CTALink({
    variant = 'primary',
    children,
    className,
    icon = true,
    ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a
            {...rest}
            className={cn(baseStyles, variantStyles[variant], className)}
        >
            <span>{children}</span>
            {icon && (
                <ArrowUpRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
            )}
        </a>
    );
}

import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#f7f8f5] p-4 text-[#0b1110] sm:p-6 md:p-10 dark:bg-[#050706] dark:text-white">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(11,17,16,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(11,17,16,0.04)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_72%)] bg-[size:28px_28px] dark:bg-[linear-gradient(120deg,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#a7e33d]/70 to-transparent"
            />

            <div className="relative w-full max-w-md">
                <div className="flex flex-col gap-7">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex size-12 items-center justify-center rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/8">
                                <AppLogoIcon className="size-8 fill-current text-[var(--foreground)] dark:text-white" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {title}
                            </h1>
                            <p className="mx-auto max-w-sm text-center text-sm leading-6 text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

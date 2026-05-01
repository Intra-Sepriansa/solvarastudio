import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { CTALink } from '../ui/cta-button';
import { Logo } from '../ui/logo';

const navLinks = [
    { href: '#work', label: 'Work' },
    { href: '#services', label: 'Services' },
    { href: '#process', label: 'Process' },
    { href: '#why', label: 'Insights' },
    { href: '#contact', label: 'Contact' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (open) {
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = '';
        }
    }, [open]);

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 transition-all duration-300',
                scrolled
                    ? 'border-b border-line/80 bg-white/80 backdrop-blur-md'
                    : 'border-b border-transparent bg-transparent',
            )}
        >
            <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3.5 md:px-8">
                <Logo />

                <nav
                    aria-label="Navigasi utama"
                    className="hidden items-center gap-7 md:flex"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="rounded text-[13px] text-muted-ink transition hover:text-ink focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-teal)_40%,transparent)] focus-visible:ring-offset-4 focus-visible:ring-offset-white focus-visible:outline-none"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <CTALink
                        variant="primary"
                        href="#contact"
                        className="hidden md:inline-flex"
                    >
                        Mulai Diskusi
                    </CTALink>
                    <button
                        type="button"
                        aria-label="Buka menu navigasi"
                        aria-expanded={open}
                        aria-controls="mobile-nav"
                        onClick={() => setOpen((v) => !v)}
                        className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-[var(--color-teal)] hover:text-[var(--color-teal)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-teal)_40%,transparent)] focus-visible:outline-none md:hidden"
                    >
                        {open ? (
                            <X className="size-4" aria-hidden />
                        ) : (
                            <Menu className="size-4" aria-hidden />
                        )}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        id="mobile-nav"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{
                            duration: 0.25,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="border-t border-line bg-white md:hidden"
                    >
                        <nav
                            aria-label="Navigasi mobile"
                            className="mx-auto flex max-w-[1200px] flex-col gap-1 px-5 py-4"
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="rounded-lg px-3 py-3 text-[14px] text-ink hover:bg-mint focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-teal)_40%,transparent)] focus-visible:outline-none"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <CTALink
                                variant="primary"
                                href="#contact"
                                onClick={() => setOpen(false)}
                                className="mt-2 justify-between px-4"
                            >
                                Mulai Diskusi
                            </CTALink>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

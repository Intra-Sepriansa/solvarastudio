import { Github, Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { Logo } from '../ui/logo';

const navLinks = [
    { href: '#work', label: 'Work' },
    { href: '#services', label: 'Services' },
    { href: '#process', label: 'Process' },
    { href: '#why', label: 'Insights' },
    { href: '#contact', label: 'Contact' },
];

export function Footer() {
    return (
        <footer id="footer" className="relative border-t border-line bg-white">
            <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-14 md:grid-cols-12 md:gap-8 md:px-8 md:py-20">
                <div className="md:col-span-5">
                    <Logo />
                    <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-muted-ink">
                        Studio digital untuk website, aplikasi, dan sistem
                        bisnis yang rapi sejak awal.
                    </p>
                </div>

                <div className="md:col-span-3">
                    <h3 className="text-[11px] font-medium tracking-[0.2em] text-muted-ink uppercase">
                        Navigasi
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className="text-[14px] text-ink transition hover:text-[var(--color-teal)]"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="md:col-span-4">
                    <h3 className="text-[11px] font-medium tracking-[0.2em] text-muted-ink uppercase">
                        Hubungi
                    </h3>
                    <ul className="mt-4 space-y-2.5 text-[14px] text-ink">
                        <li>
                            <a
                                href="mailto:hello@solvarastudio.com"
                                className="inline-flex items-center gap-2 transition hover:text-[var(--color-teal)]"
                            >
                                <Mail
                                    aria-hidden
                                    className="size-3.5 text-gold"
                                />
                                hello@solvarastudio.com
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://wa.me/6280000000000"
                                rel="noreferrer"
                                target="_blank"
                                className="inline-flex items-center gap-2 transition hover:text-[var(--color-teal)]"
                            >
                                <MessageCircle
                                    aria-hidden
                                    className="size-3.5 text-gold"
                                />
                                WhatsApp +62 800-0000-0000
                            </a>
                        </li>
                    </ul>

                    <div className="mt-6 flex items-center gap-3">
                        <a
                            href="https://instagram.com/solvarastudio"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram Solvara Studio"
                            className="inline-flex size-9 items-center justify-center rounded-full border border-line text-ink transition hover:border-[var(--color-teal)] hover:text-[var(--color-teal)]"
                        >
                            <Instagram aria-hidden className="size-4" />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn Solvara Studio"
                            className="inline-flex size-9 items-center justify-center rounded-full border border-line text-ink transition hover:border-[var(--color-teal)] hover:text-[var(--color-teal)]"
                        >
                            <Linkedin aria-hidden className="size-4" />
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub Solvara Studio"
                            className="inline-flex size-9 items-center justify-center rounded-full border border-line text-ink transition hover:border-[var(--color-teal)] hover:text-[var(--color-teal)]"
                        >
                            <Github aria-hidden className="size-4" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-line">
                <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-2 px-5 py-5 text-[12px] text-muted-ink md:flex-row md:items-center md:px-8">
                    <p>© 2026 Solvara Studio. Built with clarity.</p>
                    <p className="font-mono text-[11px]">v1.0 — landing page</p>
                </div>
            </div>
        </footer>
    );
}

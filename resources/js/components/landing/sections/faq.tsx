import { Plus } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { faqs } from '@/data/faqs';
import { Reveal } from '../ui/reveal';
import { SectionLabel } from '../ui/section-label';

export function FAQ() {
    const [open, setOpen] = useState<number | null>(0);
    const reduce = useReducedMotion();

    return (
        <section className="bg-white">
            <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
                <div className="grid grid-cols-12 gap-y-12 md:gap-x-12">
                    <div className="col-span-12 md:col-span-4">
                        <SectionLabel number="07">FAQ</SectionLabel>
                        <Reveal>
                            <h2 className="mt-4 font-display text-[34px] leading-[1.1] text-ink md:text-[44px]">
                                Pertanyaan yang sering{' '}
                                <span className="italic">muncul</span> di awal
                                project.
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-muted-ink">
                                Tidak menemukan yang Anda cari? Tulis langsung
                                konteksnya di form kontak — kami akan jawab
                                sesuai kebutuhan project.
                            </p>
                        </Reveal>
                    </div>

                    <div className="col-span-12 md:col-span-8">
                        <ul className="border-t border-line">
                            {faqs.map((item, idx) => {
                                const isOpen = open === idx;
                                const buttonId = `faq-button-${idx}`;
                                const panelId = `faq-panel-${idx}`;

                                return (
                                    <li
                                        key={item.question}
                                        className="border-b border-line"
                                    >
                                        <h3>
                                            <button
                                                id={buttonId}
                                                type="button"
                                                aria-expanded={isOpen}
                                                aria-controls={panelId}
                                                onClick={() =>
                                                    setOpen(isOpen ? null : idx)
                                                }
                                                className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-teal)_30%,transparent)] focus-visible:ring-offset-4 focus-visible:ring-offset-white focus-visible:outline-none"
                                            >
                                                <span className="text-[16px] font-medium tracking-tight text-ink md:text-[18px]">
                                                    {item.question}
                                                </span>
                                                <span
                                                    aria-hidden
                                                    className={
                                                        isOpen
                                                            ? 'flex size-8 shrink-0 rotate-45 items-center justify-center rounded-full border border-[var(--color-teal)] bg-mint text-teal transition-transform duration-300'
                                                            : 'flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-muted-ink transition-transform duration-300'
                                                    }
                                                >
                                                    <Plus className="size-3.5" />
                                                </span>
                                            </button>
                                        </h3>
                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    id={panelId}
                                                    role="region"
                                                    aria-labelledby={buttonId}
                                                    initial={
                                                        reduce
                                                            ? false
                                                            : {
                                                                  height: 0,
                                                                  opacity: 0,
                                                              }
                                                    }
                                                    animate={
                                                        reduce
                                                            ? undefined
                                                            : {
                                                                  height: 'auto',
                                                                  opacity: 1,
                                                              }
                                                    }
                                                    exit={
                                                        reduce
                                                            ? undefined
                                                            : {
                                                                  height: 0,
                                                                  opacity: 0,
                                                              }
                                                    }
                                                    transition={{
                                                        duration: 0.35,
                                                        ease: [
                                                            0.22, 1, 0.36, 1,
                                                        ],
                                                    }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pr-12 pb-6 text-[14.5px] leading-relaxed text-muted-ink md:max-w-3xl">
                                                        {item.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

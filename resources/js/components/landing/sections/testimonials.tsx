import { motion } from 'motion/react';
import { testimonials } from '@/data/testimonials';
import { Reveal, Stagger, itemVariants } from '../ui/reveal';
import { SectionLabel } from '../ui/section-label';

export function Testimonials() {
    return (
        <section className="border-y border-line bg-soft">
            <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <SectionLabel number="06">Testimonials</SectionLabel>
                        <Reveal>
                            <h2 className="mt-4 max-w-3xl font-display text-[34px] leading-[1.1] text-ink md:text-[44px]">
                                Yang dirasakan{' '}
                                <span className="italic">tim klien</span>{' '}
                                setelah project rilis.
                            </h2>
                        </Reveal>
                    </div>
                </div>

                <Stagger className="mt-12">
                    <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
                        {testimonials.map((t) => (
                            <motion.li
                                key={t.name}
                                variants={itemVariants}
                                className="min-w-[85%] snap-start md:min-w-0"
                            >
                                <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
                                    <span
                                        aria-hidden
                                        className="font-display text-[44px] leading-none text-gold"
                                    >
                                        “
                                    </span>
                                    <blockquote className="-mt-4 font-display text-[18px] leading-[1.45] tracking-tight text-ink md:text-[20px]">
                                        {t.quote}
                                    </blockquote>
                                    <figcaption className="mt-6 border-t border-line pt-5">
                                        <div className="text-[14px] font-medium text-ink">
                                            {t.name}
                                        </div>
                                        <div className="mt-1 text-[12px] text-muted-ink">
                                            {t.role}
                                        </div>
                                    </figcaption>
                                </figure>
                            </motion.li>
                        ))}
                    </ul>
                </Stagger>
            </div>
        </section>
    );
}

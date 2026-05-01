import { motion } from 'motion/react';
import { whyValues } from '@/data/whyValues';
import { Reveal, Stagger, itemVariants } from '../ui/reveal';
import { SectionLabel } from '../ui/section-label';

export function WhySolvara() {
    return (
        <section
            id="why"
            className="relative bg-gradient-to-b from-white to-mint/30"
        >
            <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
                <div className="grid grid-cols-12 gap-y-12 md:gap-x-12">
                    <div className="col-span-12 md:sticky md:top-28 md:col-span-5 md:self-start">
                        <SectionLabel number="04">Why Solvara</SectionLabel>
                        <Reveal>
                            <h2 className="mt-4 font-display text-[34px] leading-[1.05] text-ink md:text-[48px]">
                                Bukan sekadar terlihat bagus.
                                <br />
                                <span className="text-teal italic">
                                    Harus jelas, cepat, dan mudah dirawat.
                                </span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-muted-ink">
                                Tampilan elegan tetap harus mudah dipakai.
                                Setiap fitur punya alasan, dan setiap halaman
                                dibuat agar tim Anda nyaman saat
                                mengembangkannya.
                            </p>
                        </Reveal>
                    </div>

                    <Stagger className="col-span-12 md:col-span-7">
                        <ul className="border-t border-line">
                            {whyValues.map((value) => {
                                const Icon = value.icon;

                                return (
                                    <motion.li
                                        key={value.title}
                                        variants={itemVariants}
                                        className="flex items-start gap-4 border-b border-line py-6"
                                    >
                                        <span className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-line bg-white text-teal">
                                            <Icon
                                                aria-hidden
                                                className="size-4"
                                            />
                                        </span>
                                        <div>
                                            <h3 className="text-[17px] font-medium tracking-tight text-ink md:text-[18px]">
                                                {value.title}
                                            </h3>
                                            <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-muted-ink">
                                                {value.description}
                                            </p>
                                        </div>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </Stagger>
                </div>
            </div>
        </section>
    );
}

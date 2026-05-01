import { motion } from 'motion/react';
import { processSteps } from '@/data/process';
import { Reveal, Stagger, itemVariants } from '../ui/reveal';
import { SectionLabel } from '../ui/section-label';

export function Process() {
    return (
        <section id="process" className="bg-soft">
            <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <SectionLabel number="02">Process</SectionLabel>
                        <Reveal>
                            <h2 className="mt-4 max-w-3xl font-display text-[34px] leading-[1.1] text-ink md:text-[46px]">
                                Enam langkah, dari{' '}
                                <span className="italic">discovery</span> sampai
                                handover.
                            </h2>
                        </Reveal>
                    </div>
                    <Reveal delay={0.1}>
                        <p className="max-w-xs text-[14px] leading-relaxed text-muted-ink">
                            Setiap langkah punya output yang bisa dicek. Tidak
                            perlu menunggu sampai akhir untuk tahu progress.
                        </p>
                    </Reveal>
                </div>

                <Stagger className="mt-12">
                    <ol className="grid grid-cols-1 border-t border-line md:grid-cols-3">
                        {processSteps.map((step, idx) => (
                            <motion.li
                                key={step.number}
                                variants={itemVariants}
                                className={[
                                    'relative border-b border-line p-6 md:p-8',
                                    idx % 3 !== 0 ? 'md:border-l' : '',
                                ].join(' ')}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-[12px] font-medium tracking-wider text-gold">
                                        {step.number}
                                    </span>
                                    <span className="block h-px flex-1 bg-line" />
                                </div>
                                <h3 className="mt-5 font-display text-[24px] text-ink md:text-[28px]">
                                    {step.title}
                                </h3>
                                <p className="mt-3 text-[14px] leading-relaxed text-muted-ink">
                                    {step.description}
                                </p>
                            </motion.li>
                        ))}
                    </ol>
                </Stagger>
            </div>
        </section>
    );
}

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { works } from '@/data/works';
import type { Work } from '@/data/works';
import { cn } from '@/lib/utils';
import { Reveal, Stagger, itemVariants } from '../ui/reveal';
import { SectionLabel } from '../ui/section-label';

const accentBg: Record<Work['accent'], string> = {
    mint: 'bg-mint',
    mist: 'bg-mist',
    soft: 'bg-soft',
    gold: 'bg-[color-mix(in_srgb,var(--color-gold)_15%,white)]',
};

function WorkPlaceholder({ accent, name }: Work) {
    return (
        <div
            className={cn(
                'relative flex aspect-[4/3] w-full items-end overflow-hidden rounded-2xl border border-line transition-transform duration-700 group-hover:-translate-y-0.5',
                accentBg[accent],
            )}
            aria-hidden
        >
            <div className="absolute inset-0">
                <div className="absolute inset-x-6 top-6 h-2 w-3/5 rounded-full bg-white/80" />
                <div className="absolute inset-x-6 top-12 h-2 w-1/2 rounded-full bg-white/60" />
                <div className="absolute top-6 right-6 size-3 rounded-full bg-gold" />
                <div className="absolute inset-x-6 bottom-20 h-px bg-white/70" />
                <div className="absolute right-6 bottom-6 left-6 grid grid-cols-3 gap-3">
                    <div className="rounded-md bg-white p-3">
                        <div className="h-1.5 w-2/3 rounded-full bg-soft" />
                        <div className="mt-2 h-1.5 w-1/2 rounded-full bg-soft" />
                    </div>
                    <div className="rounded-md bg-white p-3">
                        <div className="h-1.5 w-1/2 rounded-full bg-soft" />
                        <div className="mt-2 h-1.5 w-3/4 rounded-full bg-soft" />
                    </div>
                    <div className="rounded-md bg-white p-3">
                        <div className="h-1.5 w-3/4 rounded-full bg-soft" />
                        <div className="mt-2 h-1.5 w-1/3 rounded-full bg-soft" />
                    </div>
                </div>
            </div>
            <span className="sr-only">Mockup abstrak untuk {name}</span>
        </div>
    );
}

export function SelectedWork() {
    return (
        <section id="work" className="bg-white">
            <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
                <div className="grid grid-cols-12 items-end gap-y-8 md:gap-x-8">
                    <div className="col-span-12 md:col-span-7">
                        <SectionLabel number="03">Selected work</SectionLabel>
                        <Reveal>
                            <h2 className="mt-4 font-display text-[34px] leading-[1.1] text-ink md:text-[46px]">
                                Project yang dikerjakan dengan{' '}
                                <span className="italic">scope rapi</span> dan
                                handover yang tuntas.
                            </h2>
                        </Reveal>
                    </div>
                    <div className="col-span-12 md:col-span-5">
                        <Reveal delay={0.1}>
                            <p className="text-[14px] leading-relaxed text-muted-ink">
                                Beberapa contoh project. Tampilan dan stack
                                disesuaikan ukuran tim dan jenis kebutuhan.
                            </p>
                        </Reveal>
                    </div>
                </div>

                <Stagger className="mt-14 grid gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16">
                    {works.map((work) => (
                        <motion.article
                            key={work.number}
                            variants={itemVariants}
                            className="group"
                        >
                            <a
                                href="#contact"
                                className="block focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-teal)_30%,transparent)] focus-visible:ring-offset-4 focus-visible:ring-offset-white focus-visible:outline-none"
                            >
                                <WorkPlaceholder {...work} />

                                <div className="mt-5 flex items-start justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-muted-ink uppercase">
                                            <span className="text-gold">
                                                {work.number}
                                            </span>
                                            <span className="size-1 rounded-full bg-line" />
                                            <span>{work.category}</span>
                                        </div>
                                        <h3 className="mt-2 font-display text-[24px] text-ink transition-colors duration-300 group-hover:text-[var(--color-teal)] md:text-[30px]">
                                            {work.name}
                                        </h3>
                                    </div>
                                    <ArrowUpRight
                                        aria-hidden
                                        className="mt-3 size-4 text-muted-ink transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-teal)]"
                                    />
                                </div>

                                <dl className="mt-5 grid gap-4 border-t border-line pt-5 md:grid-cols-2">
                                    <div>
                                        <dt className="text-[11px] tracking-[0.18em] text-muted-ink uppercase">
                                            Tantangan
                                        </dt>
                                        <dd className="mt-1.5 text-[13.5px] leading-relaxed text-ink">
                                            {work.challenge}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-[11px] tracking-[0.18em] text-muted-ink uppercase">
                                            Hasil
                                        </dt>
                                        <dd className="mt-1.5 text-[13.5px] leading-relaxed text-ink">
                                            {work.result}
                                        </dd>
                                    </div>
                                </dl>

                                <ul className="mt-4 flex flex-wrap gap-2">
                                    {work.stack.map((s) => (
                                        <li
                                            key={s}
                                            className="rounded-full border border-line bg-white px-2.5 py-1 text-[11px] text-muted-ink"
                                        >
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </a>
                        </motion.article>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}

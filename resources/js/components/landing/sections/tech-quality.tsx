import { techGroups } from '@/data/techStack';
import { Reveal } from '../ui/reveal';
import { SectionLabel } from '../ui/section-label';

export function TechQuality() {
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
                <div className="grid grid-cols-12 items-end gap-y-8 md:gap-x-12">
                    <div className="col-span-12 md:col-span-7">
                        <SectionLabel number="05">Tech & Quality</SectionLabel>
                        <Reveal>
                            <h2 className="mt-4 font-display text-[34px] leading-[1.1] text-ink md:text-[44px]">
                                Stack modern, dipilih karena{' '}
                                <span className="italic">stabil</span> dan mudah
                                dirawat.
                            </h2>
                        </Reveal>
                    </div>
                    <div className="col-span-12 md:col-span-5">
                        <Reveal delay={0.1}>
                            <p className="text-[14px] leading-relaxed text-muted-ink">
                                Stack selalu disesuaikan dengan ukuran project,
                                budget, dan kebutuhan maintenance. Tidak semua
                                project butuh sistem besar.
                            </p>
                        </Reveal>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 border-t border-line md:grid-cols-2 lg:grid-cols-4">
                    {techGroups.map((group, idx) => (
                        <Reveal
                            key={group.label}
                            delay={idx * 0.06}
                            className={[
                                'border-b border-line p-6 md:p-8',
                                idx > 0 ? 'lg:border-l' : '',
                                idx === 1 ? 'md:border-l' : '',
                                idx === 3 ? 'md:border-l' : '',
                            ].join(' ')}
                        >
                            <div className="flex items-center gap-2">
                                <span className="size-1.5 rounded-full bg-gold" />
                                <span className="text-[11px] tracking-[0.2em] text-muted-ink uppercase">
                                    {group.label}
                                </span>
                            </div>
                            <ul className="mt-4 flex flex-wrap gap-2">
                                {group.items.map((item) => (
                                    <li
                                        key={item}
                                        className="rounded-full border border-line bg-soft px-3 py-1 text-[12.5px] text-ink"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

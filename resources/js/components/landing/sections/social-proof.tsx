import { metrics } from '@/data/socialProof';
import { Reveal } from '../ui/reveal';

export function SocialProof() {
    return (
        <section className="border-y border-line bg-white">
            <div className="mx-auto max-w-[1200px] px-5 md:px-8">
                <Reveal>
                    <p className="py-6 text-[13px] tracking-tight text-muted-ink md:text-[14px]">
                        Dipercaya untuk{' '}
                        <span className="text-ink">company profile</span>,{' '}
                        <span className="text-ink">landing page</span>,{' '}
                        <span className="text-ink">dashboard internal</span>,{' '}
                        <span className="text-ink">katalog</span>, dan{' '}
                        <span className="text-ink">sistem booking</span>.
                    </p>
                </Reveal>

                <div className="grid grid-cols-2 divide-x divide-y divide-line border-y border-line md:grid-cols-4 md:divide-y-0">
                    {metrics.map((m, idx) => (
                        <Reveal
                            key={m.label}
                            delay={idx * 0.06}
                            className="px-5 py-6 md:px-7 md:py-8"
                        >
                            <div className="font-display text-[26px] leading-none text-ink md:text-[34px]">
                                {m.value}
                            </div>
                            <div className="mt-2 text-[12px] tracking-[0.16em] text-muted-ink uppercase">
                                {m.label}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

import { motion, useReducedMotion } from 'motion/react';
import { AnimatedBackground } from '../ui/animated-background';
import { CTALink } from '../ui/cta-button';
import { MockupComposition } from '../ui/mockup-composition';

export function Hero() {
    const reduce = useReducedMotion();

    const fadeUp = (delay: number) =>
        reduce
            ? {}
            : {
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: {
                      duration: 0.8,
                      delay,
                      ease: [0.22, 1, 0.36, 1] as [
                          number,
                          number,
                          number,
                          number,
                      ],
                  },
              };

    return (
        <section
            id="top"
            className="relative isolate overflow-hidden bg-white pt-28 md:pt-36"
        >
            <AnimatedBackground />

            <div className="mx-auto max-w-[1200px] px-5 md:px-8">
                {/* Editorial top label */}
                <motion.div
                    {...fadeUp(0)}
                    className="flex items-center gap-3 text-[11px] tracking-[0.2em] text-muted-ink uppercase"
                >
                    <span
                        aria-hidden
                        className="block h-1 w-1 rounded-full bg-gold"
                    />
                    Solvara Studio · Digital craft, sejak scope awal
                </motion.div>

                <div className="mt-6 grid grid-cols-12 gap-y-12 md:gap-x-10 lg:gap-x-16">
                    {/* Left text */}
                    <div className="col-span-12 lg:col-span-7">
                        <motion.h1
                            {...fadeUp(0.05)}
                            className="font-display text-[44px] leading-[1.05] tracking-[-0.01em] text-ink sm:text-[56px] md:text-[68px] lg:text-[74px]"
                        >
                            Website dan aplikasi
                            <br className="hidden sm:block" /> yang terasa rapi,
                            cepat,
                            <br className="hidden sm:block" /> dan{' '}
                            <span className="italic">
                                <span className="accent-underline">
                                    siap dipakai bisnis
                                </span>
                            </span>
                            .
                        </motion.h1>

                        <motion.p
                            {...fadeUp(0.18)}
                            className="mt-7 max-w-xl text-[15px] leading-relaxed text-muted-ink md:text-[16px]"
                        >
                            Solvara Studio merancang dan membangun produk
                            digital untuk brand, UMKM, dan tim operasional yang
                            butuh tampilan elegan tanpa mengorbankan fungsi.
                        </motion.p>

                        <motion.div
                            {...fadeUp(0.28)}
                            className="mt-9 flex flex-wrap items-center gap-3"
                        >
                            <CTALink href="#contact" variant="primary">
                                Konsultasi Project
                            </CTALink>
                            <CTALink href="#process" variant="secondary">
                                Lihat Cara Kerja
                            </CTALink>
                        </motion.div>

                        <motion.div
                            {...fadeUp(0.4)}
                            className="mt-10 flex items-center gap-2 text-[12px] tracking-tight text-muted-ink"
                        >
                            <span className="inline-flex h-1 w-6 bg-gold/70" />
                            <span>
                                Discovery jelas. Scope rapi. Delivery bertahap.
                            </span>
                        </motion.div>
                    </div>

                    {/* Right visual */}
                    <div className="col-span-12 lg:col-span-5">
                        <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center pb-8 lg:pb-0">
                            <MockupComposition />
                        </div>
                    </div>
                </div>
            </div>

            {/* Editorial bottom rule */}
            <div className="mx-auto mt-20 max-w-[1200px] border-t border-line px-5 md:px-8" />
        </section>
    );
}

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { services } from '@/data/services';
import { Reveal, Stagger, itemVariants } from '../ui/reveal';
import { SectionLabel } from '../ui/section-label';

export function Services() {
    return (
        <section id="services" className="bg-white">
            <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
                <div className="grid grid-cols-12 gap-y-10 md:gap-x-12">
                    <div className="col-span-12 md:col-span-4">
                        <SectionLabel number="01">Services</SectionLabel>
                        <Reveal>
                            <h2 className="mt-4 font-display text-[34px] leading-[1.1] text-ink md:text-[44px]">
                                Layanan yang kami{' '}
                                <span className="italic">rancang</span> sesuai
                                kebutuhan project.
                            </h2>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-muted-ink">
                                Tidak semua project perlu sistem besar. Yang
                                penting tepat guna, mudah dirawat, dan jelas
                                cara mengembangkannya.
                            </p>
                        </Reveal>
                    </div>

                    <Stagger className="col-span-12 md:col-span-8">
                        <ul className="border-t border-line">
                            {services.map((service) => {
                                const Icon = service.icon;

                                return (
                                    <motion.li
                                        key={service.id}
                                        variants={itemVariants}
                                        className="group border-b border-line"
                                    >
                                        <a
                                            href="#contact"
                                            className="flex items-start justify-between gap-4 py-6 transition-colors duration-300 hover:bg-mint/40 focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-teal)_30%,transparent)] focus-visible:outline-none"
                                        >
                                            <div className="flex flex-1 items-start gap-4 px-2 md:px-4">
                                                <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-md border border-line bg-white text-teal transition-colors duration-300 group-hover:border-[var(--color-teal)] group-hover:bg-mint">
                                                    <Icon
                                                        aria-hidden
                                                        className="size-4"
                                                    />
                                                </span>
                                                <div>
                                                    <h3 className="text-[18px] font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-[var(--color-teal)] md:text-[20px]">
                                                        {service.title}
                                                    </h3>
                                                    <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-muted-ink">
                                                        {service.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <ArrowUpRight
                                                aria-hidden
                                                className="mt-3 size-4 shrink-0 text-muted-ink transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-teal)]"
                                            />
                                        </a>
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

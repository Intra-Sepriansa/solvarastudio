import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    Check,
    ExternalLink,
    Layers3,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import FloatingAppearanceToggle from '@/components/floating-appearance-toggle';
import LanguageToggle from '@/components/language-toggle';
import { works } from '@/data/works';
import type { Work } from '@/data/works';
import { useAppearance } from '@/hooks/use-appearance';
import { useTranslator } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { home } from '@/routes';
import { show as projectShow } from '@/routes/projects';

const accentClass: Record<Work['accent'], string> = {
    mint: 'bg-[#a7e33d]',
    mist: 'bg-[#9ee5da]',
    soft: 'bg-[#ef6f61]',
    gold: 'bg-[#d8b56d]',
};

export default function ProjectsIndex() {
    const reduce = useReducedMotion();
    const { resolvedAppearance } = useAppearance();
    const { t } = useTranslator();
    const isLightMode = resolvedAppearance === 'light';

    return (
        <>
            <Head title={t('Project - Solvara Studio')}>
                <meta
                    name="description"
                    content={t(
                        'Kumpulan project Solvara Studio: ciper, LinguaPath, MajorMind, dan SMANTEN.',
                    )}
                />
                <meta
                    name="theme-color"
                    content={isLightMode ? '#f6f8f2' : '#050706'}
                />
            </Head>

            <main className="min-h-screen overflow-x-hidden bg-[#f6f8f2] p-2 text-[#0b1110] antialiased dark:bg-black dark:text-white">
                <section className="relative overflow-hidden rounded-[24px] bg-white text-[#0b1110] shadow-[0_34px_120px_-88px_rgba(11,17,16,0.42)] sm:rounded-[34px] dark:bg-[#0b0d0c] dark:text-white dark:shadow-[0_34px_120px_-88px_rgba(167,227,61,0.35)]">
                    <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#d2ed71]/52 to-transparent dark:from-[#17200f]/90" />
                    <ProjectTopbar />

                    <div className="relative mx-auto max-w-[1180px] px-4 pt-30 pb-12 sm:px-8 sm:pt-36 sm:pb-16 md:pt-44 md:pb-24">
                        <motion.div
                            initial={reduce ? false : { opacity: 0, y: 18 }}
                            animate={reduce ? undefined : { opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.58,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="max-w-4xl"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/4 px-3.5 py-2 text-[11px] font-semibold tracking-[0.16em] uppercase backdrop-blur sm:px-4 sm:text-[12px] dark:border-white/12 dark:bg-white/6">
                                <Layers3 className="size-4 text-[#7eb61d]" />
                                {t('Project library')}
                            </div>
                            <h1 className="mt-6 text-[40px] leading-[1] font-semibold tracking-tight sm:mt-7 sm:text-[74px] lg:text-[96px]">
                                {t('Project yang sudah punya konteks nyata.')}
                            </h1>
                            <p className="mt-7 max-w-2xl text-[16px] leading-7 text-black/58 sm:text-[18px] dark:text-white/58">
                                {t(
                                    'Dari starter Laravel sampai portal sekolah kompleks, setiap project punya kebutuhan, fitur, dan pendekatan UI yang berbeda.',
                                )}
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="px-4 py-10 sm:px-8 sm:py-14 md:py-20">
                    <div className="mx-auto grid max-w-[1180px] gap-5 sm:gap-8 md:grid-cols-2">
                        {works.map((work, index) => (
                            <ProjectCard
                                key={work.slug}
                                work={work}
                                index={index}
                            />
                        ))}
                    </div>
                </section>
                <FloatingAppearanceToggle />
            </main>
        </>
    );
}

function ProjectTopbar() {
    const { t } = useTranslator();

    return (
        <header className="absolute top-3 right-3 left-3 z-20 mx-auto flex h-[54px] max-w-[1180px] items-center justify-between rounded-full border border-black/10 bg-white/88 px-3 text-[#0b1110] shadow-[0_18px_60px_-34px_rgba(11,17,16,0.42)] backdrop-blur-xl sm:top-4 sm:right-4 sm:left-4 sm:h-[72px] sm:px-7 dark:border-white/12 dark:bg-black/92 dark:text-white dark:shadow-[0_18px_60px_-28px_rgba(167,227,61,0.7)]">
            <Link
                href={home.url()}
                className="inline-flex items-center gap-3 rounded-full focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:outline-none dark:focus-visible:ring-white/40"
                aria-label={t('Kembali ke Solvara Studio')}
            >
                <img
                    src="/logo.png"
                    alt=""
                    className="size-8 object-contain"
                    aria-hidden
                />
                <span className="text-[14px] font-semibold max-[380px]:hidden sm:text-[15px]">
                    Solvara Studio
                </span>
            </Link>

            <div className="flex items-center gap-2">
                <LanguageToggle
                    tone="adaptive"
                    className="hidden sm:inline-flex"
                />
                <Link
                    href={`${home.url()}#work`}
                    className="hidden h-10 items-center gap-2 rounded-[12px] border border-black/10 px-4 text-[13px] font-semibold text-black/64 transition hover:bg-black/5 hover:text-black focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-none sm:inline-flex dark:border-white/12 dark:text-white/72 dark:hover:bg-white/8 dark:hover:text-white dark:focus-visible:ring-white/30"
                >
                    <ArrowLeft className="size-4" />
                    {t('Landing')}
                </Link>
                <Link
                    href={`${home.url()}#contact`}
                    className="inline-flex h-10 items-center gap-2 rounded-[12px] bg-[#a7e33d] px-3 text-[12px] font-semibold text-black transition hover:bg-[#d2ed71] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none sm:px-4 sm:text-[13px]"
                >
                    {t('Diskusi Project')}
                    <ArrowRight className="size-4" />
                </Link>
            </div>
        </header>
    );
}

function ProjectCard({ work, index }: { work: Work; index: number }) {
    const reduce = useReducedMotion();
    const { t } = useTranslator();

    return (
        <motion.article
            initial={reduce ? false : { opacity: 0, y: 22 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            whileHover={reduce ? undefined : { y: -5 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.56,
                delay: index * 0.04,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="group overflow-hidden rounded-[22px] border border-black/10 bg-white p-3 text-[#0b1110] shadow-[0_28px_90px_-72px_rgba(11,17,16,0.48)] sm:rounded-[26px] sm:p-4 dark:border-white/10 dark:bg-[#111312] dark:text-white dark:shadow-none"
        >
            <Link
                href={projectShow.url(work.slug)}
                className="block rounded-[18px] focus-visible:ring-2 focus-visible:ring-[#a7e33d]/50 focus-visible:outline-none"
            >
                <div className="relative h-[220px] overflow-hidden rounded-[18px] bg-[#eef4e7] p-3 sm:h-[300px] dark:bg-[#050706]">
                    <img
                        src={work.image}
                        alt={`${t('Screenshot project')} ${work.name}`}
                        className="h-full w-full rounded-[14px] border border-black/10 object-cover object-top transition duration-500 group-hover:scale-[1.025] dark:border-white/10"
                        loading="lazy"
                    />
                    <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-b-[14px] bg-black/72 px-3 py-2 text-white backdrop-blur-md">
                        <span className="text-[12px] font-semibold">
                            {work.name}
                        </span>
                        <span
                            className={cn(
                                'rounded-full px-2.5 py-1 text-[10px] font-semibold text-black',
                                accentClass[work.accent],
                            )}
                        >
                            {work.number}
                        </span>
                    </div>
                </div>
            </Link>

            <div className="px-1 pt-5 pb-2">
                <div className="flex items-center gap-2 text-[11px] tracking-[0.18em] text-black/42 uppercase dark:text-white/42">
                    <span className="text-[#a7e33d]">{work.number}</span>
                    <span className="size-1 rounded-full bg-black/20 dark:bg-white/20" />
                    {t(work.category)}
                </div>
                <h2 className="mt-3 text-[28px] leading-tight font-semibold tracking-tight sm:text-[34px] sm:leading-none">
                    {work.name}
                </h2>
                <p className="mt-4 text-[14px] leading-6 text-black/58 dark:text-white/58">
                    {t(work.summary)}
                </p>

                <ul className="mt-5 grid gap-2">
                    {work.highlights.map((item) => (
                        <li
                            key={item}
                            className="flex items-center gap-2 text-[13px] text-black/64 dark:text-white/64"
                        >
                            <Check className="size-4 text-[#a7e33d]" />
                            {t(item)}
                        </li>
                    ))}
                </ul>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href={projectShow.url(work.slug)}
                        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[12px] bg-[#0b1110] text-[13px] font-semibold text-white transition hover:bg-[#26301d] focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-none dark:bg-white dark:text-black dark:hover:bg-[#d2ed71] dark:focus-visible:ring-white/30"
                    >
                        {t('Detail project')}
                        <ArrowRight className="size-4" />
                    </Link>
                    <a
                        href={work.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[12px] border border-black/12 text-[13px] font-semibold text-black/72 transition hover:border-[#7eb61d]/45 hover:bg-black/5 hover:text-black focus-visible:ring-2 focus-visible:ring-[#a7e33d]/50 focus-visible:outline-none dark:border-white/12 dark:text-white dark:hover:border-[#a7e33d]/45 dark:hover:bg-white/6"
                    >
                        {t('Buka live')}
                        <ExternalLink className="size-4" />
                    </a>
                </div>
            </div>
        </motion.article>
    );
}

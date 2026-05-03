import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    Check,
    ExternalLink,
    Layers3,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { works } from '@/data/works';
import type { Work } from '@/data/works';
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

    return (
        <>
            <Head title="Project - Solvara Studio">
                <meta
                    name="description"
                    content="Kumpulan project Solvara Studio: ciper, LinguaPath, MajorMind, dan SMANTEN."
                />
            </Head>

            <main className="min-h-screen overflow-x-hidden bg-black p-2 text-white antialiased">
                <section className="relative overflow-hidden rounded-[28px] bg-[#f8faf2] text-black sm:rounded-[34px]">
                    <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#d2ed71]/60 to-transparent" />
                    <ProjectTopbar />

                    <div className="relative mx-auto max-w-[1180px] px-5 pt-36 pb-16 sm:px-8 md:pt-44 md:pb-24">
                        <motion.div
                            initial={reduce ? false : { opacity: 0, y: 18 }}
                            animate={reduce ? undefined : { opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.58,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="max-w-4xl"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/72 px-4 py-2 text-[12px] font-semibold tracking-[0.16em] uppercase backdrop-blur">
                                <Layers3 className="size-4 text-[#7eb61d]" />
                                Project library
                            </div>
                            <h1 className="mt-7 text-[48px] leading-[0.94] font-semibold tracking-tight sm:text-[74px] lg:text-[96px]">
                                Project yang sudah punya konteks nyata.
                            </h1>
                            <p className="mt-7 max-w-2xl text-[16px] leading-7 text-black/58 sm:text-[18px]">
                                Dari starter Laravel sampai portal sekolah
                                kompleks, setiap project punya kebutuhan, fitur,
                                dan pendekatan UI yang berbeda.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="px-5 py-14 sm:px-8 md:py-20">
                    <div className="mx-auto grid max-w-[1180px] gap-8 md:grid-cols-2">
                        {works.map((work, index) => (
                            <ProjectCard
                                key={work.slug}
                                work={work}
                                index={index}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}

function ProjectTopbar() {
    return (
        <header className="absolute top-4 right-4 left-4 z-20 mx-auto flex h-[58px] max-w-[1180px] items-center justify-between rounded-full border border-black/10 bg-black/92 px-4 text-white shadow-[0_18px_60px_-28px_rgba(167,227,61,0.7)] backdrop-blur-xl sm:h-[72px] sm:px-7">
            <Link
                href={home.url()}
                className="inline-flex items-center gap-3 rounded-full focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                aria-label="Kembali ke Solvara Studio"
            >
                <span className="relative inline-flex size-7 items-center justify-center rounded-full bg-white text-black">
                    <span className="font-display text-[15px] leading-none italic">
                        S
                    </span>
                    <span className="absolute -right-0.5 -bottom-0.5 size-1.5 rounded-full bg-[#d8b56d]" />
                </span>
                <span className="text-[15px] font-semibold">
                    Solvara Studio
                </span>
            </Link>

            <div className="flex items-center gap-2">
                <Link
                    href={`${home.url()}#work`}
                    className="hidden h-10 items-center gap-2 rounded-[12px] border border-white/12 px-4 text-[13px] font-semibold text-white/72 transition hover:bg-white/8 hover:text-white focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none sm:inline-flex"
                >
                    <ArrowLeft className="size-4" />
                    Landing
                </Link>
                <Link
                    href={`${home.url()}#contact`}
                    className="inline-flex h-10 items-center gap-2 rounded-[12px] bg-[#a7e33d] px-4 text-[13px] font-semibold text-black transition hover:bg-[#d2ed71] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                >
                    Diskusi Project
                    <ArrowRight className="size-4" />
                </Link>
            </div>
        </header>
    );
}

function ProjectCard({ work, index }: { work: Work; index: number }) {
    const reduce = useReducedMotion();

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
            className="group overflow-hidden rounded-[26px] border border-white/10 bg-[#111312] p-4"
        >
            <Link
                href={projectShow.url(work.slug)}
                className="block rounded-[18px] focus-visible:ring-2 focus-visible:ring-[#a7e33d]/50 focus-visible:outline-none"
            >
                <div className="relative h-[300px] overflow-hidden rounded-[18px] bg-[#050706] p-3">
                    <img
                        src={work.image}
                        alt={`Screenshot project ${work.name}`}
                        className="h-full w-full rounded-[14px] border border-white/10 object-cover object-top transition duration-500 group-hover:scale-[1.025]"
                        loading="lazy"
                    />
                    <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-b-[14px] bg-black/72 px-3 py-2 backdrop-blur-md">
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
                <div className="flex items-center gap-2 text-[11px] tracking-[0.18em] text-white/42 uppercase">
                    <span className="text-[#a7e33d]">{work.number}</span>
                    <span className="size-1 rounded-full bg-white/20" />
                    {work.category}
                </div>
                <h2 className="mt-3 text-[34px] leading-none font-semibold tracking-tight">
                    {work.name}
                </h2>
                <p className="mt-4 text-[14px] leading-6 text-white/58">
                    {work.summary}
                </p>

                <ul className="mt-5 grid gap-2">
                    {work.highlights.map((item) => (
                        <li
                            key={item}
                            className="flex items-center gap-2 text-[13px] text-white/64"
                        >
                            <Check className="size-4 text-[#a7e33d]" />
                            {item}
                        </li>
                    ))}
                </ul>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href={projectShow.url(work.slug)}
                        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[12px] bg-white text-[13px] font-semibold text-black transition hover:bg-[#d2ed71] focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none"
                    >
                        Detail project
                        <ArrowRight className="size-4" />
                    </Link>
                    <a
                        href={work.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[12px] border border-white/12 text-[13px] font-semibold text-white transition hover:border-[#a7e33d]/45 hover:bg-white/6 focus-visible:ring-2 focus-visible:ring-[#a7e33d]/50 focus-visible:outline-none"
                    >
                        Buka live
                        <ExternalLink className="size-4" />
                    </a>
                </div>
            </div>
        </motion.article>
    );
}

import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Check,
    ExternalLink,
    Gauge,
    Layers3,
    Sparkles,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import LogoLoop from '@/components/LogoLoop';
import type { LogoItem } from '@/components/LogoLoop';
import { findWorkBySlug, works } from '@/data/works';
import type { Work } from '@/data/works';
import { cn } from '@/lib/utils';
import { home } from '@/routes';
import { index as projectsIndex, show as projectShow } from '@/routes/projects';

const accentClass: Record<Work['accent'], string> = {
    mint: 'bg-[#a7e33d]',
    mist: 'bg-[#9ee5da]',
    soft: 'bg-[#ef6f61]',
    gold: 'bg-[#d8b56d]',
};

const simpleIcon = (slug: string) =>
    `https://cdn.simpleicons.org/${slug}/000000`;

type ProjectShowProps = {
    slug: string;
};

export default function ProjectShow({ slug }: ProjectShowProps) {
    const project = findWorkBySlug(slug) ?? works[0];
    const related = works.filter((work) => work.slug !== project.slug);
    const reduce = useReducedMotion();

    return (
        <>
            <Head title={`${project.name} - Solvara Studio`}>
                <meta name="description" content={project.summary} />
            </Head>

            <main className="min-h-screen overflow-x-hidden bg-black p-2 text-white antialiased">
                <section className="relative overflow-hidden rounded-[28px] bg-[#f8faf2] text-black sm:rounded-[34px]">
                    <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#d2ed71]/68 to-transparent" />
                    <ProjectTopbar />

                    <div className="relative mx-auto grid max-w-[1180px] gap-10 px-5 pt-36 pb-16 sm:px-8 md:pt-44 md:pb-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                        <motion.div
                            initial={reduce ? false : { opacity: 0, y: 18 }}
                            animate={reduce ? undefined : { opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.58,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/72 px-4 py-2 text-[12px] font-semibold tracking-[0.16em] uppercase backdrop-blur">
                                <Sparkles className="size-4 text-[#7eb61d]" />
                                Project detail
                            </div>
                            <h1 className="mt-7 text-[56px] leading-[0.9] font-semibold tracking-tight sm:text-[84px]">
                                {project.name}
                            </h1>
                            <p className="mt-6 text-[15px] font-semibold tracking-[0.18em] text-black/42 uppercase">
                                {project.category}
                            </p>
                            <p className="mt-6 max-w-2xl text-[16px] leading-7 text-black/60 sm:text-[18px]">
                                {project.summary}
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[12px] bg-black px-5 text-[14px] font-semibold text-white transition hover:bg-[#1b211d] focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:outline-none"
                                >
                                    Buka live project
                                    <ExternalLink className="size-4" />
                                </a>
                                <Link
                                    href={projectsIndex.url()}
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[12px] border border-black/12 bg-white/64 px-5 text-[14px] font-semibold text-black transition hover:bg-white focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-none"
                                >
                                    Semua project
                                    <ArrowRight className="size-4" />
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={
                                reduce
                                    ? false
                                    : { opacity: 0, y: 24, scale: 0.98 }
                            }
                            animate={
                                reduce
                                    ? undefined
                                    : { opacity: 1, y: 0, scale: 1 }
                            }
                            transition={{
                                duration: 0.7,
                                delay: 0.08,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="rounded-[24px] border border-black/10 bg-black p-3 shadow-[0_38px_120px_-58px_rgba(0,0,0,0.9)]"
                        >
                            <ProjectHeroMedia project={project} />
                        </motion.div>
                    </div>
                </section>

                <section className="px-5 py-14 sm:px-8 md:py-20">
                    <div className="mx-auto max-w-[1180px] space-y-8">
                        <section className="rounded-[26px] border border-white/10 bg-[#111312] p-5 sm:p-7">
                            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-[#a7e33d] uppercase">
                                <Gauge className="size-4" />
                                Konteks penggunaan
                            </div>
                            <p className="mt-4 text-[15px] leading-7 text-white/58">
                                {project.suitableFor}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {project.highlights.map((item) => (
                                    <span
                                        key={item}
                                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/68"
                                    >
                                        <Check className="size-3.5 text-[#a7e33d]" />
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <DetailPanel
                            title="Tantangan"
                            body={project.challenge}
                        />
                        <DetailPanel title="Hasil" body={project.result} />

                        <ListPanel
                            title="Fitur utama"
                            icon={<Layers3 className="size-4" />}
                            items={project.features}
                        />

                        <ListPanel
                            title="Animasi dan UI advanced"
                            icon={<Sparkles className="size-4" />}
                            items={project.animation}
                        />

                        <TechStackPanel items={project.techStack} />
                    </div>
                </section>

                <section className="px-5 pb-16 sm:px-8 md:pb-24">
                    <div className="mx-auto max-w-[1180px] border-t border-white/10 pt-10">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-[11px] font-semibold tracking-[0.18em] text-[#a7e33d] uppercase">
                                    Project lain
                                </p>
                                <h2 className="mt-3 text-[34px] leading-none font-semibold tracking-tight">
                                    Lihat konteks berbeda.
                                </h2>
                            </div>
                            <Link
                                href={projectsIndex.url()}
                                className="inline-flex h-11 w-fit items-center gap-2 rounded-[12px] border border-white/12 px-4 text-[13px] font-semibold text-white transition hover:border-[#a7e33d]/45 hover:bg-white/6 focus-visible:ring-2 focus-visible:ring-[#a7e33d]/50 focus-visible:outline-none"
                            >
                                Semua project
                                <ArrowUpRight className="size-4" />
                            </Link>
                        </div>

                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            {related.map((work) => (
                                <Link
                                    key={work.slug}
                                    href={projectShow.url(work.slug)}
                                    className="group rounded-[22px] border border-white/10 bg-[#111312] p-3 transition hover:border-[#a7e33d]/45 focus-visible:ring-2 focus-visible:ring-[#a7e33d]/50 focus-visible:outline-none"
                                >
                                    <img
                                        src={work.image}
                                        alt={`Screenshot project ${work.name}`}
                                        className="aspect-[1.72] w-full rounded-[16px] object-cover object-top"
                                        loading="lazy"
                                    />
                                    <div className="p-2">
                                        <div className="mt-3 flex items-center justify-between gap-3">
                                            <h3 className="text-[22px] font-semibold tracking-tight">
                                                {work.name}
                                            </h3>
                                            <span
                                                className={cn(
                                                    'size-2 rounded-full',
                                                    accentClass[work.accent],
                                                )}
                                            />
                                        </div>
                                        <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-white/52">
                                            {work.summary}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

function ProjectHeroMedia({ project }: { project: Work }) {
    const mediaClass =
        'aspect-[1.74] w-full rounded-[18px] border border-white/10 object-cover object-top';

    if (project.video) {
        return (
            <video
                key={project.video}
                className={mediaClass}
                poster={project.image}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={`Preview video project ${project.name}`}
            >
                <source src={project.video} type="video/mp4" />
                <img
                    src={project.image}
                    alt={`Screenshot project ${project.name}`}
                    className={mediaClass}
                />
            </video>
        );
    }

    return (
        <img
            src={project.image}
            alt={`Screenshot project ${project.name}`}
            className={mediaClass}
        />
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
                    href={projectsIndex.url()}
                    className="hidden h-10 items-center gap-2 rounded-[12px] border border-white/12 px-4 text-[13px] font-semibold text-white/72 transition hover:bg-white/8 hover:text-white focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none sm:inline-flex"
                >
                    <ArrowLeft className="size-4" />
                    Project
                </Link>
                <Link
                    href={`${home.url()}#contact`}
                    className="inline-flex h-10 items-center gap-2 rounded-[12px] bg-[#a7e33d] px-4 text-[13px] font-semibold text-black transition hover:bg-[#d2ed71] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                >
                    Diskusi
                    <ArrowRight className="size-4" />
                </Link>
            </div>
        </header>
    );
}

function DetailPanel({ title, body }: { title: string; body: string }) {
    return (
        <section className="rounded-[26px] border border-white/10 bg-[#111312] p-5 sm:p-7">
            <h2 className="text-[28px] leading-tight font-semibold tracking-tight">
                {title}
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-white/58">{body}</p>
        </section>
    );
}

function ListPanel({
    title,
    icon,
    items,
}: {
    title: string;
    icon: ReactNode;
    items: string[];
}) {
    return (
        <section className="rounded-[26px] border border-white/10 bg-[#111312] p-5 sm:p-7">
            <div className="flex items-center gap-2">
                <span className="text-[#a7e33d]">{icon}</span>
                <h2 className="text-[28px] leading-tight font-semibold tracking-tight">
                    {title}
                </h2>
            </div>
            <ul className="mt-6 grid gap-3">
                {items.map((item) => (
                    <li
                        key={item}
                        className="flex gap-3 border-t border-white/10 pt-3 text-[14px] leading-7 text-white/58 first:border-t-0 first:pt-0"
                    >
                        <Check className="mt-1 size-4 shrink-0 text-[#a7e33d]" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function TechStackPanel({ items }: { items: string[] }) {
    const logoItems = getTechLogoItems(items);
    const [activeItem, setActiveItem] = useState(items[0]);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
    const activeLogo = getTechLogoItems([activeItem])[0] ?? logoItems[0];

    return (
        <section className="relative overflow-hidden border-y border-white/10 py-10 sm:py-14">
            <div className="grid gap-9 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                <div className="lg:sticky lg:top-28">
                    <p className="text-[11px] font-semibold tracking-[0.18em] text-[#a7e33d] uppercase">
                        Tech stack
                    </p>
                    <h2 className="mt-4 max-w-md text-[38px] leading-[1.02] font-semibold tracking-tight text-white sm:text-[54px]">
                        Dibangun dengan stack yang sesuai kebutuhan produk.
                    </h2>
                    <p className="mt-6 max-w-sm text-[15px] leading-7 text-white/42">
                        Hover nama stack untuk melihat logo. Bagian ini sengaja
                        dibuat seperti technical note, bukan daftar chip.
                    </p>
                </div>

                <div className="min-w-0">
                    <div className="relative overflow-hidden border-y border-white/10 py-5 text-white">
                        <LogoLoop
                            logos={logoItems}
                            speed={58}
                            direction="left"
                            logoHeight={40}
                            gap={52}
                            hoverSpeed={0}
                            scaleOnHover
                            fadeOut
                            fadeOutColor="#111312"
                            renderItem={(item) => (
                                <TechLoopLogoItem item={item} />
                            )}
                            ariaLabel="Logo tech stack project"
                        />
                    </div>

                    <div
                        className="relative mt-9"
                        onMouseEnter={() => setIsPreviewVisible(true)}
                        onMouseLeave={() => setIsPreviewVisible(false)}
                        onMouseMove={(event) => {
                            const rect =
                                event.currentTarget.getBoundingClientRect();
                            const x = Math.min(
                                Math.max(event.clientX - rect.left + 28, 56),
                                rect.width - 56,
                            );
                            const y = Math.min(
                                Math.max(event.clientY - rect.top - 112, 18),
                                rect.height - 82,
                            );

                            setPreviewPosition({ x, y });
                        }}
                    >
                        {activeLogo && (
                            <motion.div
                                aria-hidden
                                initial={false}
                                animate={{
                                    opacity: isPreviewVisible ? 1 : 0,
                                    y: isPreviewVisible ? 0 : 8,
                                    scale: isPreviewVisible ? 1 : 0.94,
                                }}
                                transition={{
                                    duration: 0.22,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="pointer-events-none absolute z-10 hidden size-24 place-items-center rounded-[26px] border border-white/10 bg-[#0b0d0c]/94 text-white shadow-[0_28px_90px_-44px_rgba(167,227,61,0.9)] backdrop-blur-xl md:grid"
                                style={{
                                    left: previewPosition.x,
                                    top: previewPosition.y,
                                }}
                            >
                                <TechLoopLogoItem
                                    item={activeLogo}
                                    className="size-16 text-white/88"
                                />
                            </motion.div>
                        )}

                        <p className="max-w-4xl text-[21px] leading-[1.72] font-medium text-white/72 sm:text-[28px] sm:leading-[1.68]">
                            Project ini dibangun dengan{' '}
                            {items.map((item, index) => (
                                <TechInlineToken
                                    key={item}
                                    item={item}
                                    isLast={index === items.length - 1}
                                    onActivate={() => {
                                        setActiveItem(item);
                                        setIsPreviewVisible(true);
                                    }}
                                    onDeactivate={() =>
                                        setIsPreviewVisible(false)
                                    }
                                />
                            ))}
                            . Stack dipilih untuk menjaga alur development tetap
                            cepat, interface mudah dikembangkan, backend rapi,
                            dan quality check tetap realistis untuk kebutuhan
                            project.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TechInlineToken({
    item,
    isLast,
    onActivate,
    onDeactivate,
}: {
    item: string;
    isLast: boolean;
    onActivate: () => void;
    onDeactivate: () => void;
}) {
    return (
        <>
            <button
                type="button"
                className="rounded-md font-semibold text-[#a7e33d] underline decoration-[#a7e33d]/0 underline-offset-6 transition hover:decoration-[#a7e33d]/70 focus-visible:ring-2 focus-visible:ring-[#a7e33d]/60 focus-visible:outline-none"
                onFocus={onActivate}
                onMouseEnter={onActivate}
                onBlur={onDeactivate}
            >
                {item}
            </button>
            {isLast ? '' : ', '}
        </>
    );
}

function TechLoopLogoItem({
    item,
    className,
}: {
    item: LogoItem;
    className?: string;
}) {
    const label = 'node' in item ? item.title : (item.alt ?? item.title);

    return (
        <span
            className={cn(
                'inline-flex size-9 items-center justify-center text-white/58 transition duration-300 hover:scale-110 hover:text-white focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none motion-reduce:transition-none',
                className,
            )}
            role="img"
            aria-label={label ?? 'Technology logo'}
        >
            <span className="inline-flex size-[78%] items-center justify-center">
                {'node' in item ? (
                    item.node
                ) : (
                    <span
                        aria-hidden
                        className="block size-full bg-current"
                        style={{
                            WebkitMask: `url("${item.src}") center / contain no-repeat`,
                            mask: `url("${item.src}") center / contain no-repeat`,
                        }}
                    />
                )}
            </span>
        </span>
    );
}

function getTechLogoItems(items: string[]): LogoItem[] {
    const seen = new Set<string>();
    const logos: LogoItem[] = [];

    items.forEach((item) => {
        const slug = getSimpleIconSlug(item);

        if (!slug || seen.has(slug)) {
            return;
        }

        seen.add(slug);
        logos.push({
            src: simpleIcon(slug),
            alt: item,
        });
    });

    return logos;
}

function getSimpleIconSlug(item: string): string | null {
    const name = item.toLowerCase();

    if (name.includes('react hook form')) {
        return 'reacthookform';
    }

    if (name.includes('react three fiber') || name === 'drei') {
        return 'threedotjs';
    }

    if (name.includes('react leaflet') || name.includes('leaflet')) {
        return 'leaflet';
    }

    if (name.includes('tanstack')) {
        return 'reactquery';
    }

    if (name.includes('inertia')) {
        return 'inertia';
    }

    if (
        name.includes('fortify') ||
        name.includes('sanctum') ||
        name.includes('wayfinder') ||
        name.includes('boost') ||
        name.includes('pint')
    ) {
        return 'laravel';
    }

    if (name.includes('firebase')) {
        return 'firebase';
    }

    if (name.includes('laravel')) {
        return 'laravel';
    }

    if (name.includes('php')) {
        return 'php';
    }

    if (name.includes('typescript')) {
        return 'typescript';
    }

    if (name.includes('tailwind')) {
        return 'tailwindcss';
    }

    if (name.includes('radix')) {
        return 'radixui';
    }

    if (name.includes('headless')) {
        return 'headlessui';
    }

    if (name.includes('lucide')) {
        return 'lucide';
    }

    if (name.includes('vite')) {
        return 'vite';
    }

    if (name.includes('pest')) {
        return 'pest';
    }

    if (name.includes('recharts')) {
        return 'recharts';
    }

    if (name.includes('framer') || name.includes('motion')) {
        return 'framer';
    }

    if (name.includes('gsap')) {
        return 'greensock';
    }

    if (name.includes('ogl')) {
        return 'opengl';
    }

    if (name.includes('zod')) {
        return 'zod';
    }

    if (name.includes('zustand')) {
        return 'react';
    }

    if (name.includes('dompdf') || name.includes('jspdf')) {
        return 'adobeacrobatreader';
    }

    if (name.includes('three') || name.includes('react')) {
        return name.includes('three') ? 'threedotjs' : 'react';
    }

    return null;
}

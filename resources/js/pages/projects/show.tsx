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
import FloatingAppearanceToggle from '@/components/floating-appearance-toggle';
import LanguageToggle from '@/components/language-toggle';
import LogoLoop from '@/components/LogoLoop';
import type { LogoItem } from '@/components/LogoLoop';
import { findWorkBySlug, works } from '@/data/works';
import type { Work } from '@/data/works';
import { useAppearance } from '@/hooks/use-appearance';
import { useTranslator } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { home } from '@/routes';
import { index as projectsIndex, show as projectShow } from '@/routes/projects';

const accentClass: Record<Work['accent'], string> = {
    mint: 'bg-[#a7e33d]',
    mist: 'bg-[#9ee5da]',
    soft: 'bg-[#ef6f61]',
    gold: 'bg-[#d8b56d]',
};

const simpleIcon = (slug: string) => `/tech-icons/${slug}.svg`;

type ProjectShowProps = {
    slug: string;
};

export default function ProjectShow({ slug }: ProjectShowProps) {
    const project = findWorkBySlug(slug) ?? works[0];
    const related = works.filter((work) => work.slug !== project.slug);
    const reduce = useReducedMotion();
    const { resolvedAppearance } = useAppearance();
    const { t } = useTranslator();
    const isLightMode = resolvedAppearance === 'light';

    return (
        <>
            <Head title={`${project.name} - Solvara Studio`}>
                <meta name="description" content={t(project.summary)} />
                <meta
                    name="theme-color"
                    content={isLightMode ? '#f6f8f2' : '#050706'}
                />
            </Head>

            <main className="min-h-screen overflow-x-hidden bg-[#f6f8f2] p-2 text-[#0b1110] antialiased dark:bg-black dark:text-white">
                <section className="relative overflow-hidden rounded-[24px] bg-white text-[#0b1110] shadow-[0_34px_120px_-88px_rgba(11,17,16,0.42)] sm:rounded-[34px] dark:bg-[#0b0d0c] dark:text-white dark:shadow-[0_34px_120px_-88px_rgba(167,227,61,0.35)]">
                    <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#d2ed71]/58 to-transparent dark:from-[#17200f]/90" />
                    <ProjectTopbar />

                    <div className="relative mx-auto grid max-w-[1180px] gap-8 px-4 pt-30 pb-12 sm:gap-10 sm:px-8 sm:pt-36 sm:pb-16 md:pt-44 md:pb-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                        <motion.div
                            initial={reduce ? false : { opacity: 0, y: 18 }}
                            animate={reduce ? undefined : { opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.58,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/4 px-3.5 py-2 text-[11px] font-semibold tracking-[0.16em] uppercase backdrop-blur sm:px-4 sm:text-[12px] dark:border-white/12 dark:bg-white/6">
                                <Sparkles className="size-4 text-[#7eb61d]" />
                                {t('Project detail')}
                            </div>
                            <h1 className="mt-6 text-[42px] leading-[0.98] font-semibold tracking-tight sm:mt-7 sm:text-[84px]">
                                {project.name}
                            </h1>
                            <p className="mt-5 text-[13px] font-semibold tracking-[0.18em] text-black/42 uppercase sm:mt-6 sm:text-[15px] dark:text-white/42">
                                {t(project.category)}
                            </p>
                            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-black/60 sm:mt-6 sm:text-[18px] dark:text-white/58">
                                {t(project.summary)}
                            </p>

                            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[12px] bg-black px-5 text-[14px] font-semibold text-white transition hover:bg-[#1b211d] focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:outline-none dark:bg-[#a7e33d] dark:text-black dark:hover:bg-[#d2ed71] dark:focus-visible:ring-[#a7e33d]/50"
                                >
                                    {t('Buka live project')}
                                    <ExternalLink className="size-4" />
                                </a>
                                <Link
                                    href={projectsIndex.url()}
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[12px] border border-black/12 bg-white/64 px-5 text-[14px] font-semibold text-black transition hover:bg-white focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-none"
                                >
                                    {t('Semua project')}
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
                            className="rounded-[20px] border border-black/10 bg-white p-2.5 shadow-[0_38px_120px_-58px_rgba(11,17,16,0.55)] sm:rounded-[24px] sm:p-3 dark:bg-black dark:shadow-[0_38px_120px_-58px_rgba(0,0,0,0.9)]"
                        >
                            <ProjectHeroMedia project={project} />
                        </motion.div>
                    </div>
                </section>

                <ProjectDepthSection project={project} />

                <section className="mt-2 overflow-hidden rounded-[24px] bg-white text-[#0b1110] shadow-[0_34px_120px_-88px_rgba(11,17,16,0.38)] sm:rounded-[28px] dark:bg-[#0b0d0c] dark:text-white dark:shadow-[0_34px_120px_-88px_rgba(0,0,0,0.8)]">
                    <div className="mx-auto max-w-[1180px] px-4 py-10 sm:px-8 sm:py-12 md:py-16">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-[11px] font-semibold tracking-[0.18em] text-[#a7e33d] uppercase">
                                    {t('Project lain')}
                                </p>
                                <h2 className="mt-3 text-[28px] leading-tight font-semibold tracking-tight sm:text-[34px] sm:leading-none">
                                    {t('Lihat konteks berbeda.')}
                                </h2>
                            </div>
                            <Link
                                href={projectsIndex.url()}
                                className="inline-flex h-11 w-fit items-center gap-2 rounded-[12px] border border-black/12 px-4 text-[13px] font-semibold text-black/72 transition hover:border-[#7eb61d]/45 hover:bg-black/5 hover:text-black focus-visible:ring-2 focus-visible:ring-[#a7e33d]/50 focus-visible:outline-none dark:border-white/12 dark:text-white dark:hover:border-[#a7e33d]/45 dark:hover:bg-white/6"
                            >
                                {t('Semua project')}
                                <ArrowUpRight className="size-4" />
                            </Link>
                        </div>

                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            {related.map((work) => (
                                <Link
                                    key={work.slug}
                                    href={projectShow.url(work.slug)}
                                    className="group rounded-[22px] border border-black/10 bg-white p-3 shadow-[0_24px_80px_-72px_rgba(11,17,16,0.48)] transition hover:border-[#7eb61d]/45 focus-visible:ring-2 focus-visible:ring-[#a7e33d]/50 focus-visible:outline-none dark:border-white/10 dark:bg-[#111312] dark:shadow-none dark:hover:border-[#a7e33d]/45"
                                >
                                    <img
                                        src={work.image}
                                        alt={`${t('Screenshot project')} ${work.name}`}
                                        className="aspect-[1.72] w-full rounded-[16px] object-cover object-top"
                                        loading="lazy"
                                    />
                                    <div className="p-2">
                                        <div className="mt-3 flex items-center justify-between gap-3">
                                            <h3 className="min-w-0 text-[20px] leading-tight font-semibold tracking-tight sm:text-[22px]">
                                                {work.name}
                                            </h3>
                                            <span
                                                className={cn(
                                                    'size-2 rounded-full',
                                                    accentClass[work.accent],
                                                )}
                                            />
                                        </div>
                                        <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-black/54 dark:text-white/52">
                                            {t(work.summary)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
                <FloatingAppearanceToggle />
            </main>
        </>
    );
}

function ProjectHeroMedia({ project }: { project: Work }) {
    const { t } = useTranslator();
    const mediaClass =
        'aspect-[1.74] w-full rounded-[18px] border border-black/10 object-cover object-top dark:border-white/10';

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
                aria-label={`${t('Preview video project')} ${project.name}`}
            >
                <source src={project.video} type="video/mp4" />
                <img
                    src={project.image}
                    alt={`${t('Screenshot project')} ${project.name}`}
                    className={mediaClass}
                />
            </video>
        );
    }

    return (
        <img
            src={project.image}
            alt={`${t('Screenshot project')} ${project.name}`}
            className={mediaClass}
        />
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
                    src="/logo-192.webp"
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
                    href={projectsIndex.url()}
                    className="hidden h-10 items-center gap-2 rounded-[12px] border border-black/10 px-4 text-[13px] font-semibold text-black/64 transition hover:bg-black/5 hover:text-black focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-none sm:inline-flex dark:border-white/12 dark:text-white/72 dark:hover:bg-white/8 dark:hover:text-white dark:focus-visible:ring-white/30"
                >
                    <ArrowLeft className="size-4" />
                    {t('Project')}
                </Link>
                <Link
                    href={`${home.url()}#contact`}
                    className="inline-flex h-10 items-center gap-2 rounded-[12px] bg-[#a7e33d] px-3 text-[12px] font-semibold text-black transition hover:bg-[#d2ed71] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none sm:px-4 sm:text-[13px]"
                >
                    {t('Diskusi')}
                    <ArrowRight className="size-4" />
                </Link>
            </div>
        </header>
    );
}

function ProjectDepthSection({ project }: { project: Work }) {
    const { t } = useTranslator();

    return (
        <section className="relative mt-2 overflow-hidden rounded-[24px] bg-white text-[#0b1110] shadow-[0_34px_120px_-88px_rgba(11,17,16,0.42)] sm:rounded-[28px] dark:bg-[#0b0d0c] dark:text-white dark:shadow-[0_34px_120px_-88px_rgba(167,227,61,0.35)]">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(167,227,61,0.16),transparent_34%),linear-gradient(180deg,rgba(246,248,242,0),rgba(210,237,113,0.12))] dark:bg-[radial-gradient(circle_at_12%_0%,rgba(167,227,61,0.14),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0))]"
            />

            <div className="relative mx-auto max-w-[1180px] px-4 py-10 sm:px-8 md:py-16">
                <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-[#7eb61d] uppercase dark:text-[#a7e33d]">
                            <Gauge className="size-4" />
                            {t('Project breakdown')}
                        </div>
                        <h2 className="mt-5 text-[32px] leading-[1.08] font-semibold tracking-tight sm:text-[54px] lg:text-[58px]">
                            {t(
                                'Scope, alur, dan hasil dibuat jelas dari awal.',
                            )}
                        </h2>
                    </div>

                    <div className="max-w-3xl space-y-4 lg:justify-self-end">
                        {project.overview.map((paragraph) => (
                            <p
                                key={paragraph}
                                className="text-[16px] leading-8 text-black/64 dark:text-white/62"
                            >
                                {t(paragraph)}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="mt-8 overflow-hidden rounded-[20px] border border-black/10 bg-black/10 shadow-[0_28px_90px_-74px_rgba(11,17,16,0.42)] sm:mt-9 sm:rounded-[24px] dark:border-white/10 dark:bg-white/10 dark:shadow-none">
                    <div className="grid gap-px md:grid-cols-2 xl:grid-cols-4">
                        {project.delivery.map((item) => (
                            <ProjectDeliveryCell key={item.label} item={item} />
                        ))}
                    </div>
                </div>

                <div className="mt-7 grid gap-5 border-y border-black/10 py-6 sm:mt-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center dark:border-white/10">
                    <p className="border-l-2 border-[#a7e33d] pl-5 text-[15px] leading-7 font-medium text-black/70 dark:text-white/68">
                        {t(project.suitableFor)}
                    </p>
                    <div className="flex flex-wrap gap-2 lg:justify-end">
                        {project.highlights.map((item) => (
                            <span
                                key={item}
                                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/4 px-3 py-1.5 text-[12px] font-medium text-black/62 dark:border-white/10 dark:bg-white/5 dark:text-white/62"
                            >
                                <Check className="size-3.5 text-[#7eb61d] dark:text-[#a7e33d]" />
                                {t(item)}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-8 grid gap-px overflow-hidden border-y border-black/10 bg-black/10 sm:mt-10 lg:grid-cols-3 dark:border-white/10 dark:bg-white/10">
                    <ProjectTextBlock
                        eyebrow="Problem"
                        title="Tantangan"
                        body={project.challenge}
                    />
                    <ProjectTextBlock
                        eyebrow="Outcome"
                        title="Hasil"
                        body={project.result}
                    />
                    <div className="bg-white/78 p-5 sm:p-7 dark:bg-[#111312]/92">
                        <p className="text-[11px] font-semibold tracking-[0.18em] text-[#7eb61d] uppercase dark:text-[#a7e33d]">
                            {t('Workflow')}
                        </p>
                        <h3 className="mt-3 text-[24px] leading-tight font-semibold tracking-tight sm:text-[28px]">
                            {t('Alur pengerjaan')}
                        </h3>
                        <ol className="mt-6 grid gap-4">
                            {project.workflow.map((item, index) => (
                                <li
                                    key={item}
                                    className="grid grid-cols-[auto_1fr] gap-3 text-[14px] leading-6 text-black/62 dark:text-white/60"
                                >
                                    <span className="flex size-7 items-center justify-center rounded-full bg-[#a7e33d] text-[11px] font-semibold text-black">
                                        {index + 1}
                                    </span>
                                    <span>{t(item)}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="mt-8 overflow-hidden rounded-[20px] border border-black/10 bg-black/10 shadow-[0_28px_90px_-74px_rgba(11,17,16,0.38)] sm:mt-10 sm:rounded-[24px] dark:border-white/10 dark:bg-white/10 dark:shadow-none">
                    <div className="grid gap-px lg:grid-cols-[1.16fr_0.84fr]">
                        <ProjectListColumn
                            title="Fitur utama"
                            icon={<Layers3 className="size-4" />}
                            items={project.features}
                            columns="double"
                        />
                        <ProjectListColumn
                            title="Animasi dan UI advanced"
                            icon={<Sparkles className="size-4" />}
                            items={project.animation}
                        />
                    </div>
                </div>

                <TechStackPanel items={project.techStack} />
            </div>
        </section>
    );
}

function ProjectDeliveryCell({ item }: { item: Work['delivery'][number] }) {
    const { t } = useTranslator();

    return (
        <div className="min-h-38 bg-white/82 p-5 sm:p-6 dark:bg-[#111312]/92">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-black/36 uppercase dark:text-white/36">
                {t(item.label)}
            </p>
            <p className="mt-3 text-[17px] leading-snug font-semibold tracking-tight text-[#0b1110] sm:mt-4 sm:text-[18px] dark:text-white">
                {t(item.value)}
            </p>
        </div>
    );
}

function ProjectTextBlock({
    eyebrow,
    title,
    body,
}: {
    eyebrow: string;
    title: string;
    body: string;
}) {
    const { t } = useTranslator();

    return (
        <div className="bg-white/78 p-5 sm:p-7 dark:bg-[#111312]/92">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#7eb61d] uppercase dark:text-[#a7e33d]">
                {t(eyebrow)}
            </p>
            <h3 className="mt-3 text-[24px] leading-tight font-semibold tracking-tight sm:text-[28px]">
                {t(title)}
            </h3>
            <p className="mt-5 text-[15px] leading-7 text-black/62 dark:text-white/58">
                {t(body)}
            </p>
        </div>
    );
}

function ProjectListColumn({
    title,
    icon,
    items,
    columns = 'single',
}: {
    title: string;
    icon: ReactNode;
    items: string[];
    columns?: 'single' | 'double';
}) {
    const { t } = useTranslator();

    return (
        <div className="bg-white/78 p-5 sm:p-7 dark:bg-[#111312]/92">
            <div className="flex flex-col gap-4 border-b border-black/10 pb-5 sm:flex-row sm:items-start sm:justify-between dark:border-white/10">
                <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full bg-[#a7e33d] text-black">
                        {icon}
                    </span>
                    <h3 className="min-w-0 text-[24px] leading-tight font-semibold tracking-tight sm:text-[28px]">
                        {t(title)}
                    </h3>
                </div>
                <span className="w-fit shrink-0 rounded-full border border-black/10 px-3 py-1 text-[11px] font-semibold text-black/42 dark:border-white/10 dark:text-white/42">
                    {items.length} {t('item')}
                </span>
            </div>

            <ul
                className={cn(
                    'mt-5 grid gap-px overflow-hidden rounded-[18px] border border-black/10 bg-black/10 dark:border-white/10 dark:bg-white/10',
                    columns === 'double' && 'xl:grid-cols-2',
                )}
            >
                {items.map((item, index) => (
                    <li
                        key={item}
                        className="grid min-h-22 grid-cols-[auto_1fr] gap-3 bg-white/78 p-4 text-[13px] leading-6 text-black/62 dark:bg-[#0d100f]/78 dark:text-white/60"
                    >
                        <span className="flex size-6 items-center justify-center rounded-full bg-[#a7e33d] text-[10px] font-semibold text-black">
                            {index + 1}
                        </span>
                        <span>{t(item)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function TechStackPanel({ items }: { items: string[] }) {
    const logoItems = getTechLogoItems(items);
    const [activeItem, setActiveItem] = useState(items[0]);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
    const { resolvedAppearance } = useAppearance();
    const { t } = useTranslator();
    const fadeOutColor = resolvedAppearance === 'light' ? '#ffffff' : '#0b0d0c';
    const activeLogo = getTechLogoItems([activeItem])[0] ?? logoItems[0];

    return (
        <section className="relative overflow-hidden border-y border-black/10 py-9 sm:py-14 dark:border-white/10">
            <div className="grid gap-9 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                <div className="lg:sticky lg:top-28">
                    <p className="text-[11px] font-semibold tracking-[0.18em] text-[#a7e33d] uppercase">
                        {t('Tech stack')}
                    </p>
                    <h2 className="mt-4 max-w-md text-[32px] leading-[1.08] font-semibold tracking-tight text-[#0b1110] sm:text-[54px] dark:text-white">
                        {t(
                            'Dibangun dengan stack yang sesuai kebutuhan produk.',
                        )}
                    </h2>
                    <p className="mt-5 max-w-sm text-[14px] leading-7 text-black/46 sm:mt-6 sm:text-[15px] dark:text-white/42">
                        {t(
                            'Hover nama stack untuk melihat logo. Bagian ini sengaja dibuat seperti technical note, bukan daftar chip.',
                        )}
                    </p>
                </div>

                <div className="min-w-0">
                    <div className="relative overflow-hidden border-y border-black/10 py-5 text-[#0b1110] dark:border-white/10 dark:text-white">
                        <LogoLoop
                            logos={logoItems}
                            speed={58}
                            direction="left"
                            logoHeight={40}
                            gap={52}
                            hoverSpeed={0}
                            scaleOnHover
                            fadeOut
                            fadeOutColor={fadeOutColor}
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
                                className="pointer-events-none absolute z-10 hidden size-24 place-items-center rounded-[26px] border border-black/10 bg-white/94 text-[#0b1110] shadow-[0_28px_90px_-52px_rgba(11,17,16,0.65)] backdrop-blur-xl md:grid dark:border-white/10 dark:bg-[#0b0d0c]/94 dark:text-white dark:shadow-[0_28px_90px_-44px_rgba(167,227,61,0.9)]"
                                style={{
                                    left: previewPosition.x,
                                    top: previewPosition.y,
                                }}
                            >
                                <TechLoopLogoItem
                                    item={activeLogo}
                                    className="size-16 text-black/78 dark:text-white/88"
                                />
                            </motion.div>
                        )}

                        <p className="max-w-4xl text-[18px] leading-[1.7] font-medium text-black/70 sm:text-[28px] sm:leading-[1.68] dark:text-white/72">
                            {t('Project ini dibangun dengan')}{' '}
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
                            {t(
                                '. Stack dipilih untuk menjaga alur development tetap cepat, interface mudah dikembangkan, backend rapi, dan quality check tetap realistis untuk kebutuhan project.',
                            )}
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
                'inline-flex size-9 items-center justify-center text-black/58 transition duration-300 hover:scale-110 hover:text-black focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:outline-none motion-reduce:transition-none dark:text-white/58 dark:hover:text-white dark:focus-visible:ring-white/30',
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

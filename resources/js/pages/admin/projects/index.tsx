import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    ArrowUpRight,
    CheckCircle2,
    Film,
    Globe2,
    ImageIcon,
    Layers3,
    Loader2,
    LogOut,
    PanelsTopLeft,
    Pencil,
    Plus,
    Search,
    SlidersHorizontal,
    Trash2,
    UploadCloud,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { home, logout } from '@/routes';
import {
    destroy,
    index as adminProjectsIndex,
    store,
    update,
} from '@/routes/admin/projects';

type Project = {
    id: number;
    slug: string;
    name: string;
    client_name: string | null;
    type: 'web' | 'mobile' | 'network';
    type_label: string;
    category: string;
    summary: string | null;
    challenge: string;
    result: string;
    live_url: string | null;
    video_url: string | null;
    video_file_url: string | null;
    cover_image_url: string | null;
    stack: string[];
    order: number;
    is_published: boolean;
    is_featured: boolean;
    updated_at: string | null;
};

type Metrics = {
    total: number;
    published: number;
    draft: number;
    featured: number;
    web: number;
    mobile: number;
    network: number;
};

type Props = {
    projects: Project[];
    projectTypes: Record<Project['type'], string>;
    metrics: Metrics;
};

type ProjectForm = {
    name: string;
    slug: string;
    client_name: string;
    type: Project['type'];
    category: string;
    summary: string;
    challenge: string;
    result: string;
    stack_text: string;
    live_url: string;
    video_url: string;
    cover_image: File | null;
    video_file: File | null;
    order: number;
    is_published: boolean;
    is_featured: boolean;
    remove_cover_image: boolean;
    remove_video_file: boolean;
};

const blankProjectForm: ProjectForm = {
    name: '',
    slug: '',
    client_name: '',
    type: 'web',
    category: 'Website & Web Application',
    summary: '',
    challenge: '',
    result: '',
    stack_text: '',
    live_url: '',
    video_url: '',
    cover_image: null,
    video_file: null,
    order: 0,
    is_published: true,
    is_featured: false,
    remove_cover_image: false,
    remove_video_file: false,
};

const typeTone = {
    web: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300',
    mobile: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300',
    network:
        'border-lime-200 bg-lime-50 text-lime-700 dark:border-lime-400/20 dark:bg-lime-400/10 dark:text-lime-300',
} satisfies Record<Project['type'], string>;

export default function AdminProjectsIndex({
    projects,
    projectTypes,
    metrics,
}: Props) {
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [activeType, setActiveType] = useState<'all' | Project['type']>(
        'all',
    );
    const [query, setQuery] = useState('');
    const form = useForm<ProjectForm>(blankProjectForm);
    const activeTypeCount =
        activeType === 'all' ? metrics.total : metrics[activeType];
    const publishedRatio =
        metrics.total > 0
            ? Math.round((metrics.published / metrics.total) * 100)
            : 0;
    const latestProject = projects[0];

    const filteredProjects = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return projects.filter((project) => {
            const matchesType =
                activeType === 'all' || project.type === activeType;
            const searchable = [
                project.name,
                project.client_name,
                project.category,
                project.summary,
                project.stack.join(' '),
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            return matchesType && searchable.includes(normalizedQuery);
        });
    }, [activeType, projects, query]);

    const startCreate = () => {
        setEditingProject(null);
        form.reset();
        form.clearErrors();
        form.setData(blankProjectForm);
    };

    const startEdit = (project: Project) => {
        setEditingProject(project);
        form.clearErrors();
        form.setData({
            name: project.name,
            slug: project.slug,
            client_name: project.client_name ?? '',
            type: project.type,
            category: project.category,
            summary: project.summary ?? '',
            challenge: project.challenge,
            result: project.result,
            stack_text: project.stack.join(', '),
            live_url: project.live_url ?? '',
            video_url: project.video_url ?? '',
            cover_image: null,
            video_file: null,
            order: project.order,
            is_published: project.is_published,
            is_featured: project.is_featured,
            remove_cover_image: false,
            remove_video_file: false,
        });
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (editingProject) {
            form.transform((data) => ({ ...data, _method: 'patch' }));
            form.post(update.url({ project: editingProject.slug }), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: startCreate,
                onFinish: () => form.transform((data) => data),
            });

            return;
        }

        form.transform((data) => data);
        form.post(store.url(), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: startCreate,
        });
    };

    const deleteProject = (project: Project) => {
        if (
            !window.confirm(`Hapus project "${project.name}" dari panel admin?`)
        ) {
            return;
        }

        router.delete(destroy.url({ project: project.slug }), {
            preserveScroll: true,
            onSuccess: () => {
                if (editingProject?.id === project.id) {
                    startCreate();
                }
            },
        });
    };

    return (
        <>
            <Head title="Admin Projects" />

            <div className="min-h-screen bg-[#f7f8f5] px-4 py-5 text-[#101511] sm:px-6 lg:px-8 dark:bg-[#070908] dark:text-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-6">
                    <div className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-white/86 px-4 py-3 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between dark:border-white/10 dark:bg-[#101211]/86">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[#101511] text-white dark:bg-[#a7e33d] dark:text-black">
                                <PanelsTopLeft className="size-5" aria-hidden />
                            </span>
                            <div>
                                <p className="text-sm font-semibold">
                                    Solvara Admin
                                </p>
                                <p className="text-xs text-black/48 dark:text-white/48">
                                    Portfolio web, mobile, dan network.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Link
                                href={home()}
                                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold text-black/68 transition hover:border-black/20 hover:text-black dark:border-white/10 dark:bg-white/5 dark:text-white/68 dark:hover:text-white"
                            >
                                <Globe2 className="size-4" aria-hidden />
                                Lihat website
                            </Link>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.post(logout.url())}
                                className="h-10 rounded-xl"
                            >
                                <LogOut className="size-4" aria-hidden />
                                Logout
                            </Button>
                        </div>
                    </div>

                    <section className="overflow-hidden rounded-[28px] border border-black/10 bg-[#0b1110] text-white shadow-[0_28px_90px_-58px_rgba(11,17,16,0.8)] dark:border-white/10">
                        <div className="grid gap-px bg-white/10 lg:grid-cols-[1.05fr_0.95fr]">
                            <div className="relative overflow-hidden bg-[#0b1110] p-6 sm:p-8">
                                <div
                                    aria-hidden
                                    className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35"
                                />
                                <div className="relative">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-[#a7e33d] uppercase">
                                        <Layers3 className="size-3.5" />
                                        Admin console
                                    </div>
                                    <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                                        <div>
                                            <h1 className="max-w-xl text-[34px] leading-[1.05] font-semibold tracking-tight sm:text-[48px]">
                                                Project Console.
                                            </h1>
                                            <p className="mt-4 max-w-xl text-sm leading-6 text-white/55">
                                                Kontrol portfolio web, mobile,
                                                dan network dengan media,
                                                status, urutan, dan highlight
                                                publish.
                                            </p>
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={startCreate}
                                            className="h-11 rounded-xl bg-[#a7e33d] px-5 font-semibold text-black hover:bg-[#b6ee4d]"
                                        >
                                            <Plus className="size-4" />
                                            Tambah project
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4 lg:grid-cols-2">
                                <MetricCard
                                    label="Total"
                                    value={metrics.total}
                                    caption={`${activeTypeCount} sesuai filter`}
                                />
                                <MetricCard
                                    label="Publish"
                                    value={metrics.published}
                                    caption={`${publishedRatio}% live`}
                                />
                                <MetricCard
                                    label="Draft"
                                    value={metrics.draft}
                                    caption="Perlu review"
                                />
                                <MetricCard
                                    label="Featured"
                                    value={metrics.featured}
                                    caption={
                                        latestProject?.name ?? 'Belum ada data'
                                    }
                                />
                            </div>
                        </div>
                    </section>

                    <div className="grid gap-3 md:grid-cols-3">
                        {Object.entries(projectTypes).map(([value, label]) => {
                            const type = value as Project['type'];
                            const isActive = activeType === type;

                            return (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setActiveType(type)}
                                    className={cn(
                                        'group flex items-center justify-between rounded-2xl border p-4 text-left shadow-sm transition',
                                        isActive
                                            ? 'border-[#a7e33d] bg-[#effbd7] dark:bg-[#a7e33d]/12'
                                            : 'border-black/10 bg-white hover:border-black/20 dark:border-white/10 dark:bg-[#101211]',
                                    )}
                                >
                                    <div>
                                        <div className="text-sm font-semibold">
                                            {label}
                                        </div>
                                        <div className="mt-1 text-xs text-black/45 dark:text-white/45">
                                            {metrics[type]} project
                                        </div>
                                    </div>
                                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-black text-white transition group-hover:bg-[#a7e33d] group-hover:text-black dark:bg-white/10">
                                        <SlidersHorizontal
                                            className="size-4"
                                            aria-hidden
                                        />
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_440px]">
                        <section className="rounded-[28px] border border-black/10 bg-white p-4 shadow-sm sm:p-5 dark:border-white/10 dark:bg-[#101211]">
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                                    <div>
                                        <div className="text-[11px] font-semibold tracking-[0.18em] text-[#6ea314] uppercase">
                                            Library project
                                        </div>
                                        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                                            {filteredProjects.length} item
                                            tampil
                                        </h2>
                                    </div>

                                    <label className="relative block min-w-0 md:w-80">
                                        <span className="sr-only">
                                            Cari project
                                        </span>
                                        <Search
                                            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-black/36 dark:text-white/36"
                                            aria-hidden
                                        />
                                        <Input
                                            value={query}
                                            onChange={(event) =>
                                                setQuery(event.target.value)
                                            }
                                            className="h-11 rounded-xl pl-9"
                                            placeholder="Cari project"
                                        />
                                    </label>
                                </div>

                                <div className="flex flex-wrap gap-2 border-y border-black/10 py-3 dark:border-white/10">
                                    <TypeFilterButton
                                        active={activeType === 'all'}
                                        onClick={() => setActiveType('all')}
                                    >
                                        All
                                    </TypeFilterButton>
                                    {Object.entries(projectTypes).map(
                                        ([value, label]) => (
                                            <TypeFilterButton
                                                key={value}
                                                active={activeType === value}
                                                onClick={() =>
                                                    setActiveType(
                                                        value as Project['type'],
                                                    )
                                                }
                                            >
                                                {label}
                                            </TypeFilterButton>
                                        ),
                                    )}
                                </div>
                            </div>

                            <div className="mt-5 grid gap-4">
                                {filteredProjects.map((project) => (
                                    <ProjectRow
                                        key={project.id}
                                        project={project}
                                        isEditing={
                                            editingProject?.id === project.id
                                        }
                                        onEdit={() => startEdit(project)}
                                        onDelete={() => deleteProject(project)}
                                    />
                                ))}

                                {filteredProjects.length === 0 && (
                                    <div className="rounded-2xl border border-dashed border-black/15 px-6 py-14 text-center dark:border-white/15">
                                        <p className="font-semibold">
                                            Belum ada project yang cocok.
                                        </p>
                                        <p className="mt-2 text-sm text-black/50 dark:text-white/50">
                                            Coba ubah filter atau tambah project
                                            baru.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>

                        <aside className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-sm xl:sticky xl:top-6 xl:self-start dark:border-white/10 dark:bg-[#101211]">
                            <div className="border-b border-black/10 bg-[#f8faf2] p-5 sm:p-6 dark:border-white/10 dark:bg-white/[0.03]">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-[11px] font-semibold tracking-[0.18em] text-[#6ea314] uppercase">
                                            {editingProject
                                                ? 'Edit project'
                                                : 'Tambah project'}
                                        </p>
                                        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                                            {editingProject
                                                ? editingProject.name
                                                : 'Project baru'}
                                        </h2>
                                        <p className="mt-2 text-sm text-black/45 dark:text-white/45">
                                            Field ringkas untuk publish
                                            portfolio.
                                        </p>
                                    </div>
                                    {editingProject && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={startCreate}
                                        >
                                            Reset
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <form
                                onSubmit={submit}
                                className="grid gap-5 p-5 sm:p-6"
                                encType="multipart/form-data"
                            >
                                <Field
                                    label="Nama project"
                                    error={form.errors.name}
                                >
                                    <Input
                                        value={form.data.name}
                                        onChange={(event) =>
                                            form.setData(
                                                'name',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Contoh: Office Network Upgrade"
                                    />
                                </Field>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field
                                        label="Kategori"
                                        error={form.errors.type}
                                    >
                                        <select
                                            value={form.data.type}
                                            onChange={(event) =>
                                                form.setData(
                                                    'type',
                                                    event.target
                                                        .value as Project['type'],
                                                )
                                            }
                                            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                        >
                                            {Object.entries(projectTypes).map(
                                                ([value, label]) => (
                                                    <option
                                                        key={value}
                                                        value={value}
                                                    >
                                                        {label}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                    </Field>
                                    <Field
                                        label="Urutan"
                                        error={form.errors.order}
                                    >
                                        <Input
                                            type="number"
                                            min={0}
                                            value={form.data.order}
                                            onChange={(event) =>
                                                form.setData(
                                                    'order',
                                                    Number(event.target.value),
                                                )
                                            }
                                        />
                                    </Field>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field
                                        label="Sub kategori"
                                        error={form.errors.category}
                                    >
                                        <Input
                                            value={form.data.category}
                                            onChange={(event) =>
                                                form.setData(
                                                    'category',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Web App, Mobile UX, LAN"
                                        />
                                    </Field>
                                    <Field
                                        label="Client"
                                        error={form.errors.client_name}
                                    >
                                        <Input
                                            value={form.data.client_name}
                                            onChange={(event) =>
                                                form.setData(
                                                    'client_name',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Nama brand/client"
                                        />
                                    </Field>
                                </div>

                                <Field label="Slug" error={form.errors.slug}>
                                    <Input
                                        value={form.data.slug}
                                        onChange={(event) =>
                                            form.setData(
                                                'slug',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Kosongkan untuk otomatis"
                                    />
                                </Field>

                                <Field
                                    label="Ringkasan"
                                    error={form.errors.summary}
                                >
                                    <textarea
                                        value={form.data.summary}
                                        onChange={(event) =>
                                            form.setData(
                                                'summary',
                                                event.target.value,
                                            )
                                        }
                                        rows={3}
                                        className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                        placeholder="Satu kalimat tentang output project."
                                    />
                                </Field>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field
                                        label="Masalah"
                                        error={form.errors.challenge}
                                    >
                                        <textarea
                                            value={form.data.challenge}
                                            onChange={(event) =>
                                                form.setData(
                                                    'challenge',
                                                    event.target.value,
                                                )
                                            }
                                            rows={4}
                                            className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                            placeholder="Masalah utama sebelum project."
                                        />
                                    </Field>
                                    <Field
                                        label="Hasil"
                                        error={form.errors.result}
                                    >
                                        <textarea
                                            value={form.data.result}
                                            onChange={(event) =>
                                                form.setData(
                                                    'result',
                                                    event.target.value,
                                                )
                                            }
                                            rows={4}
                                            className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                            placeholder="Output setelah selesai."
                                        />
                                    </Field>
                                </div>

                                <Field
                                    label="Tech / tools"
                                    error={form.errors.stack_text}
                                >
                                    <Input
                                        value={form.data.stack_text}
                                        onChange={(event) =>
                                            form.setData(
                                                'stack_text',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Laravel, React, MikroTik"
                                    />
                                </Field>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field
                                        label="Live URL"
                                        error={form.errors.live_url}
                                    >
                                        <Input
                                            type="url"
                                            value={form.data.live_url}
                                            onChange={(event) =>
                                                form.setData(
                                                    'live_url',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="https://..."
                                        />
                                    </Field>
                                    <Field
                                        label="Video URL"
                                        error={form.errors.video_url}
                                    >
                                        <Input
                                            type="url"
                                            value={form.data.video_url}
                                            onChange={(event) =>
                                                form.setData(
                                                    'video_url',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="https://..."
                                        />
                                    </Field>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <UploadField
                                        label="Cover image"
                                        icon={ImageIcon}
                                        accept="image/*"
                                        currentUrl={
                                            editingProject?.cover_image_url
                                        }
                                        fileName={form.data.cover_image?.name}
                                        removeLabel="Hapus gambar"
                                        removeChecked={
                                            form.data.remove_cover_image
                                        }
                                        onRemoveChange={(checked) =>
                                            form.setData(
                                                'remove_cover_image',
                                                checked,
                                            )
                                        }
                                        onChange={(file) =>
                                            form.setData('cover_image', file)
                                        }
                                        error={form.errors.cover_image}
                                    />
                                    <UploadField
                                        label="Video file"
                                        icon={Film}
                                        accept="video/mp4,video/quicktime,video/webm"
                                        currentUrl={
                                            editingProject?.video_file_url
                                        }
                                        fileName={form.data.video_file?.name}
                                        removeLabel="Hapus video"
                                        removeChecked={
                                            form.data.remove_video_file
                                        }
                                        onRemoveChange={(checked) =>
                                            form.setData(
                                                'remove_video_file',
                                                checked,
                                            )
                                        }
                                        onChange={(file) =>
                                            form.setData('video_file', file)
                                        }
                                        error={form.errors.video_file}
                                    />
                                </div>

                                <div className="grid gap-3 rounded-2xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
                                    <label className="flex items-center gap-3 text-sm font-medium">
                                        <input
                                            type="checkbox"
                                            checked={form.data.is_published}
                                            onChange={(event) =>
                                                form.setData(
                                                    'is_published',
                                                    event.target.checked,
                                                )
                                            }
                                            className="size-4 rounded border-black/20"
                                        />
                                        Publish di website
                                    </label>
                                    <label className="flex items-center gap-3 text-sm font-medium">
                                        <input
                                            type="checkbox"
                                            checked={form.data.is_featured}
                                            onChange={(event) =>
                                                form.setData(
                                                    'is_featured',
                                                    event.target.checked,
                                                )
                                            }
                                            className="size-4 rounded border-black/20"
                                        />
                                        Tampilkan sebagai featured
                                    </label>
                                </div>

                                {form.progress && (
                                    <div className="overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                                        <div
                                            className="h-2 rounded-full bg-[#a7e33d]"
                                            style={{
                                                width: `${form.progress.percentage}%`,
                                            }}
                                        />
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                    className="h-11 rounded-xl bg-[#101511] text-white hover:bg-[#202920] dark:bg-[#a7e33d] dark:text-black dark:hover:bg-[#b6ee4d]"
                                >
                                    {form.processing ? (
                                        <Loader2 className="size-4 animate-spin" />
                                    ) : (
                                        <CheckCircle2 className="size-4" />
                                    )}
                                    {editingProject
                                        ? 'Update project'
                                        : 'Simpan project'}
                                </Button>
                            </form>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}

function MetricCard({
    label,
    value,
    caption,
}: {
    label: string;
    value: number;
    caption: string;
}) {
    return (
        <div className="bg-[#0b1110] p-5">
            <div className="text-xs font-medium text-white/45">{label}</div>
            <div className="mt-2 text-3xl font-semibold tracking-tight text-white">
                {value}
            </div>
            <div className="mt-2 truncate text-xs text-white/36">{caption}</div>
        </div>
    );
}

function TypeFilterButton({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'rounded-full border px-4 py-2 text-sm font-semibold transition',
                active
                    ? 'border-[#a7e33d] bg-[#a7e33d] text-black'
                    : 'border-black/10 bg-white text-black/58 hover:border-black/20 hover:text-black dark:border-white/10 dark:bg-white/5 dark:text-white/58 dark:hover:text-white',
            )}
        >
            {children}
        </button>
    );
}

function ProjectRow({
    project,
    isEditing,
    onEdit,
    onDelete,
}: {
    project: Project;
    isEditing: boolean;
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <article
            className={cn(
                'grid gap-4 rounded-2xl border p-3 transition md:grid-cols-[132px_minmax(0,1fr)_auto] md:p-4',
                isEditing
                    ? 'border-[#a7e33d] bg-[#f8ffe9] dark:bg-[#a7e33d]/8'
                    : 'border-black/10 bg-white hover:border-black/20 dark:border-white/10 dark:bg-white/[0.03]',
            )}
        >
            <div className="relative h-32 overflow-hidden rounded-xl bg-black/6 md:h-full dark:bg-white/6">
                {project.cover_image_url ? (
                    <img
                        src={project.cover_image_url}
                        alt={`Cover ${project.name}`}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-black/30 dark:text-white/30">
                        <ImageIcon className="size-8" aria-hidden />
                    </div>
                )}
                {(project.video_file_url || project.video_url) && (
                    <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                        <Film className="size-3" />
                        Video
                    </span>
                )}
            </div>

            <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                    <span
                        className={cn(
                            'rounded-full border px-2.5 py-1 text-[11px] font-semibold',
                            typeTone[project.type],
                        )}
                    >
                        {project.type_label}
                    </span>
                    {project.is_featured && (
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
                            Featured
                        </span>
                    )}
                    <span
                        className={cn(
                            'rounded-full px-2.5 py-1 text-[11px] font-semibold',
                            project.is_published
                                ? 'bg-[#a7e33d]/18 text-[#5f8f12]'
                                : 'bg-black/8 text-black/45 dark:bg-white/10 dark:text-white/45',
                        )}
                    >
                        {project.is_published ? 'Publish' : 'Draft'}
                    </span>
                </div>
                <h3 className="mt-3 truncate text-xl font-semibold tracking-tight">
                    {project.name}
                </h3>
                <p className="mt-1 text-sm text-black/50 dark:text-white/48">
                    {project.client_name ?? 'No client'} · {project.category}
                </p>
                {project.summary && (
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/58 dark:text-white/56">
                        {project.summary}
                    </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.slice(0, 5).map((item) => (
                        <span
                            key={item}
                            className="rounded-full border border-black/10 px-2.5 py-1 text-[11px] text-black/50 dark:border-white/10 dark:text-white/48"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2 md:flex-col md:items-end">
                {project.live_url && (
                    <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex size-10 items-center justify-center rounded-full border border-black/10 text-black/55 transition hover:bg-black hover:text-white dark:border-white/10 dark:text-white/55 dark:hover:bg-white dark:hover:text-black"
                        aria-label={`Open ${project.name}`}
                    >
                        <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                )}
                <button
                    type="button"
                    onClick={onEdit}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-black/10 text-black/55 transition hover:bg-[#a7e33d] hover:text-black dark:border-white/10 dark:text-white/55"
                    aria-label={`Edit ${project.name}`}
                >
                    <Pencil className="size-4" aria-hidden />
                </button>
                <button
                    type="button"
                    onClick={onDelete}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-red-200 text-red-500 transition hover:bg-red-500 hover:text-white dark:border-red-400/20"
                    aria-label={`Delete ${project.name}`}
                >
                    <Trash2 className="size-4" aria-hidden />
                </button>
            </div>
        </article>
    );
}

function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: ReactNode;
}) {
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            {children}
            <InputError message={error} />
        </div>
    );
}

function UploadField({
    label,
    icon: Icon,
    accept,
    currentUrl,
    fileName,
    removeLabel,
    removeChecked,
    onRemoveChange,
    onChange,
    error,
}: {
    label: string;
    icon: LucideIcon;
    accept: string;
    currentUrl?: string | null;
    fileName?: string;
    removeLabel: string;
    removeChecked: boolean;
    onRemoveChange: (checked: boolean) => void;
    onChange: (file: File | null) => void;
    error?: string;
}) {
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <label className="group flex min-h-34 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-black/15 bg-black/[0.02] px-4 py-5 text-center transition hover:border-[#a7e33d] dark:border-white/15 dark:bg-white/[0.03]">
                <input
                    type="file"
                    accept={accept}
                    className="sr-only"
                    onChange={(event) =>
                        onChange(event.target.files?.[0] ?? null)
                    }
                />
                <span className="flex size-11 items-center justify-center rounded-full bg-[#a7e33d] text-black">
                    <Icon className="size-5" aria-hidden />
                </span>
                <span className="text-sm font-semibold">
                    {fileName ?? 'Upload file'}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-black/42 dark:text-white/42">
                    <UploadCloud className="size-3.5" aria-hidden />
                    Klik untuk pilih file
                </span>
            </label>
            {currentUrl && (
                <label className="flex items-center gap-2 text-xs text-black/52 dark:text-white/52">
                    <input
                        type="checkbox"
                        checked={removeChecked}
                        onChange={(event) =>
                            onRemoveChange(event.target.checked)
                        }
                        className="size-3.5 rounded border-black/20"
                    />
                    {removeLabel}
                </label>
            )}
            <InputError message={error} />
        </div>
    );
}

AdminProjectsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Admin',
            href: adminProjectsIndex(),
        },
        {
            title: 'Projects',
            href: adminProjectsIndex(),
        },
    ],
};

import {
    BookOpenCheck,
    GitBranch,
    Layers,
    MessageSquare,
    NotebookText,
    ScrollText,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type WhyValue = {
    title: string;
    description: string;
    icon: LucideIcon;
};

export const whyValues: WhyValue[] = [
    {
        title: 'Scope tertulis sejak awal',
        description:
            'Setiap pekerjaan dimulai dari ruang lingkup, prioritas, dan batasan yang disepakati.',
        icon: ScrollText,
    },
    {
        title: 'Preview bertahap',
        description:
            'Progress bisa dilihat lewat staging preview, bukan hanya menunggu hasil akhir.',
        icon: GitBranch,
    },
    {
        title: 'Komponen reusable',
        description:
            'UI dibuat konsisten agar halaman baru lebih mudah dikembangkan.',
        icon: Layers,
    },
    {
        title: 'Documentation & handover',
        description:
            'Admin, endpoint, struktur konten, dan cara deploy dijelaskan dengan ringkas.',
        icon: NotebookText,
    },
    {
        title: 'Performance-aware build',
        description:
            'Asset, route, query, dan layout diperhatikan agar pengalaman pengguna tetap ringan.',
        icon: BookOpenCheck,
    },
    {
        title: 'Komunikasi rapi',
        description:
            'Update dibuat jelas, revisi dicatat, dan keputusan project tidak tercecer.',
        icon: MessageSquare,
    },
];

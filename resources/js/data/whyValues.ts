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
        title: 'Konsultasi gratis',
        description:
            'Kebutuhan awal dibaca dulu agar solusi tidak kebesaran atau kurang tepat.',
        icon: ScrollText,
    },
    {
        title: 'Tenaga berpengalaman',
        description:
            'Web, mobile, network, server, dan security dikerjakan dengan pendekatan teknis yang jelas.',
        icon: GitBranch,
    },
    {
        title: 'Solusi sesuai kebutuhan',
        description:
            'Scope disusun dari kondisi bisnis, jumlah user, device, data, dan target operasional.',
        icon: Layers,
    },
    {
        title: 'Support setelah instalasi',
        description:
            'Setelah setup, ada catatan handover dan support awal untuk memastikan sistem berjalan.',
        icon: NotebookText,
    },
    {
        title: 'Siap untuk UMKM hingga corporate',
        description:
            'Pekerjaan bisa dimulai dari WiFi toko sampai network skala enterprise dan ISP.',
        icon: BookOpenCheck,
    },
    {
        title: 'Quality checklist',
        description:
            'Performa, keamanan dasar, responsive view, backup, dan dokumentasi dicek sebelum handover.',
        icon: MessageSquare,
    },
];

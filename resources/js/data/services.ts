import {
    Activity,
    LayoutDashboard,
    Megaphone,
    Server,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';

export type Service = {
    id: string;
    title: string;
    description: string;
    icon: typeof Sparkles;
};

export const services: Service[] = [
    {
        id: 'company-profile',
        title: 'Website company profile',
        description:
            'Untuk bisnis yang butuh profil profesional, struktur jelas, dan mudah dikembangkan.',
        icon: Sparkles,
    },
    {
        id: 'landing-campaign',
        title: 'Landing page campaign',
        description:
            'Untuk promosi produk, event, ads campaign, dan validasi penawaran baru.',
        icon: Megaphone,
    },
    {
        id: 'web-application',
        title: 'Web application',
        description:
            'Untuk workflow digital, portal pelanggan, booking, katalog, atau tools operasional.',
        icon: Activity,
    },
    {
        id: 'dashboard',
        title: 'Dashboard / admin panel',
        description:
            'Untuk mengelola data, transaksi, konten, laporan, dan aktivitas internal.',
        icon: LayoutDashboard,
    },
    {
        id: 'api-backend',
        title: 'API & backend system',
        description:
            'Untuk fondasi data, autentikasi, integrasi, storage, dan proses bisnis.',
        icon: Server,
    },
    {
        id: 'maintenance',
        title: 'Maintenance & optimization',
        description:
            'Untuk menjaga performa, keamanan, bug fixing, improvement, dan update berkala.',
        icon: ShieldCheck,
    },
];

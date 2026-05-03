import {
    Activity,
    Cctv,
    CloudCog,
    RadioTower,
    Router,
    ShieldCheck,
    Sparkles,
    Smartphone,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Service = {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    badge: string;
    points: string[];
};

export const services: Service[] = [
    {
        id: 'web-platform',
        title: 'Website & Web App',
        description:
            'Company profile, landing page, dashboard, dan aplikasi web yang siap dipakai bisnis.',
        icon: Sparkles,
        badge: 'Web',
        points: ['Landing page', 'Dashboard admin', 'Web application'],
    },
    {
        id: 'mobile-experience',
        title: 'Mobile Experience',
        description:
            'Alur mobile, responsive UX, dan interface aplikasi yang nyaman untuk layar kecil.',
        icon: Smartphone,
        badge: 'Mobile',
        points: ['Mobile UI flow', 'Responsive system', 'App-ready design'],
    },
    {
        id: 'business-network',
        title: 'Business Network Solutions',
        description:
            'Setup WiFi, LAN, dan bandwidth agar operasional kantor, cafe, atau toko lebih stabil.',
        icon: Router,
        badge: 'Network',
        points: ['WiFi cafe & kantor', 'LAN & kabel', 'Optimasi bandwidth'],
    },
    {
        id: 'server-cloud',
        title: 'Server & Cloud Solutions',
        description:
            'Setup server, deploy aplikasi, database, backup, dan hardening awal.',
        icon: CloudCog,
        badge: 'Server',
        points: [
            'VPS / cloud / on-premise',
            'App & database deploy',
            'Backup data',
        ],
    },
    {
        id: 'cctv-security',
        title: 'CCTV & Security System',
        description:
            'Instalasi CCTV, DVR/NVR, monitoring via HP, dan integrasi jaringan.',
        icon: Cctv,
        badge: 'Security',
        points: ['Instalasi kamera', 'Monitoring via HP', 'Storage rekaman'],
    },
    {
        id: 'isp-advanced-network',
        title: 'ISP & Advanced Network',
        description:
            'Infrastruktur skala besar untuk enterprise dan ISP: routing, traffic, dan NOC.',
        icon: RadioTower,
        badge: 'ISP',
        points: ['Fiber / wireless', 'BGP & OSPF', 'Monitoring NOC'],
    },
    {
        id: 'maintenance-quality',
        title: 'Maintenance & Optimization',
        description:
            'Perawatan performa, keamanan, improvement, dan support setelah instalasi.',
        icon: ShieldCheck,
        badge: 'Support',
        points: [
            'Performance check',
            'Security review',
            'After-install support',
        ],
    },
    {
        id: 'api-integration',
        title: 'API & Integration',
        description:
            'Fondasi data, autentikasi, integrasi WhatsApp/payment, dan proses bisnis.',
        icon: Activity,
        badge: 'Backend',
        points: ['REST API', 'Auth & role', 'External integration'],
    },
];

export type TechGroup = {
    label: string;
    items: string[];
};

export const techGroups: TechGroup[] = [
    {
        label: 'Web Frontend',
        items: [
            'React',
            'TypeScript',
            'Vite',
            'Tailwind CSS',
            'Radix UI',
            'Next.js',
            'React Hook Form',
            'Zod',
            'Framer Motion',
        ],
    },
    {
        label: 'Laravel Backend',
        items: [
            'Laravel',
            'PHP',
            'Inertia.js',
            'Fortify',
            'Wayfinder',
            'Eloquent ORM',
            'Queue',
            'REST API',
        ],
    },
    {
        label: 'Mobile',
        items: [
            'React Native',
            'Flutter',
            'Expo',
            'Android SDK',
            'iOS',
            'Firebase',
            'Push Notification',
            'PWA',
        ],
    },
    {
        label: 'Network',
        items: [
            'MikroTik RouterOS',
            'Ubiquiti UniFi',
            'TP-Link Omada',
            'VLAN',
            'QoS',
            'Captive Portal',
            'OSPF',
            'BGP',
            'SNMP',
        ],
    },
    {
        label: 'Server & Cloud',
        items: [
            'Linux',
            'Nginx',
            'PHP-FPM',
            'Docker',
            'Redis',
            'Supervisor',
            'SSL/TLS',
            'VPS',
        ],
    },
    {
        label: 'Data & Dashboard',
        items: [
            'MySQL',
            'PostgreSQL',
            'Redis',
            'Eloquent',
            'Recharts',
            'TanStack Query',
            'CSV Export',
            'Backup',
        ],
    },
    {
        label: 'CCTV & Security',
        items: [
            'ONVIF',
            'RTSP',
            'IP Camera',
            'NVR / DVR',
            'PoE Switch',
            'VPN',
            'Firewall',
            'Access Control',
        ],
    },
    {
        label: 'Testing & QA',
        items: [
            'Pest 4',
            'PHPUnit 12',
            'Vitest',
            'Playwright',
            'Cypress',
            'Testing Library',
            'ESLint',
            'PHP Pint',
        ],
    },
    {
        label: 'DevOps & Integrations',
        items: [
            'GitHub Actions',
            'Certbot SSL',
            'Laravel Scheduler',
            'S3 Storage',
            'WhatsApp Cloud API',
            'Google Maps API',
            'Midtrans',
            'Stripe',
            'SMTP',
            'OpenAPI',
        ],
    },
];

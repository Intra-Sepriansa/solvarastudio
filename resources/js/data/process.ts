export type ProcessStep = {
    number: string;
    title: string;
    description: string;
};

export const processSteps: ProcessStep[] = [
    {
        number: '01',
        title: 'Discovery',
        description:
            'Kita mulai dari kebutuhan, target pengguna, prioritas bisnis, dan batasan teknis.',
    },
    {
        number: '02',
        title: 'Struktur & UX',
        description:
            'Alur halaman, sitemap, user flow, dan konten dirapikan sebelum visual dibuat.',
    },
    {
        number: '03',
        title: 'UI Design',
        description:
            'Tampilan dibuat bersih, konsisten, responsive, dan sesuai karakter brand.',
    },
    {
        number: '04',
        title: 'Development',
        description:
            'Frontend dan backend dibangun bertahap dengan preview yang bisa dicek.',
    },
    {
        number: '05',
        title: 'QA & Launch',
        description:
            'Form, responsive layout, performa, akses admin, dan edge case diuji sebelum rilis.',
    },
    {
        number: '06',
        title: 'Support',
        description:
            'Handover, dokumentasi ringan, dan support awal disiapkan agar tim bisa lanjut.',
    },
];

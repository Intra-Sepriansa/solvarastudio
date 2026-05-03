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
        title: 'Audit & Desain',
        description:
            'Alur halaman, kebutuhan device, denah jaringan, server, atau CCTV dirapikan sebelum eksekusi.',
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
            'Frontend, backend, server, jaringan, dan integrasi dibangun bertahap dengan checkpoint yang bisa dicek.',
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
            'Handover, dokumentasi ringan, dan support awal disiapkan agar operasional bisa lanjut.',
    },
];

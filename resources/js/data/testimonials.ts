export type Testimonial = {
    name: string;
    role: string;
    project: string;
    quote: string;
};

export const testimonials: Testimonial[] = [
    {
        name: 'Aditya Pranata',
        role: 'Product Review, ciper',
        project: 'ciper',
        quote: 'Fondasinya enak untuk mulai project baru. Auth, settings, dan layout dashboard sudah rapi, jadi pengembangan bisa langsung fokus ke domain aplikasinya.',
    },
    {
        name: 'Nabila Azzahra',
        role: 'Learning Flow Review, LinguaPath',
        project: 'LinguaPath',
        quote: 'Alur belajarnya terasa jelas. Study path, latihan, simulasi exam, dan vocabulary review punya tempat masing-masing tanpa membuat pengguna bingung.',
    },
    {
        name: 'Raka Wibowo',
        role: 'Admin Workflow Review, LinguaPath',
        project: 'LinguaPath',
        quote: 'Bagian admin cukup matang untuk mengelola question, reading passage, audio asset, dan review konten. Workflow-nya tidak terasa seperti tempelan.',
    },
    {
        name: 'Satria Mahendra',
        role: 'Assessment Logic Review, MajorMind',
        project: 'MajorMind',
        quote: 'MajorMind tidak berhenti di quiz jurusan biasa. Ada scoring, constraint, comparison, dan insight yang membuat hasil rekomendasi lebih bisa dijelaskan.',
    },
    {
        name: 'Farhan Nugraha',
        role: 'Decision Dashboard Review, MajorMind',
        project: 'MajorMind',
        quote: 'Scenario Lab dan comparison page membantu melihat perubahan bobot dan dampaknya. Visualisasinya kuat, tapi tetap punya konteks keputusan.',
    },
    {
        name: 'Dini Kartika',
        role: 'Portal Content Review, SMANTEN',
        project: 'SMANTEN',
        quote: 'Struktur portal sekolahnya lengkap. Public site, berita, layanan, dokumen, guru, alumni, dan PPDB terasa berada dalam satu sistem yang konsisten.',
    },
    {
        name: 'Bagus Prakoso',
        role: 'Internal Dashboard Review, SMANTEN',
        project: 'SMANTEN',
        quote: 'Role dashboard untuk admin, guru, siswa, dan wali membuat platform ini terasa operasional. Data sekolah tidak hanya tampil, tapi bisa dikelola.',
    },
    {
        name: 'Maya Lestari',
        role: 'QA & Handover Review, Solvara Studio',
        project: 'Cross Project',
        quote: 'Yang paling terasa adalah detail teknisnya dicatat. Dari route, asset, form, responsive layout, sampai testing flow, semuanya punya alasan yang jelas.',
    },
];

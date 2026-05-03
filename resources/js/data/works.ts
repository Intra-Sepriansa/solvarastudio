export type Work = {
    number: string;
    slug: string;
    name: string;
    category: string;
    liveUrl: string;
    image: string;
    video?: string;
    summary: string;
    challenge: string;
    result: string;
    stack: string[];
    techStack: string[];
    features: string[];
    animation: string[];
    highlights: string[];
    suitableFor: string;
    accent: 'mint' | 'mist' | 'soft' | 'gold';
};

export const works: Work[] = [
    {
        number: '01',
        slug: 'ciper',
        name: 'ciper',
        category: 'Laravel + React Application Starter',
        liveUrl: 'https://ciper.sepriansatech.com',
        image: '/project/ciper-showcase.png',
        video: '/project/ciper.mp4',
        summary:
            'Starter Laravel + React untuk fondasi aplikasi yang butuh auth, dashboard, settings, dan struktur UI awal sebelum masuk ke domain bisnis khusus.',
        challenge:
            'Project ini berfungsi sebagai fondasi aplikasi. Fokusnya bukan domain bisnis tertentu, tetapi menyiapkan struktur awal yang rapi agar SaaS, sistem admin, atau dashboard internal bisa mulai dibangun lebih cepat.',
        result: 'Auth flow, dashboard dasar, settings, dan UI starter sudah siap sebagai base yang bisa dikembangkan menjadi produk operasional.',
        stack: ['Laravel 13', 'React 19', 'TypeScript', 'Tailwind v4'],
        techStack: [
            'Laravel 13',
            'PHP 8.5 via Herd',
            'Inertia Laravel v3',
            'React 19',
            'TypeScript',
            'Tailwind CSS v4',
            'Laravel Fortify',
            'Laravel Wayfinder',
            'Radix UI',
            'Headless UI',
            'Lucide React',
            'Vite 8',
            'Pest 4',
            'PHP Pint',
            'Laravel Boost',
        ],
        features: [
            'Landing page Laravel starter',
            'Login, register, forgot password, reset password, verify email, confirm password, dan 2FA challenge',
            'Dashboard dasar dengan placeholder layout',
            'Settings untuk profile, security, password, dan appearance',
            'Fondasi untuk SaaS, dashboard internal, atau sistem admin',
        ],
        animation: [
            'Tailwind transition untuk state dasar',
            'Radix animation state untuk dialog, sheet, dan dropdown',
            'tw-animate-css, skeleton loading, dan spinner',
            'Belum memakai Framer Motion, GSAP, atau 3D scene khusus',
        ],
        highlights: [
            'Starter siap dikembangkan',
            'Auth lengkap',
            'UI system dasar',
            'Wayfinder-ready',
        ],
        suitableFor:
            'Cocok sebagai boilerplate saat bisnis butuh mempercepat fase awal aplikasi tanpa membangun auth dan layout dari nol.',
        accent: 'mint',
    },
    {
        number: '02',
        slug: 'linguapath',
        name: 'LinguaPath',
        category: 'EdTech TOEFL ITP Learning Platform',
        liveUrl: 'https://lp.sepriansatech.com',
        image: '/project/linguapath.png',
        video: '/project/linguapath.mp4',
        summary:
            'Aplikasi EdTech full-stack untuk belajar bahasa Inggris, latihan TOEFL ITP-style, SRS vocabulary, mistake journal, dan analytics belajar.',
        challenge:
            'Platform belajar bahasa membutuhkan alur belajar bertahap, latihan yang tersimpan, evaluasi progress, dan admin panel untuk mengelola konten pembelajaran.',
        result: 'LinguaPath berkembang menjadi produk EdTech matang dengan study path, practice mode, exam simulation, vocabulary SRS, mistake journal, writing/speaking practice, analytics, dan admin panel.',
        stack: ['Laravel 13', 'Inertia v3', 'React 19', 'Framer Motion'],
        techStack: [
            'Laravel 13',
            'Inertia.js v3',
            'React 19',
            'TypeScript',
            'Tailwind CSS v4',
            'Laravel Fortify',
            'Laravel Wayfinder',
            'Pest 4',
            'Recharts',
            'Framer Motion',
            'GSAP',
            'OGL',
            'React Hook Form',
            'Zod',
            'Zustand',
            'TanStack Table',
            'Vite 8',
        ],
        features: [
            '60-day study path untuk belajar bertahap',
            'Lesson page dengan section pembelajaran dan mini-test',
            'Practice mode dengan setup, sesi latihan, answer tracking, dan result',
            'Exam simulation TOEFL ITP-style dengan section, timer, server-saved answer, dan result page',
            'Vocabulary SRS, flashcard, quiz, dan status tracking',
            'Mistake journal untuk jawaban salah, review status, dan penjelasan',
            'Speaking dan writing practice dengan feedback heuristik',
            'Analytics dashboard untuk progress, intensitas latihan, dan performa skill',
            'Admin panel untuk questions, reading passages, audio assets, review audio, bulk review, dan import listening audio',
        ],
        animation: [
            'Framer Motion untuk study path, analytics, vocabulary, lesson, practice, dan mistakes',
            'Progress bar animation, fade-up section, staggered content, card entrance, tab indicator, dan flip card vocabulary',
            'Visual grainient, gradient text, magic bento, shape grid, spotlight card, magnet, dan count-up',
            'Recharts membuat dashboard terasa data-driven, bukan halaman statis',
        ],
        highlights: [
            'EdTech full-stack',
            'Exam simulation',
            'Vocabulary SRS',
            'Admin content workflow',
        ],
        suitableFor:
            'Cocok untuk platform pembelajaran yang membutuhkan materi, latihan, progress tracking, dan panel admin yang kuat.',
        accent: 'mist',
    },
    {
        number: '03',
        slug: 'majormind',
        name: 'MajorMind',
        category: 'Decision Support System for Major Recommendation',
        liveUrl: 'https://majormind.sepriansatech.com',
        image: '/project/majormind.png',
        video: '/project/majormind.mp4',
        summary:
            'Sistem rekomendasi jurusan berbasis multi-algoritma untuk membantu siswa memilih jurusan dengan assessment, ranking, scenario lab, dan explainability.',
        challenge:
            'Rekomendasi jurusan tidak cukup hanya berupa quiz sederhana. Sistem perlu membaca profil siswa, psikometri, constraint, bobot kriteria, dan memberi hasil yang bisa dijelaskan.',
        result: 'MajorMind menggabungkan RIASEC, Grit Scale, adaptive logic test, AHP, TOPSIS, SAW, profile matching, scenario lab, comparison, insights, dan export PDF.',
        stack: ['Laravel 13', 'React 19', 'Three.js', 'Recharts'],
        techStack: [
            'Laravel 13',
            'Inertia Laravel v2',
            'React 19',
            'TypeScript',
            'Tailwind CSS v4',
            'Laravel Fortify',
            'Laravel Wayfinder',
            'Firebase Auth',
            'Kreait Firebase PHP',
            'DomPDF',
            'Framer Motion',
            'Three.js',
            'Recharts',
            'jsPDF',
            'Vite 8',
            'Pest 4',
        ],
        features: [
            'Landing page modern untuk sistem rekomendasi jurusan',
            'Assessment engine untuk input profil siswa',
            'RIASEC assessment 48 item dan Grit Scale',
            'Adaptive Logic Test berbasis IRT/CAT',
            'AHP untuk bobot kriteria dan consistency ratio',
            'TOPSIS, SAW, profile matching, dan RIASEC affinity untuk final scoring',
            'Hard constraint filtering untuk jurusan tertentu',
            'Dashboard hasil asesmen',
            'Scenario Lab dengan sensitivity analysis, comparison, Monte Carlo, dan save scenario',
            'Comparison page dengan matrix, spider chart, Pareto, algorithm breakdown, dan decision scoring',
            'Insights page dan export PDF untuk dashboard, comparison, dan insight',
            'Firebase Google login',
        ],
        animation: [
            'Three.js custom canvas untuk neural-brain-3d, paradigm-shift-3d, core-reactor-3d, neural-network-3d, laser-flow, dan header 3D',
            'Framer Motion untuk page transition, scroll progress, entrance animation, dan micro-interaction',
            'SVG animate untuk radar dan network visual',
            'UI futuristik dengan dark interface, glow effect, matrix-like visualization, radar/spider chart, dan explainability dashboard',
        ],
        highlights: [
            'Multi-algorithm scoring',
            'Scenario Lab',
            'Explainability dashboard',
            'PDF export',
        ],
        suitableFor:
            'Cocok untuk produk assessment, rekomendasi, dan dashboard keputusan yang membutuhkan logika scoring yang bisa diaudit.',
        accent: 'gold',
    },
    {
        number: '04',
        slug: 'smanten',
        name: 'SMANTEN',
        category: 'School Portal, CMS & Role-Based Platform',
        liveUrl: 'https://smanten.sepriansatech.com',
        image: '/project/smanten.png',
        video: '/project/smanten.mp4',
        summary:
            'Portal sekolah lengkap untuk SMAN 1 Tenjo dengan public site, CMS, dashboard internal, PPDB, alumni, jadwal, dan role-based access.',
        challenge:
            'Portal sekolah membutuhkan public site yang informatif, CMS yang mudah dikelola, dashboard internal multi-role, PPDB, data alumni, jadwal, media, dan layanan sekolah.',
        result: 'SMANTEN berkembang menjadi platform digital sekolah yang menggabungkan website publik, admin CMS, dashboard guru/siswa/wali, PPDB, alumni, virtual tour, map, dan internal API.',
        stack: ['Laravel 13', 'Inertia v3', 'React Three Fiber', 'React Query'],
        techStack: [
            'Laravel 13',
            'Inertia.js v3',
            'React 19',
            'TypeScript',
            'Tailwind CSS v4',
            'Laravel Fortify',
            'Laravel Sanctum',
            'Laravel Wayfinder',
            'Pest 4',
            'Framer Motion',
            'GSAP',
            'Three.js',
            'React Three Fiber',
            'Drei',
            'OGL',
            'Leaflet',
            'React Leaflet',
            'Recharts',
            'TanStack React Query',
            'Zustand',
            'Vite 8',
        ],
        features: [
            'Public site: home, profil sekolah, akademik, kesiswaan, PPDB, media, berita, layanan, dokumen, organisasi, guru, ekstrakurikuler, alumni, alumni story, virtual tour, dan sitemap XML',
            'Dashboard admin, guru, siswa, dan wali',
            'Admin PPDB dan detail aplikasi',
            'Manajemen artikel, organisasi, portfolio, guru, siswa, jadwal, dan website portal',
            'Internal API untuk rooms, timetable, roles, media assets, organization assignments, CSV export, dan moderation',
        ],
        animation: [
            'Framer Motion luas untuk hero animation, scroll transform, staggered cards, dan page entrance',
            'HeroScene 3D, virtual tour panorama viewer, circular gallery, animated counter, border glow, global command palette, dan interactive organization chart',
            'Leaflet untuk lokasi, alumni, geocode, dan PPDB distance map',
            'Recharts untuk dashboard internal dan statistik',
        ],
        highlights: [
            'Portal institusi kompleks',
            'Role-based dashboard',
            'PPDB workflow',
            'Virtual tour dan map',
        ],
        suitableFor:
            'Cocok untuk institusi pendidikan atau organisasi yang membutuhkan public site, CMS, dashboard internal, dan data operasional dalam satu platform.',
        accent: 'soft',
    },
];

export const findWorkBySlug = (slug: string): Work | undefined =>
    works.find((work) => work.slug === slug);

export const workSlugs = works.map((work) => work.slug);

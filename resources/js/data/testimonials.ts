export type Testimonial = {
    name: string;
    role: string;
    quote: string;
};

export const testimonials: Testimonial[] = [
    {
        name: 'Rania Putri',
        role: 'Founder, Kirana Dental',
        quote: 'Yang paling membantu adalah prosesnya rapi. Dari awal sudah jelas halaman apa saja yang dibuat, jadi revisinya tidak melebar ke mana-mana.',
    },
    {
        name: 'Daniel Arta',
        role: 'Operations Lead, Orbit Retail',
        quote: 'Dashboard-nya langsung bisa dipakai tim. Ada beberapa penyesuaian kecil, tapi komunikasinya cepat dan jelas.',
    },
    {
        name: 'Mirza Halim',
        role: 'Partner, Nusa Legal',
        quote: 'Desainnya terasa profesional tanpa terlalu ramai. Konten layanan kami juga dibantu dirapikan supaya lebih mudah dipahami calon klien.',
    },
];

export type FAQ = {
    question: string;
    answer: string;
};

export const faqs: FAQ[] = [
    {
        question: 'Berapa lama proses pembuatan website?',
        answer: 'Tergantung scope. Landing page sederhana biasanya bisa dimulai dari 1–2 minggu, sedangkan web app atau dashboard membutuhkan estimasi setelah discovery.',
    },
    {
        question: 'Apakah bisa mulai dari desain saja?',
        answer: 'Bisa. Project dapat dimulai dari UX/UI design, development saja, atau full dari strategi konten sampai launch.',
    },
    {
        question: 'Apakah bisa dibuatkan admin panel?',
        answer: 'Bisa. Admin panel dapat disiapkan untuk mengelola konten, data, user, transaksi, inquiry, atau resource lain sesuai kebutuhan.',
    },
    {
        question: 'Apakah bisa integrasi WhatsApp, payment, atau API lain?',
        answer: 'Bisa. Integrasi akan dicek dari dokumentasi layanan terkait dan dimasukkan ke scope teknis.',
    },
    {
        question: 'Apakah ada support setelah launch?',
        answer: 'Ada support awal setelah launch. Untuk kebutuhan jangka panjang, maintenance bisa dibuat terpisah.',
    },
    {
        question: 'Apakah saya harus sudah punya konten?',
        answer: 'Tidak harus lengkap. Konten bisa dirapikan bersama berdasarkan struktur halaman, prioritas informasi, dan tujuan bisnis.',
    },
];

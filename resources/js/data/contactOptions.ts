export const projectTypes = [
    'Company profile',
    'Landing page',
    'Web application',
    'Mobile app / mobile UX',
    'Setup jaringan kantor / bisnis',
    'Server & cloud',
    'CCTV & security system',
    'ISP / advanced network',
    'Dashboard / admin panel',
    'Backend / API',
    'Maintenance',
    'Belum yakin',
] as const;

export const budgetRanges = [
    '< Rp5 juta',
    'Rp5–10 juta',
    'Rp10–25 juta',
    'Rp25–50 juta',
    '> Rp50 juta',
    'Ingin diskusi dulu',
] as const;

export const deadlineRanges = [
    'Secepatnya',
    '2–4 minggu',
    '1–2 bulan',
    '3 bulan+',
    'Fleksibel',
] as const;

export type ProjectType = (typeof projectTypes)[number];
export type BudgetRange = (typeof budgetRanges)[number];
export type DeadlineRange = (typeof deadlineRanges)[number];

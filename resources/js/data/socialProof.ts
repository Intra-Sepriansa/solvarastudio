export type Metric = {
    value: string;
    label: string;
};

export const metrics: Metric[] = [
    { value: '30–60 menit', label: 'Discovery awal' },
    { value: '1–2 minggu', label: 'Sprint delivery' },
    { value: '7 hari', label: 'Post-launch support' },
    { value: '90+', label: 'Performance target' },
];

export type TechGroup = {
    label: string;
    items: string[];
};

export const techGroups: TechGroup[] = [
    {
        label: 'Backend',
        items: [
            'Laravel REST API',
            'MySQL',
            'Laravel Sanctum',
            'Redis (queue/cache/session)',
            'Laravel Storage local / S3',
            'Form Request Validation',
            'API Resource',
            'Policy / Gate',
            'Service Layer',
        ],
    },
    {
        label: 'Frontend',
        items: [
            'React',
            'Vite',
            'TypeScript',
            'Tailwind CSS',
            'Framer Motion',
            'React Router',
            'TanStack Query',
            'Zustand',
            'React Hook Form + Zod',
        ],
    },
    {
        label: 'Testing',
        items: ['Pest / PHPUnit', 'Vitest', 'Playwright'],
    },
    {
        label: 'Quality',
        items: [
            'ESLint',
            'Prettier',
            'PHP Pint',
            'OpenAPI / Scribe',
            'CI/CD GitHub Actions',
        ],
    },
];

/**
 * JSON-LD schema for Solvara Studio (Organization + Service).
 * Rendered in the welcome page <Head> tag.
 */
export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Solvara Studio',
    url: 'https://solvarastudio.com',
    logo: 'https://solvarastudio.com/og-image.png',
    description:
        'Studio digital untuk pembuatan website, web application, dashboard, sistem internal, API, dan landing page.',
    sameAs: [
        'https://instagram.com/solvarastudio',
        'https://linkedin.com',
        'https://github.com',
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@solvarastudio.com',
        contactType: 'customer support',
        areaServed: 'ID',
        availableLanguage: ['id-ID', 'en'],
    },
};

export const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Pembuatan website & aplikasi web',
    provider: {
        '@type': 'Organization',
        name: 'Solvara Studio',
    },
    areaServed: 'Indonesia',
    serviceType: [
        'Website company profile',
        'Landing page campaign',
        'Web application',
        'Dashboard / admin panel',
        'API & backend system',
        'Maintenance & optimization',
    ],
    description:
        'Solvara Studio merancang dan membangun produk digital untuk brand, UMKM, dan tim operasional yang butuh tampilan elegan tanpa mengorbankan fungsi.',
};

export const faqSchemaFromList = (
    items: { question: string; answer: string }[],
) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
        },
    })),
});

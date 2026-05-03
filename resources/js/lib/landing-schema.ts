/**
 * JSON-LD schema for Solvara Studio (Organization + Service).
 * Rendered in the welcome page <Head> tag.
 */
export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Solvara Studio',
    url: 'https://solvarastudio.com',
    logo: 'https://solvarastudio.com/logo-192.webp',
    description:
        'Studio digital untuk pembuatan website, web application, dashboard, sistem internal, API, mobile experience, jaringan bisnis, server, cloud, CCTV, dan infrastruktur ISP.',
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
    name: 'Solusi web, mobile, network, server, dan aplikasi',
    provider: {
        '@type': 'Organization',
        name: 'Solvara Studio',
    },
    areaServed: 'Indonesia',
    serviceType: [
        'Website & web application',
        'Mobile experience',
        'Business network solutions',
        'Server & cloud solutions',
        'CCTV & security system',
        'ISP & advanced network',
        'Dashboard / admin panel',
        'API & backend system',
        'Maintenance & optimization',
    ],
    description:
        'Solvara Studio merancang produk digital dan infrastruktur IT untuk bisnis yang butuh website, aplikasi, jaringan, server, keamanan, dan support yang rapi.',
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

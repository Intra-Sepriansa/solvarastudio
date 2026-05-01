import { Head } from '@inertiajs/react';
import { Footer } from '@/components/landing/layout/footer';
import { Navbar } from '@/components/landing/layout/navbar';
import { Contact } from '@/components/landing/sections/contact';
import { FAQ } from '@/components/landing/sections/faq';
import { Hero } from '@/components/landing/sections/hero';
import { Process } from '@/components/landing/sections/process';
import { SelectedWork } from '@/components/landing/sections/selected-work';
import { Services } from '@/components/landing/sections/services';
import { SocialProof } from '@/components/landing/sections/social-proof';
import { TechQuality } from '@/components/landing/sections/tech-quality';
import { Testimonials } from '@/components/landing/sections/testimonials';
import { WhySolvara } from '@/components/landing/sections/why-solvara';
import { faqs } from '@/data/faqs';
import {
    faqSchemaFromList,
    organizationSchema,
    serviceSchema,
} from '@/lib/landing-schema';

const META = {
    title: 'Solvara Studio — Studio digital untuk website, aplikasi, dan sistem bisnis',
    description:
        'Solvara Studio merancang dan membangun website, aplikasi web, dashboard, dan sistem internal yang rapi, cepat, dan siap dipakai bisnis.',
    url: 'https://solvarastudio.com/',
    image: '/og-image.png',
};

export default function Welcome() {
    return (
        <>
            <Head title={META.title}>
                <meta name="description" content={META.description} />
                <link rel="canonical" href={META.url} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={META.url} />
                <meta property="og:title" content={META.title} />
                <meta property="og:description" content={META.description} />
                <meta property="og:image" content={META.image} />
                <meta property="og:locale" content="id_ID" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={META.title} />
                <meta name="twitter:description" content={META.description} />
                <meta name="twitter:image" content={META.image} />

                <meta name="theme-color" content="#FFFFFF" />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(organizationSchema),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(serviceSchema),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqSchemaFromList(faqs)),
                    }}
                />
            </Head>

            {/* Skip link for accessibility */}
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-[13px] focus:text-ink focus:shadow-md focus:ring-2 focus:ring-[var(--color-teal)]"
            >
                Lewati ke konten utama
            </a>

            <div className="min-h-screen bg-white text-ink antialiased">
                <Navbar />
                <main id="main">
                    <Hero />
                    <SocialProof />
                    <Services />
                    <Process />
                    <SelectedWork />
                    <WhySolvara />
                    <TechQuality />
                    <Testimonials />
                    <FAQ />
                    <Contact />
                </main>
                <Footer />
            </div>
        </>
    );
}

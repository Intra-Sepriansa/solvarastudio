import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowDownRight,
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    BarChart3,
    Building2,
    Cable,
    Camera,
    Cctv,
    Check,
    ChevronDown,
    ClipboardCheck,
    CloudCog,
    Clock,
    Code2,
    DatabaseBackup,
    Gauge,
    GitBranch,
    Github,
    Globe2,
    HardDrive,
    Instagram,
    LayoutDashboard,
    LifeBuoy,
    Linkedin,
    Loader2,
    Mail,
    Menu,
    MessageCircle,
    Minus,
    MonitorCheck,
    Moon,
    Network,
    Plus,
    RadioTower,
    Router,
    ServerCog,
    Sparkles,
    Smartphone,
    Sun,
    Wifi,
    Workflow,
    X,
} from 'lucide-react';
import {
    AnimatePresence,
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from 'motion/react';
import type { MotionValue } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LanguageToggle from '@/components/language-toggle';
import LogoLoop from '@/components/LogoLoop';
import type { LogoItem } from '@/components/LogoLoop';
import {
    budgetRanges,
    deadlineRanges,
    projectTypes,
} from '@/data/contactOptions';
import { faqs } from '@/data/faqs';
import { processSteps } from '@/data/process';
import { services } from '@/data/services';
import { techGroups } from '@/data/techStack';
import { testimonials } from '@/data/testimonials';
import { whyValues } from '@/data/whyValues';
import { works } from '@/data/works';
import type { Work } from '@/data/works';
import { useAppearance } from '@/hooks/use-appearance';
import {
    faqSchemaFromList,
    organizationSchema,
    serviceSchema,
} from '@/lib/landing-schema';
import { useTranslator } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { login } from '@/routes';
import { store as contactStore } from '@/routes/api/contact';
import { index as projectsIndex, show as projectShow } from '@/routes/projects';

const META = {
    title: 'Solvara Studio — Web, Mobile, Network & Server untuk Bisnis',
    description:
        'Solvara Studio membantu setup website, mobile experience, WiFi bisnis, server, cloud, CCTV, dan jaringan skala corporate atau ISP.',
    url: 'https://solvarastudio.com/',
    image: '/og-image.png',
};

const WHATSAPP_URL =
    'https://wa.me/6281298523453?text=Halo%20Intra%20Sepriansa%2C%20saya%20ingin%20konsultasi%20project%20di%20Solvara%20Studio.';
const BRAND_LOGO_SRC = '/logo.png';

const navItems = [
    { href: '#work', label: 'Karya', hasDropdown: false },
    { href: '#services', label: 'Layanan', hasDropdown: true },
    { href: '#solutions', label: 'Solusi', hasDropdown: false },
    { href: '#process', label: 'Proses', hasDropdown: false },
    { href: '#contact', label: 'Kontak', hasDropdown: false },
] as const;

const miniMetrics = [
    { label: 'Network', value: '20+' },
    { label: 'Server', value: '24/7' },
    { label: 'QA', value: '90+' },
] as const;

const processIcons = [
    MessageCircle,
    GitBranch,
    LayoutDashboard,
    Code2,
    ClipboardCheck,
    LifeBuoy,
] as const;

type TeamMember = {
    name: string;
    role: string;
    initials: string;
    photo: string | null;
    photoPosition: string;
    badge: string;
    statement: string;
    focus: string;
    impact: [string, string][];
    accent: string;
};

const teamMembers: TeamMember[] = [
    {
        name: 'INTRA SEPRIANSA',
        role: 'Web Developer',
        initials: 'IS',
        photo: '/team/intra.jpeg',
        photoPosition: 'center',
        badge: 'Web Platform',
        statement:
            'Menangani arah teknis web, interface landing, dashboard, backend flow, integrasi, dan kualitas pengalaman pengguna di browser.',
        focus: 'Frontend, backend, routing, landing experience, dashboard, deployment readiness.',
        impact: [
            ['Ownership', 'Website & dashboard'],
            ['Focus', 'UI, API, build flow'],
            ['Output', 'Web siap bisnis'],
        ],
        accent: '#a7e33d',
    },
    {
        name: 'MUHAMAD HARIRI FADILAH',
        role: 'Network Engineering',
        initials: 'MA',
        photo: '/team/fadil.png',
        photoPosition: 'center',
        badge: 'Network Layer',
        statement:
            'Merapikan sisi konektivitas, infrastruktur jaringan, akses layanan, dan fondasi operasional agar sistem lebih stabil saat dipakai.',
        focus: 'Network planning, connectivity, service access, environment readiness, reliability check.',
        impact: [
            ['Ownership', 'Network setup'],
            ['Focus', 'Stabilitas akses'],
            ['Output', 'Operasional rapi'],
        ],
        accent: '#a7e33d',
    },
    {
        name: 'SALSA NABILA',
        role: 'Mobile Programming',
        initials: 'SN',
        photo: '/team/salsa.png',
        photoPosition: 'center',
        badge: 'Mobile Flow',
        statement:
            'Mengawal kebutuhan mobile, pola interaksi layar kecil, alur aplikasi, dan konsistensi experience lintas device.',
        focus: 'Mobile interface, app flow, responsive behavior, interaction detail, device usability.',
        impact: [
            ['Ownership', 'Mobile experience'],
            ['Focus', 'App flow & UX'],
            ['Output', 'Lintas device'],
        ],
        accent: '#a7e33d',
    },
];

const webTeamCodeLines = [
    "import { Head, Link } from '@inertiajs/react';",
    "import { motion } from 'motion/react';",
    "import { contactStore } from '@/routes/api/contact';",
    "import { projectsIndex, projectShow } from '@/routes/projects';",
    '',
    "type SolvaraService = 'web' | 'mobile' | 'network' | 'server';",
    '',
    'const solvaraLanding = {',
    "  brand: 'Solvara Studio',",
    "  headline: 'Solusi IT, Network & Server untuk Bisnis Anda',",
    "  stack: ['Laravel', 'Inertia', 'React', 'Tailwind'],",
    '  routes: [projectsIndex.url(), contactStore.form().action],',
    '};',
    '',
    'const webPlatform = {',
    "  category: 'web' satisfies SolvaraService,",
    "  scope: ['landing-page', 'admin-panel', 'project-crud'],",
    "  quality: ['responsive-ui', 'seo-ready', 'fast-build'],",
    "  support: ['brief', 'deploy', 'handover'],",
    '};',
    '',
    'function buildProjectCard(project: Project) {',
    '  return {',
    '    title: project.name,',
    '    href: projectShow(project.slug).url,',
    "    media: project.cover_image ?? '/og-image.png',",
    '    badge: project.category.toUpperCase(),',
    '    isFeatured: project.is_featured,',
    '  };',
    '}',
    '',
    'async function submitConsultation(form: ContactForm) {',
    '  const payload = {',
    '    name: form.name.trim(),',
    '    service: form.service ?? webPlatform.category,',
    '    message: form.message,',
    "    source: 'team-web-background',",
    '  };',
    '',
    '  return contactStore.form().submit(payload);',
    '}',
    '',
    'const launchChecklist = [',
    "  'copywriting-clear',",
    "  'mobile-layout-pass',",
    "  'admin-auth-ready',",
    "  'project-media-upload-ready',",
    "  'production-build-pass',",
    '];',
    '',
    'export function SolvaraWebExperience() {',
    '  return (',
    '    <LandingShell brand={solvaraLanding.brand}>',
    '      <Hero headline={solvaraLanding.headline} />',
    '      <ServiceGrid services={webPlatform.scope} />',
    '      <ProjectShowcase route={projectsIndex.url()} />',
    '      <ContactForm action={contactStore.form().action} />',
    '    </LandingShell>',
    '  );',
    '}',
    '',
    'const adminProjectForm = {',
    "  fields: ['name', 'category', 'image', 'video_url'],",
    "  categories: ['web', 'mobile', 'network'],",
    "  storage: 'public/projects',",
    "  preview: 'cover-image-first',",
    '};',
    '',
    'const serviceCards = solvaraLanding.stack.map((tool) => ({',
    '  tool,',
    "  status: launchChecklist.includes('production-build-pass'),",
    "  tone: tool === 'Laravel' ? 'backend' : 'interface',",
    '}));',
    '',
    'function normalizeProject(project: AdminProjectInput) {',
    '  return {',
    '    name: project.name.trim(),',
    '    slug: project.name.toLowerCase().replaceAll(" ", "-"),',
    '    category: project.category,',
    '    image: project.image,',
    '    videoUrl: project.video_url || null,',
    '    published: Boolean(project.published_at),',
    '  };',
    '}',
    '',
    'const dashboardModules = [',
    "  { key: 'overview', label: 'Project Overview' },",
    "  { key: 'projects', label: 'CRUD Project' },",
    "  { key: 'media', label: 'Image & Video' },",
    "  { key: 'security', label: 'Admin Access' },",
    '];',
    '',
    'function getProjectRoute(project: Project) {',
    '  if (project.category === "network") {',
    '    return `${projectShow(project.slug).url}?scope=network`;',
    '  }',
    '',
    '  return projectShow(project.slug).url;',
    '}',
    '',
    'const contactFlow = {',
    "  entry: 'hero-cta',",
    "  channel: 'whatsapp-or-form',",
    "  validation: ['name', 'service', 'message'],",
    "  response: 'brief-ready',",
    '};',
    '',
    'function resolvePrimaryCta(service: SolvaraService) {',
    '  const label = service === "web" ? "Diskusi Website" : "Konsultasi IT";',
    '',
    '  return {',
    '    label,',
    '    href: contactStore.form().action,',
    '    intent: `${service}-consultation`,',
    '  };',
    '}',
    '',
    'const performanceBudget = {',
    '  image: "lazy",',
    '  motion: "reduced-motion-aware",',
    '  bundle: "split-by-page",',
    '  font: "self-hosted",',
    '};',
    '',
    'const solvaraQualityGate = [',
    "  'npm run build',",
    "  'php artisan test --compact',",
    "  'php artisan wayfinder:generate --with-form',",
    "  'responsive-check:mobile-desktop',",
    '];',
    '',
    'function publishLandingPage() {',
    '  return {',
    '    route: "/",',
    '    page: "welcome.tsx",',
    '    meta: solvaraLanding.headline,',
    '    checks: solvaraQualityGate,',
    '    ready: launchChecklist.every(Boolean),',
    '  };',
    '}',
] as const;

const networkTeamCodeLines = [
    "import { ping, scanSubnet, watchTraffic } from '@/network/monitoring';",
    "import { createBandwidthPolicy } from '@/network/bandwidth';",
    "import { notifyNoc } from '@/network/noc-alerts';",
    '',
    "type DeviceRole = 'router' | 'switch' | 'access-point' | 'client';",
    "type LinkMode = 'fiber' | 'wireless' | 'ethernet';",
    '',
    'const solvaraNetworkScope = {',
    "  brand: 'Solvara Studio',",
    "  service: 'Business Network Solutions',",
    "  target: ['stable', 'secure', 'scalable'],",
    "  sites: ['office', 'cafe', 'retail-store'],",
    '};',
    '',
    'const topology = {',
    "  router: { name: 'gateway-main', role: 'router' as DeviceRole },",
    "  switches: ['core-switch', 'floor-switch-01'],",
    "  accessPoints: ['ap-lobby', 'ap-office', 'ap-meeting-room'],",
    "  uplink: { mode: 'fiber' as LinkMode, backup: 'wireless' as LinkMode },",
    '};',
    '',
    'const bandwidthProfile = createBandwidthPolicy({',
    '  guestLimitMbps: 12,',
    '  staffLimitMbps: 35,',
    '  priority: ["pos-system", "meeting-call", "admin-dashboard"],',
    '  block: ["torrent", "unknown-heavy-traffic"],',
    '});',
    '',
    'async function auditNetwork(site: BusinessSite) {',
    '  const devices = await scanSubnet(site.subnet);',
    '  const gateway = await ping(site.gateway);',
    '  const accessPointHealth = devices.filter((device) => {',
    "    return device.role === 'access-point' && device.signal >= -67;",
    '  });',
    '',
    '  return {',
    '    site: site.name,',
    '    gatewayOnline: gateway.ok,',
    '    totalDevices: devices.length,',
    '    healthyAccessPoints: accessPointHealth.length,',
    '    recommendedPolicy: bandwidthProfile,',
    '  };',
    '}',
    '',
    'const cablePlan = [',
    "  { from: 'router', to: 'core-switch', cable: 'cat6' },",
    "  { from: 'core-switch', to: 'ap-lobby', cable: 'cat6-poe' },",
    "  { from: 'core-switch', to: 'ap-office', cable: 'cat6-poe' },",
    "  { from: 'floor-switch-01', to: 'cctv-nvr', cable: 'cat6' },",
    '];',
    '',
    'function calculateCoverage(area: CoverageArea) {',
    '  const apCount = Math.ceil(area.squareMeters / 95);',
    '  const channelPlan = ["1", "6", "11"].slice(0, apCount);',
    '',
    '  return {',
    '    apCount,',
    '    channelPlan,',
    '    mesh: area.hasThickWall,',
    '    roaming: apCount > 1,',
    '  };',
    '}',
    '',
    'async function monitorTraffic(site: BusinessSite) {',
    '  const stream = watchTraffic(site.gateway, { interval: 5000 });',
    '',
    '  for await (const sample of stream) {',
    '    if (sample.latencyMs > 120 || sample.packetLoss > 2) {',
    '      await notifyNoc({',
    "        level: 'warning',",
    "        message: 'Network quality dropped',",
    '        site: site.name,',
    '        latency: sample.latencyMs,',
    '        packetLoss: sample.packetLoss,',
    '      });',
    '    }',
    '  }',
    '}',
    '',
    'const handoverChecklist = [',
    "  'router-config-backup',",
    "  'wifi-ssid-documented',",
    "  'lan-port-map-ready',",
    "  'bandwidth-policy-active',",
    "  'monitoring-dashboard-online',",
    '];',
    '',
    'export async function prepareNetworkDeployment(site: BusinessSite) {',
    '  const audit = await auditNetwork(site);',
    '  const coverage = calculateCoverage(site.coverage);',
    '',
    '  return {',
    '    scope: solvaraNetworkScope.service,',
    '    topology,',
    '    audit,',
    '    coverage,',
    '    cablePlan,',
    '    handoverChecklist,',
    '  };',
    '}',
] as const;

const mobileTeamCodeLines = [
    "import { useMemo, useState } from 'react';",
    "import { Pressable, ScrollView, View } from 'react-native';",
    "import { submitConsultation } from '@/mobile/api/consultation';",
    "import { useDeviceProfile } from '@/mobile/hooks/use-device-profile';",
    '',
    "type MobileService = 'web' | 'mobile' | 'network' | 'server';",
    "type ScreenKey = 'home' | 'services' | 'project' | 'contact';",
    '',
    'const solvaraMobileApp = {',
    "  name: 'Solvara Studio Mobile',",
    "  stack: ['React Native', 'TypeScript', 'Laravel API'],",
    "  theme: { accent: '#a7e33d', surface: '#101511' },",
    "  screens: ['home', 'services', 'project', 'contact'] as ScreenKey[],",
    '};',
    '',
    'const mobileNavigation = [',
    "  { key: 'home', label: 'Beranda', priority: 1 },",
    "  { key: 'services', label: 'Layanan', priority: 2 },",
    "  { key: 'project', label: 'Project', priority: 3 },",
    "  { key: 'contact', label: 'Konsultasi', priority: 4 },",
    '];',
    '',
    'function getServiceCopy(service: MobileService) {',
    '  const copy = {',
    "    web: 'Landing, dashboard, dan inquiry flow.',",
    "    mobile: 'App flow, responsive UX, dan screen system.',",
    "    network: 'WiFi, LAN, monitoring, dan bandwidth.',",
    "    server: 'Deploy, database, backup, dan hardening.',",
    '  };',
    '',
    '  return copy[service];',
    '}',
    '',
    'function useSolvaraMobileLayout() {',
    '  const device = useDeviceProfile();',
    '',
    '  return useMemo(() => {',
    '    return {',
    '      columns: device.width >= 768 ? 2 : 1,',
    '      bottomNav: device.width < 768,',
    '      heroHeight: device.width < 390 ? 420 : 520,',
    '      cardRadius: 18,',
    '    };',
    '  }, [device.width]);',
    '}',
    '',
    'function mapProjectCard(project: Project) {',
    '  return {',
    '    id: project.id,',
    '    title: project.name,',
    '    category: project.category,',
    '    image: project.cover_image,',
    '    video: project.video_url,',
    '    serviceCopy: getServiceCopy(project.category),',
    '  };',
    '}',
    '',
    'async function sendMobileInquiry(form: MobileInquiryForm) {',
    '  const payload = {',
    '    name: form.name.trim(),',
    '    service: form.service,',
    '    device: form.deviceLabel,',
    '    source: "mobile-app-flow",',
    '    message: form.message,',
    '  };',
    '',
    '  return submitConsultation(payload);',
    '}',
    '',
    'export function SolvaraMobileHome({ projects }: MobileHomeProps) {',
    '  const layout = useSolvaraMobileLayout();',
    "  const [activeService, setActiveService] = useState<MobileService>('web');",
    '',
    '  const cards = projects.map(mapProjectCard);',
    '',
    '  return (',
    '    <ScrollView showsVerticalScrollIndicator={false}>',
    '      <HeroCard height={layout.heroHeight} />',
    '      <ServiceTabs',
    '        value={activeService}',
    '        onChange={setActiveService}',
    '        items={mobileNavigation}',
    '      />',
    '      <ProjectGrid columns={layout.columns} projects={cards} />',
    '      <Pressable onPress={() => sendMobileInquiry({',
    "        name: 'Client Solvara',",
    '        service: activeService,',
    "        deviceLabel: 'mobile-preview',",
    "        message: 'Saya ingin konsultasi project mobile-ready.',",
    '      })}>',
    '        <ConsultationButton label="Konsultasi Mobile" />',
    '      </Pressable>',
    '    </ScrollView>',
    '  );',
    '}',
    '',
    'const mobileQualityGate = [',
    "  'touch-target-min-44px',",
    "  'text-readable-small-screen',",
    "  'image-does-not-cover-copy',",
    "  'form-submit-state-ready',",
    "  'android-ios-layout-check',",
    '];',
] as const;

type WorkspaceMetric = {
    label: string;
    value: string;
    change: string;
    caption: string;
};

type WorkspaceStep = {
    label: string;
    detail: string;
};

type WorkspaceView = {
    id: string;
    label: string;
    eyebrow: string;
    title: string;
    tag: string;
    status: string;
    description: string;
    metrics: WorkspaceMetric[];
    steps: WorkspaceStep[];
    checklist: string[];
};

type WorkspaceMenuGroup = {
    label: string;
    items: WorkspaceView[];
};

const workspaceMenuGroups: WorkspaceMenuGroup[] = [
    {
        label: 'Project',
        items: [
            {
                id: 'overview',
                label: 'Overview',
                eyebrow: 'Project control',
                title: 'Project readiness',
                tag: 'Landing + dashboard',
                status: 'Ready to scope',
                description:
                    'Ringkasan awal untuk melihat tujuan bisnis, halaman inti, prioritas fitur, dan risiko launch sebelum project masuk sprint.',
                metrics: [
                    {
                        label: 'Goals',
                        value: '04',
                        change: 'clear',
                        caption: 'Target bisnis sudah dipetakan',
                    },
                    {
                        label: 'Core pages',
                        value: '07',
                        change: 'mapped',
                        caption: 'Halaman utama siap disusun',
                    },
                    {
                        label: 'Risk notes',
                        value: '03',
                        change: 'watched',
                        caption: 'Integrasi dan konten diperhatikan',
                    },
                    {
                        label: 'Launch fit',
                        value: '92%',
                        change: 'good',
                        caption: 'Cukup realistis untuk sprint awal',
                    },
                ],
                steps: [
                    { label: 'Brief', detail: 'Tujuan bisnis' },
                    { label: 'Content map', detail: 'Struktur halaman' },
                    { label: 'Priority', detail: 'Fitur inti' },
                    { label: 'Launch note', detail: 'Risiko rilis' },
                ],
                checklist: [
                    'Tujuan project ditulis dalam bahasa bisnis.',
                    'Halaman utama dibatasi agar sprint tetap realistis.',
                    'Area yang belum pasti dicatat sebagai decision log.',
                ],
            },
            {
                id: 'scope',
                label: 'Scope',
                eyebrow: 'Scope lock',
                title: 'Ruang lingkup yang bisa dieksekusi',
                tag: 'Scope document',
                status: 'Locked draft',
                description:
                    'Scope dibuat jelas sejak awal: apa yang dibangun, apa yang ditunda, data apa yang dibutuhkan, dan bagaimana revisi dikendalikan.',
                metrics: [
                    {
                        label: 'Scope items',
                        value: '18',
                        change: 'locked',
                        caption: 'Item kerja utama sudah dibatasi',
                    },
                    {
                        label: 'Revisions',
                        value: '02',
                        change: 'rounds',
                        caption: 'Putaran revisi dibuat terukur',
                    },
                    {
                        label: 'Out of scope',
                        value: '05',
                        change: 'noted',
                        caption: 'Request tambahan tidak tercecer',
                    },
                    {
                        label: 'Owner',
                        value: '01',
                        change: 'PIC',
                        caption: 'Keputusan punya penanggung jawab',
                    },
                ],
                steps: [
                    { label: 'Need', detail: 'Kebutuhan utama' },
                    { label: 'Boundary', detail: 'Batas pekerjaan' },
                    { label: 'Estimate', detail: 'Waktu dan prioritas' },
                    { label: 'Sign-off', detail: 'Approval scope' },
                ],
                checklist: [
                    'Setiap fitur punya alasan dan prioritas.',
                    'Revisi dibedakan dari tambahan scope baru.',
                    'Timeline tidak dibuat lebih agresif dari kapasitas realistis.',
                ],
            },
            {
                id: 'ux-flow',
                label: 'UX flow',
                eyebrow: 'Experience map',
                title: 'Alur pengguna sebelum visual',
                tag: 'User journey',
                status: 'Flow mapped',
                description:
                    'Sebelum UI dipoles, alur pengguna, struktur informasi, CTA, dan empty state dirapikan agar halaman terasa mudah dipakai.',
                metrics: [
                    {
                        label: 'Flows',
                        value: '05',
                        change: 'mapped',
                        caption: 'Alur penting sudah divisualkan',
                    },
                    {
                        label: 'CTA path',
                        value: '03',
                        change: 'clean',
                        caption:
                            'Jalur konversi tidak bercabang terlalu banyak',
                    },
                    {
                        label: 'States',
                        value: '12',
                        change: 'covered',
                        caption: 'Loading, empty, error, dan success state',
                    },
                    {
                        label: 'Mobile',
                        value: '100%',
                        change: 'first',
                        caption: 'Flow dicek dari layar kecil dulu',
                    },
                ],
                steps: [
                    { label: 'Sitemap', detail: 'Urutan halaman' },
                    { label: 'Wireflow', detail: 'Arah interaksi' },
                    { label: 'States', detail: 'Kondisi UI' },
                    { label: 'Copy', detail: 'Teks aksi' },
                ],
                checklist: [
                    'CTA utama terlihat jelas tanpa perlu banyak instruksi.',
                    'Form dan dashboard punya state yang bisa dipahami.',
                    'Konten dipotong agar halaman tidak terasa berat.',
                ],
            },
            {
                id: 'development',
                label: 'Development',
                eyebrow: 'Build board',
                title: 'Development bertahap dengan preview',
                tag: 'Staging preview',
                status: 'Staging ready',
                description:
                    'Frontend, backend, form, dashboard, dan integrasi dibangun bertahap. Progress bisa dicek lewat staging, bukan menunggu hasil akhir.',
                metrics: [
                    {
                        label: 'Build tasks',
                        value: '24',
                        change: 'active',
                        caption: 'Task dibagi agar mudah dicek',
                    },
                    {
                        label: 'API routes',
                        value: '11',
                        change: 'ready',
                        caption: 'Endpoint inti punya validation',
                    },
                    {
                        label: 'Preview',
                        value: '03',
                        change: 'links',
                        caption: 'Staging tersedia per milestone',
                    },
                    {
                        label: 'QA checks',
                        value: '42',
                        change: 'passing',
                        caption: 'Dicek sebelum launch',
                    },
                ],
                steps: [
                    { label: 'UI system', detail: 'Komponen dasar' },
                    { label: 'Frontend', detail: 'Page dan state' },
                    { label: 'Backend', detail: 'API dan auth' },
                    { label: 'Staging', detail: 'Preview client' },
                ],
                checklist: [
                    'Preview dibagikan per milestone yang bisa dites.',
                    'Form, route, dan API punya error handling.',
                    'Komponen dibuat reusable untuk halaman lanjutan.',
                ],
            },
            {
                id: 'qa-launch',
                label: 'QA launch',
                eyebrow: 'Release check',
                title: 'QA sebelum halaman dipublish',
                tag: 'Launch gate',
                status: 'Final pass',
                description:
                    'Responsive layout, form, SEO dasar, performance, link, dan edge case dicek sebelum launch agar rilis tidak hanya terlihat bagus.',
                metrics: [
                    {
                        label: 'Perf target',
                        value: '90+',
                        change: 'core',
                        caption: 'Target halaman inti tetap ringan',
                    },
                    {
                        label: 'Breakpoints',
                        value: '05',
                        change: 'checked',
                        caption: 'Mobile sampai desktop dicek',
                    },
                    {
                        label: 'Forms',
                        value: '04',
                        change: 'tested',
                        caption: 'Success, error, dan validation aman',
                    },
                    {
                        label: 'SEO',
                        value: '08',
                        change: 'draft',
                        caption: 'Meta dan struktur awal tersedia',
                    },
                ],
                steps: [
                    { label: 'Responsive', detail: 'Tidak overlap' },
                    { label: 'Forms', detail: 'Validasi input' },
                    { label: 'Performance', detail: 'Asset ringan' },
                    { label: 'Launch', detail: 'DNS dan SSL' },
                ],
                checklist: [
                    'Tidak ada teks overlap di breakpoint utama.',
                    'CTA, form, dan link keluar berjalan sesuai tujuan.',
                    'Checklist launch disimpan untuk handover.',
                ],
            },
        ],
    },
    {
        label: 'Handover',
        items: [
            {
                id: 'admin-notes',
                label: 'Admin notes',
                eyebrow: 'Handover notes',
                title: 'Catatan admin yang mudah dipakai',
                tag: 'Admin workflow',
                status: 'Documented',
                description:
                    'Panel admin tidak hanya dibuat, tapi dijelaskan: apa yang bisa diubah, field mana yang wajib, dan bagian mana yang perlu hati-hati.',
                metrics: [
                    {
                        label: 'Admin flows',
                        value: '06',
                        change: 'noted',
                        caption: 'Alur pengelolaan konten ditulis',
                    },
                    {
                        label: 'Roles',
                        value: '03',
                        change: 'mapped',
                        caption: 'Akses admin dibatasi sesuai kebutuhan',
                    },
                    {
                        label: 'Content',
                        value: '12',
                        change: 'fields',
                        caption: 'Field penting dijelaskan',
                    },
                    {
                        label: 'Support',
                        value: '7d',
                        change: 'initial',
                        caption: 'Support awal setelah launch',
                    },
                ],
                steps: [
                    { label: 'Login', detail: 'Akses admin' },
                    { label: 'Content', detail: 'Cara update' },
                    { label: 'Users', detail: 'Role dan izin' },
                    { label: 'Support', detail: 'Issue awal' },
                ],
                checklist: [
                    'Admin tahu mana konten yang boleh diubah.',
                    'Field wajib dan format upload diberi catatan.',
                    'Support awal fokus pada bug dan adjustment kecil.',
                ],
            },
            {
                id: 'deploy-guide',
                label: 'Deploy guide',
                eyebrow: 'Production route',
                title: 'Deploy yang tidak mengandalkan ingatan',
                tag: 'VPS checklist',
                status: 'Guide ready',
                description:
                    'Deployment dirapikan dalam checklist: environment, build asset, storage, queue, scheduler, SSL, dan backup agar maintenance lebih tenang.',
                metrics: [
                    {
                        label: 'Env keys',
                        value: '14',
                        change: 'listed',
                        caption: 'Variable penting tidak ditebak',
                    },
                    {
                        label: 'Workers',
                        value: '01',
                        change: 'queue',
                        caption: 'Queue worker siap via Supervisor',
                    },
                    {
                        label: 'SSL',
                        value: 'ON',
                        change: 'certbot',
                        caption: 'HTTPS masuk checklist launch',
                    },
                    {
                        label: 'Backup',
                        value: 'Daily',
                        change: 'plan',
                        caption: 'Backup database disarankan',
                    },
                ],
                steps: [
                    { label: 'Server', detail: 'Nginx + PHP-FPM' },
                    { label: 'Build', detail: 'Frontend assets' },
                    { label: 'Queue', detail: 'Supervisor' },
                    { label: 'SSL', detail: 'Certbot' },
                ],
                checklist: [
                    'Environment production dipisah dari local.',
                    'Queue dan scheduler punya proses sendiri.',
                    'Rollback dan backup minimal punya catatan awal.',
                ],
            },
            {
                id: 'api-checklist',
                label: 'API checklist',
                eyebrow: 'Backend contract',
                title: 'API yang jelas untuk dikembangkan',
                tag: 'REST contract',
                status: 'Contract clear',
                description:
                    'Endpoint, validation, resource response, auth guard, rate limit, dan error message dibuat jelas agar frontend dan backend tidak saling menebak.',
                metrics: [
                    {
                        label: 'Endpoints',
                        value: '11',
                        change: 'REST',
                        caption: 'Route inti terdaftar jelas',
                    },
                    {
                        label: 'Validation',
                        value: '100%',
                        change: 'request',
                        caption: 'Input masuk lewat Form Request',
                    },
                    {
                        label: 'Auth',
                        value: 'Sanctum',
                        change: 'guard',
                        caption: 'Admin endpoint dijaga token',
                    },
                    {
                        label: 'Rate limit',
                        value: 'ON',
                        change: 'contact',
                        caption: 'Form publik punya batas request',
                    },
                ],
                steps: [
                    { label: 'Route', detail: 'Endpoint list' },
                    { label: 'Request', detail: 'Validation' },
                    { label: 'Resource', detail: 'Response shape' },
                    { label: 'Policy', detail: 'Admin access' },
                ],
                checklist: [
                    'Frontend memakai route typed agar URL tidak hardcode.',
                    'Response API konsisten lewat resource.',
                    'Endpoint publik punya honeypot dan rate limit.',
                ],
            },
        ],
    },
];

const workspaceViews = workspaceMenuGroups.flatMap((group) => group.items);

const heroCapabilities = [
    'Website',
    'Mobile UX',
    'Business Network',
    'Server & Cloud',
    'CCTV',
    'ISP',
] as const;

const readinessOptions = [
    {
        label: 'Website / app',
        intent: 'Kredibilitas, alur pengguna, dashboard, dan inquiry yang rapi.',
        estimate: '1-2 minggu',
        route: ['Brief', 'Sitemap', 'UI build', 'Launch'],
        output: 'Halaman inti, web app, lead form, dashboard, SEO dasar.',
        checks: ['Brand message', 'Responsive UX', 'Inquiry flow'],
        score: 'Fit 92%',
    },
    {
        label: 'Network bisnis',
        intent: 'WiFi stabil, coverage merata, dan bandwidth tidak cepat penuh.',
        estimate: '1-5 hari',
        route: ['Survey', 'Design', 'Install', 'Tune'],
        output: 'Router, switch, access point, kabel, dan konfigurasi bandwidth.',
        checks: ['Jumlah device', 'Coverage area', 'Traffic profile'],
        score: 'Fit 90%',
    },
    {
        label: 'Server / cloud',
        intent: 'Deploy aplikasi, database, backup, dan keamanan dasar.',
        estimate: '1-7 hari',
        route: ['Audit', 'Provision', 'Deploy', 'Monitor'],
        output: 'VPS/cloud/on-premise server siap operasi dengan checklist.',
        checks: ['Resource server', 'Backup plan', 'Access control'],
        score: 'Fit 87%',
    },
    {
        label: 'CCTV / ISP',
        intent: 'Monitoring keamanan, routing advanced, dan jaringan skala besar.',
        estimate: 'By scope',
        route: ['Site check', 'Topology', 'Install', 'NOC'],
        output: 'CCTV remote monitoring atau network ISP dengan routing dan monitoring.',
        checks: ['Area pantau', 'HA target', 'Monitoring NOC'],
        score: 'Fit 85%',
    },
] as const;

const solutionTabs = [
    {
        id: 'web',
        label: 'Web',
        eyebrow: 'Website & Web App',
        title: 'Website dan dashboard yang siap dipakai bisnis.',
        description:
            'Untuk company profile, landing page, admin panel, dashboard, dan sistem internal yang butuh alur rapi.',
        icon: Globe2,
        imageLabel: 'Web interface',
        imageMetric: 'UI + admin',
        imageSrc: '/solusi/web.png',
        imageAlt:
            'Ilustrasi pembuatan website dan dashboard bisnis Solvara Studio',
        problems: [
            'Brand belum terlihat profesional',
            'Inquiry dan CTA belum rapi',
            'Project belum mudah dikelola dari admin',
        ],
        solutions: [
            'Struktur halaman dan copy jelas',
            'UI responsive desktop dan mobile',
            'Admin panel dan CRUD project',
            'Deploy production dan basic SEO',
        ],
        packages: [
            {
                name: 'Landing Website',
                points: ['Hero, service, portfolio', 'CTA dan form inquiry'],
            },
            {
                name: 'Company System',
                points: [
                    'Company profile',
                    'Halaman layanan',
                    'Optimasi responsive',
                ],
            },
            {
                name: 'Admin Dashboard',
                points: ['Login admin', 'CRUD project', 'Upload media'],
            },
        ],
    },
    {
        id: 'mobile',
        label: 'Mobile',
        eyebrow: 'Mobile Experience & App',
        title: 'Mobile experience yang cepat dan enak digunakan.',
        description:
            'Untuk mobile-first website, PWA, prototype app, dan integrasi API agar flow pengguna lebih ringan.',
        icon: Smartphone,
        imageLabel: 'Mobile flow',
        imageMetric: 'PWA / app',
        imageSrc: '/solusi/mobile.png',
        imageAlt:
            'Ilustrasi mobile experience dan aplikasi bisnis Solvara Studio',
        problems: [
            'Tampilan mobile belum nyaman',
            'Flow pengguna terlalu panjang',
            'Aplikasi belum siap integrasi API',
        ],
        solutions: [
            'Desain UI mobile-first',
            'PWA, React Native, atau Flutter scope',
            'Integrasi API dan autentikasi',
            'Testing device dan performa',
        ],
        packages: [
            {
                name: 'Mobile Web',
                points: ['Responsive audit', 'CTA dan form mobile'],
            },
            {
                name: 'PWA Ready',
                points: ['Installable app', 'Offline-ready scope', 'Push plan'],
            },
            {
                name: 'App Prototype',
                points: ['User flow', 'API integration', 'Testing device'],
            },
        ],
    },
    {
        id: 'network',
        label: 'Network',
        eyebrow: 'Jasa Setup Jaringan Kantor & Bisnis',
        title: 'WiFi dan LAN yang stabil untuk operasional harian.',
        description:
            'Untuk cafe, kantor, toko, dan bisnis yang mulai terasa lambat saat user bertambah.',
        icon: Router,
        imageLabel: 'Network control',
        imageMetric: '10-100+ device',
        imageSrc: '/solusi/network.png',
        imageAlt:
            'Ilustrasi teknisi menyiapkan jaringan WiFi dan LAN untuk bisnis',
        problems: [
            'Internet lambat saat banyak pengguna',
            'WiFi tidak merata',
            'Koneksi sering putus',
        ],
        solutions: [
            'Desain jaringan sesuai kebutuhan',
            'Setup router, switch, access point',
            'Penarikan kabel rapi',
            'Optimasi performa jaringan',
        ],
        packages: [
            {
                name: 'Basic Network',
                points: ['Setup WiFi & router', 'Hingga 10 device'],
            },
            {
                name: 'Office Network',
                points: [
                    'Setup LAN + WiFi',
                    'Penarikan kabel',
                    'Support banyak user',
                ],
            },
            {
                name: 'Advanced Network',
                points: ['Multi access point', 'Manajemen bandwidth'],
            },
        ],
    },
    {
        id: 'server',
        label: 'Server',
        eyebrow: 'Jasa Setup Server & Cloud',
        title: 'Server siap pakai untuk aplikasi dan data bisnis.',
        description:
            'Cocok untuk perusahaan, startup, dan aplikasi berbasis web yang butuh fondasi lebih handal.',
        icon: ServerCog,
        imageLabel: 'Server operations',
        imageMetric: 'Backup + monitor',
        imageSrc: '/solusi/server.png',
        imageAlt:
            'Ilustrasi engineer mengelola server, cloud, dan database bisnis',
        problems: [
            'Deploy aplikasi belum rapi',
            'Database dan file belum punya backup',
            'Server lambat saat trafik naik',
        ],
        solutions: [
            'Setup web server & database',
            'Deploy aplikasi bisnis',
            'Backup & keamanan data',
            'Monitoring server',
        ],
        packages: [
            {
                name: 'Cloud Starter',
                points: ['VPS/cloud setup', 'SSL dan web server'],
            },
            {
                name: 'Business Server',
                points: [
                    'App + database deploy',
                    'Backup schedule',
                    'Monitoring basic',
                ],
            },
            {
                name: 'On-premise Ready',
                points: [
                    'Server lokal',
                    'Access control',
                    'Maintenance checklist',
                ],
            },
        ],
    },
    {
        id: 'cctv',
        label: 'CCTV',
        eyebrow: 'Instalasi CCTV & Sistem Keamanan',
        title: 'Keamanan bisnis dengan monitoring yang mudah dicek.',
        description:
            'Untuk toko, kantor, gudang, dan area operasional yang perlu dipantau dari HP.',
        icon: Cctv,
        imageLabel: 'Security system',
        imageMetric: 'Remote view',
        imageSrc: '/solusi/cctv.png',
        imageAlt:
            'Ilustrasi teknisi memasang CCTV dan sistem monitoring keamanan',
        problems: [
            'Area penting belum terpantau',
            'Akses rekaman sulit dicek',
            'CCTV belum terintegrasi jaringan',
        ],
        solutions: [
            'Instalasi kamera CCTV',
            'Setup DVR/NVR',
            'Monitoring via HP',
            'Penyimpanan rekaman',
        ],
        packages: [
            {
                name: 'Retail Security',
                points: ['Kamera area kasir', 'Monitoring via HP'],
            },
            {
                name: 'Office Security',
                points: [
                    'DVR/NVR setup',
                    'Storage rekaman',
                    'Network integration',
                ],
            },
            {
                name: 'Warehouse Security',
                points: ['Multi camera', 'Coverage check', 'Remote access'],
            },
        ],
    },
    {
        id: 'isp',
        label: 'ISP',
        eyebrow: 'Solusi Jaringan Skala Besar & ISP',
        title: 'Topologi, routing, dan monitoring untuk jaringan besar.',
        description:
            'Untuk enterprise dan ISP yang butuh high availability, scalability, dan security.',
        icon: RadioTower,
        imageLabel: 'ISP backbone',
        imageMetric: 'BGP / OSPF',
        imageSrc: '/solusi/isp.png',
        imageAlt:
            'Ilustrasi engineer mengawasi jaringan ISP, backbone, dan monitoring NOC',
        problems: [
            'Routing dan traffic belum terkendali',
            'Monitoring belum terpusat',
            'Skalabilitas jaringan belum siap',
        ],
        solutions: [
            'Infrastruktur jaringan ISP',
            'Routing advanced (BGP, OSPF)',
            'Fiber optic & wireless',
            'Monitoring & NOC',
        ],
        packages: [
            {
                name: 'Backbone Plan',
                points: ['Topology design', 'Fiber / wireless scope'],
            },
            {
                name: 'Routing Advanced',
                points: ['BGP / OSPF', 'Traffic management', 'Failover plan'],
            },
            {
                name: 'NOC Monitoring',
                points: ['Monitoring dashboard', 'Alerting', 'Incident notes'],
            },
        ],
    },
] as const;

const portfolioSnapshots = [
    {
        title: 'Setup jaringan kantor 20+ user',
        detail: 'LAN, WiFi, router, dan bandwidth dibuat lebih stabil.',
        icon: Network,
    },
    {
        title: 'Instalasi CCTV toko retail',
        detail: 'Monitoring via HP dengan storage rekaman yang mudah dicek.',
        icon: Camera,
    },
    {
        title: 'Deploy server aplikasi',
        detail: 'Web server, database, SSL, backup, dan checklist launch.',
        icon: CloudCog,
    },
] as const;

const simpleIcon = (slug: string) =>
    `https://cdn.simpleicons.org/${slug}/000000`;

const webLogoItems: LogoItem[] = [
    { src: simpleIcon('html5'), alt: 'HTML5' },
    { src: simpleIcon('css'), alt: 'CSS' },
    { src: simpleIcon('javascript'), alt: 'JavaScript' },
    { src: simpleIcon('typescript'), alt: 'TypeScript' },
    { src: simpleIcon('react'), alt: 'React' },
    { src: simpleIcon('nextdotjs'), alt: 'Next.js' },
    { src: simpleIcon('vuedotjs'), alt: 'Vue.js' },
    { src: simpleIcon('vite'), alt: 'Vite' },
    { src: simpleIcon('tailwindcss'), alt: 'Tailwind CSS' },
    { src: simpleIcon('php'), alt: 'PHP' },
    { src: simpleIcon('laravel'), alt: 'Laravel' },
    { src: simpleIcon('nodedotjs'), alt: 'Node.js' },
];

const infrastructureLogoItems: LogoItem[] = [
    { src: simpleIcon('flutter'), alt: 'Flutter' },
    { src: simpleIcon('react'), alt: 'React Native' },
    { src: simpleIcon('android'), alt: 'Android' },
    { src: simpleIcon('apple'), alt: 'iOS' },
    { src: simpleIcon('firebase'), alt: 'Firebase' },
    { src: simpleIcon('mikrotik'), alt: 'MikroTik' },
    { src: simpleIcon('ubiquiti'), alt: 'Ubiquiti' },
    { src: simpleIcon('tplink'), alt: 'TP-Link' },
    { src: simpleIcon('linux'), alt: 'Linux' },
    { src: simpleIcon('docker'), alt: 'Docker' },
    { src: simpleIcon('nginx'), alt: 'Nginx' },
    { src: simpleIcon('mysql'), alt: 'MySQL' },
    { src: simpleIcon('postgresql'), alt: 'PostgreSQL' },
    { src: simpleIcon('redis'), alt: 'Redis' },
    { src: simpleIcon('githubactions'), alt: 'GitHub Actions' },
];

const serviceAccents = [
    'from-[#c7f25b] to-[#ecffd4]',
    'from-[#9ee5da] to-[#eefcf8]',
    'from-[#ead18b] to-[#fff5d8]',
    'from-[#bfe6ff] to-[#eff8ff]',
    'from-[#d8b56d] to-[#fff6df]',
    'from-[#f3b0a8] to-[#fff0ee]',
] as const;

const qualityNotes = [
    'Pest + PHPUnit feature coverage',
    'Playwright smoke check',
    'Pint, ESLint, dan Prettier',
    'Backup dan rollback checklist',
    'Deployment monitoring-ready',
    'Security baseline review',
] as const;

const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Nama minimal 2 karakter.')
        .max(100, 'Nama terlalu panjang.'),
    contact: z
        .string()
        .trim()
        .min(5, 'Email atau nomor WhatsApp wajib diisi.')
        .max(150, 'Kontak terlalu panjang.'),
    project_type: z.enum(projectTypes, {
        message: 'Pilih jenis project.',
    }),
    budget: z.enum(budgetRanges, {
        message: 'Pilih budget range.',
    }),
    deadline: z
        .union([z.enum(deadlineRanges), z.literal('')])
        .optional()
        .transform((value) => (value === '' ? undefined : value)),
    message: z
        .string()
        .trim()
        .min(20, 'Pesan minimal 20 karakter.')
        .max(2000, 'Pesan terlalu panjang.'),
    company: z.string().max(0, 'Form tidak valid.'),
});

type ContactFormValues = z.input<typeof contactSchema>;

export default function Welcome() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const { language, t } = useTranslator();
    const isLightMode = resolvedAppearance === 'light';
    const toggleAppearance = () =>
        updateAppearance(isLightMode ? 'dark' : 'light');

    return (
        <>
            <Head title={t(META.title)}>
                <meta
                    head-key="description"
                    name="description"
                    content={t(META.description)}
                />
                <link rel="canonical" href={META.url} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={META.url} />
                <meta property="og:title" content={t(META.title)} />
                <meta property="og:description" content={t(META.description)} />
                <meta property="og:image" content={META.image} />
                <meta
                    property="og:locale"
                    content={language === 'id' ? 'id_ID' : 'en_US'}
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t(META.title)} />
                <meta
                    name="twitter:description"
                    content={t(META.description)}
                />
                <meta name="twitter:image" content={META.image} />
                <meta
                    name="theme-color"
                    content={isLightMode ? '#f6f8f2' : '#050706'}
                />
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

            <div
                className={cn(
                    'solvara-landing min-h-screen overflow-x-hidden bg-black p-2 text-[#0b1110] antialiased',
                    isLightMode && 'is-light',
                )}
            >
                <TopNavigation />
                <Hero />
                <SocialProofBand />
                <ServicesSection />
                <SolutionDetailSection />
                <ProcessSection />
                <TeamSection />
                <SelectedWorkSection />
                <WhySolvaraSection />
                <TechQualitySection />
                <TestimonialsSection />
                <FAQSection />
                <ContactSection />
                <Footer />
                <LandingThemeToggle
                    isLightMode={isLightMode}
                    onToggle={toggleAppearance}
                />
            </div>
        </>
    );
}

function LandingThemeToggle({
    isLightMode,
    onToggle,
}: {
    isLightMode: boolean;
    onToggle: () => void;
}) {
    const Icon = isLightMode ? Moon : Sun;
    const { t } = useTranslator();

    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={
                isLightMode
                    ? t('Aktifkan mode gelap')
                    : t('Aktifkan mode terang')
            }
            className={cn(
                'fixed right-5 bottom-5 z-50 inline-flex size-13 items-center justify-center rounded-full border backdrop-blur-2xl transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#a7e33d]/60 focus-visible:outline-none sm:right-7 sm:bottom-7',
                isLightMode
                    ? 'border-black/12 bg-white text-black shadow-[0_18px_60px_rgba(11,17,16,0.18)] hover:bg-white/92'
                    : 'border-[#a7e33d]/55 bg-[#a7e33d] text-black shadow-[0_18px_60px_rgba(167,227,61,0.34)] ring-1 ring-black/12 hover:bg-[#b8ef55]',
            )}
        >
            <Icon className="size-5" strokeWidth={2.2} aria-hidden />
            <span className="sr-only">
                {isLightMode ? t('Mode gelap') : t('Mode terang')}
            </span>
        </button>
    );
}

function TopNavigation() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { t } = useTranslator();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.documentElement.style.overflow = open ? 'hidden' : '';

        return () => {
            document.documentElement.style.overflow = '';
        };
    }, [open]);

    return (
        <header className="pointer-events-none fixed top-3 right-3 left-3 z-50 sm:top-4 sm:right-auto sm:left-1/2 sm:w-[min(940px,calc(100%-32px))] sm:-translate-x-1/2 2xl:top-6 2xl:w-[min(1310px,calc(100%-96px))]">
            <div
                className={cn(
                    'solvara-top-nav pointer-events-auto flex h-13.5 w-full items-center justify-between rounded-full border px-3 text-white shadow-[0_18px_60px_-28px_rgba(167,227,61,0.7)] ring-1 ring-black/15 backdrop-blur-xl transition sm:h-18 sm:px-7 2xl:h-25 2xl:px-10',
                    scrolled
                        ? 'border-white/15 bg-black/96'
                        : 'border-white/12 bg-black/92',
                )}
            >
                <a
                    href="#top"
                    className="inline-flex min-w-0 items-center gap-2.5 rounded-full focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none sm:gap-3"
                    aria-label="Solvara Studio"
                    onClick={() => setOpen(false)}
                >
                    <img
                        src={BRAND_LOGO_SRC}
                        alt=""
                        className="size-7.5 object-contain sm:size-9 2xl:size-13"
                        aria-hidden
                    />
                    <span className="truncate text-[14px] font-semibold sm:text-[18px] 2xl:text-[28px]">
                        Solvara Studio
                    </span>
                </a>

                <nav
                    aria-label={t('Navigasi utama')}
                    className="hidden items-center gap-6 lg:flex 2xl:gap-12"
                >
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="solvara-top-nav-link inline-flex items-center gap-1 rounded-full text-[13px] text-white/70 transition hover:text-white focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none 2xl:text-[20px]"
                        >
                            {t(item.label)}
                            {item.hasDropdown && (
                                <ChevronDown
                                    className="size-3.5 2xl:size-5"
                                    aria-hidden
                                />
                            )}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2 2xl:gap-5">
                    <LanguageToggle
                        tone="adaptive"
                        className="hidden sm:inline-flex"
                    />
                    <a
                        href="#contact"
                        className="solvara-top-nav-cta group hidden h-10 overflow-hidden rounded-xl bg-[#a7e33d] text-[13px] font-semibold text-black transition hover:bg-[#97d22e] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none sm:h-11 lg:inline-flex 2xl:h-14 2xl:rounded-2xl 2xl:text-[17px]"
                    >
                        <span className="solvara-top-nav-cta-label flex h-full items-center rounded-xl bg-white px-5 2xl:rounded-2xl 2xl:px-7">
                            <LetterSwap3D>
                                {t('Konsultasi Gratis')}
                            </LetterSwap3D>
                        </span>
                        <span className="solvara-top-nav-cta-icon inline-flex h-full w-11 items-center justify-center 2xl:w-14">
                            <ArrowDownRight
                                className="size-4 transition group-hover:translate-x-0.5 group-hover:translate-y-0.5 2xl:size-5"
                                aria-hidden
                            />
                        </span>
                    </a>
                    <button
                        type="button"
                        aria-label={
                            open
                                ? t('Tutup menu navigasi')
                                : t('Buka menu navigasi')
                        }
                        aria-expanded={open}
                        aria-controls="mobile-nav"
                        onClick={() => setOpen((value) => !value)}
                        className="solvara-top-nav-mobile-button inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:bg-white/14 focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:outline-none lg:hidden"
                    >
                        {open ? (
                            <X className="size-4" aria-hidden />
                        ) : (
                            <Menu className="size-4" aria-hidden />
                        )}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.nav
                        id="mobile-nav"
                        aria-label={t('Navigasi mobile')}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                        className="solvara-mobile-nav pointer-events-auto mt-2 rounded-3xl border border-white/12 bg-black/94 p-2 text-white shadow-[0_18px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl lg:hidden"
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="solvara-mobile-nav-link flex items-center justify-between rounded-2xl px-4 py-3 text-[14px] text-white/76 transition hover:bg-white/8 hover:text-white focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none"
                            >
                                {t(item.label)}
                                <ArrowDownRight
                                    className="size-4 text-[#a7e33d]"
                                    aria-hidden
                                />
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setOpen(false)}
                            className="solvara-mobile-nav-cta group mt-1 flex items-center justify-between rounded-2xl bg-[#a7e33d] px-4 py-3 text-[14px] font-semibold text-black focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                        >
                            <LetterSwap3D>
                                {t('Konsultasi Gratis')}
                            </LetterSwap3D>
                            <ArrowDownRight className="size-4" aria-hidden />
                        </a>
                        <div className="mt-2 px-1 sm:hidden">
                            <LanguageToggle
                                tone="adaptive"
                                className="w-full justify-between"
                            />
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}

function Hero() {
    const { t } = useTranslator();

    return (
        <section
            id="top"
            className="relative isolate min-h-[calc(100svh-16px)] w-full overflow-hidden rounded-3xl bg-white sm:rounded-4xl 2xl:rounded-[44px]"
        >
            <img
                src="/landing/solvara-hero-texture.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-white/18" />
            <div className="absolute inset-x-0 top-0 h-52 bg-linear-to-b from-white/92 via-white/54 to-white/0" />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-44 mx-auto h-64 max-w-245 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.62)_42%,rgba(255,255,255,0)_74%)] blur-2xl sm:top-56 sm:h-82.5 2xl:top-90 2xl:h-107.5 2xl:max-w-315"
            />
            <div className="absolute inset-x-0 bottom-0 h-80 bg-linear-to-t from-[#d1dc47]/72 via-[#d1dc47]/22 to-transparent" />
            <div className="absolute inset-x-0 top-42 hidden h-px bg-black/8 md:block" />
            <div
                aria-hidden
                className="solvara-scanline pointer-events-none absolute top-47.5 left-[-30%] hidden h-px w-[60%] md:block"
            />

            <div className="relative z-10 mx-auto flex min-h-[calc(100svh-16px)] w-full max-w-7xl flex-col items-center px-4 pt-34 pb-12 text-center sm:px-8 sm:pt-42 sm:pb-20 lg:pt-55 lg:pb-117.5 2xl:max-w-385 2xl:pt-80 2xl:pb-150">
                <Reveal className="inline-flex max-w-full items-center gap-2 rounded-full border border-black/10 bg-white/72 px-3.5 py-2 text-[12px] leading-5 font-medium shadow-sm backdrop-blur sm:px-4 sm:text-[13px] 2xl:gap-3 2xl:px-6 2xl:py-3 2xl:text-[18px]">
                    <Sparkles
                        className="size-4 text-[#94c91b] 2xl:size-5"
                        aria-hidden
                    />
                    {t(
                        'Web, mobile, network, server, CCTV, dan ISP-ready support',
                    )}
                </Reveal>

                <HeroHeadline />

                <Reveal delay={0.16}>
                    <p className="mt-5 w-full max-w-180 text-[15px] leading-7 font-medium text-black/78 [text-shadow:0_1px_24px_rgba(255,255,255,0.95)] sm:mt-7 sm:text-[18px] 2xl:mt-12 2xl:max-w-245 2xl:text-[25px] 2xl:leading-9">
                        {t(
                            'Dari setup WiFi cafe & kantor hingga infrastruktur server dan jaringan skala corporate & ISP, kami bantu bisnis Anda berjalan lebih stabil, aman, dan siap berkembang.',
                        )}
                    </p>
                </Reveal>

                <Reveal
                    delay={0.24}
                    className="mt-7 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:items-center"
                >
                    <a
                        href="#contact"
                        className="group inline-flex h-12 w-full max-w-full items-stretch justify-center overflow-hidden rounded-xl bg-[#a7e33d] text-[14px] font-semibold text-black transition hover:bg-[#97d22e] focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:outline-none sm:w-auto sm:max-w-none 2xl:h-16 2xl:rounded-2xl 2xl:text-[20px]"
                    >
                        <span className="flex h-full min-w-0 flex-1 items-center justify-center rounded-xl bg-black px-5 text-white sm:flex-none sm:px-6 2xl:rounded-2xl 2xl:px-9">
                            <LetterSwap3D>
                                {t('Konsultasi Gratis Sekarang')}
                            </LetterSwap3D>
                        </span>
                        <span className="inline-flex h-full w-12 flex-none items-center justify-center 2xl:w-16">
                            <ArrowDownRight
                                className="size-4 transition group-hover:translate-x-0.5 group-hover:translate-y-0.5 2xl:size-6"
                                aria-hidden
                            />
                        </span>
                    </a>
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex h-12 w-full max-w-full items-center justify-center rounded-xl border border-black/12 bg-white/64 px-5 text-[14px] font-semibold text-black transition hover:border-black/25 hover:bg-white focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-none sm:w-auto sm:max-w-none 2xl:h-16 2xl:rounded-2xl 2xl:px-8 2xl:text-[20px]"
                    >
                        <LetterSwap3D>{t('Hubungi via WhatsApp')}</LetterSwap3D>
                    </a>
                </Reveal>

                <Reveal
                    delay={0.32}
                    className="mt-6 flex max-w-210 flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-black/76 [text-shadow:0_1px_20px_rgba(255,255,255,0.95)] sm:mt-7 sm:text-[12px] 2xl:text-[17px]"
                >
                    {heroCapabilities.map((item) => (
                        <span
                            key={item}
                            className="rounded-full border border-black/10 bg-white/58 px-3 py-1.5 shadow-sm backdrop-blur"
                        >
                            {t(item)}
                        </span>
                    ))}
                </Reveal>

                <div className="mt-9 w-full max-w-84 sm:mt-12 sm:max-w-87.5 lg:hidden">
                    <MobileShowcase />
                </div>
            </div>

            <div className="absolute -bottom-90 left-1/2 z-20 hidden w-[min(940px,calc(100%-48px))] -translate-x-1/2 lg:block 2xl:-bottom-117.5 2xl:w-[min(1310px,calc(100%-96px))]">
                <DashboardShowcase />
            </div>
        </section>
    );
}

function DashboardShowcase() {
    const reduce = useReducedMotion();
    const { t } = useTranslator();
    const [activeWorkspaceId, setActiveWorkspaceId] =
        useState<WorkspaceView['id']>('development');
    const activeView =
        workspaceViews.find((view) => view.id === activeWorkspaceId) ??
        workspaceViews[0]!;

    return (
        <motion.div
            initial={reduce ? false : { opacity: 0, y: 28, scale: 0.98 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="solvara-depth-surface solvara-workspace-panel relative overflow-hidden rounded-2xl border border-white/10 bg-[#101110] text-white shadow-[0_40px_120px_-40px_rgba(5,7,6,0.9)]"
        >
            <div className="flex h-10 items-center justify-between border-b border-white/10 px-4 2xl:h-14 2xl:px-7">
                <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full border border-white/70 2xl:size-3" />
                    <span className="text-[11px] font-semibold 2xl:text-[17px]">
                        Solvara Workspace
                    </span>
                </div>
                <div className="rounded-full bg-[#a7e33d]/85 px-2.5 py-0.5 text-[10px] font-semibold text-black 2xl:px-5 2xl:py-1 2xl:text-[14px]">
                    <motion.span
                        aria-hidden
                        animate={
                            reduce ? undefined : { opacity: [0.65, 1, 0.65] }
                        }
                        transition={
                            reduce
                                ? undefined
                                : {
                                      duration: 2.4,
                                      repeat: Infinity,
                                      ease: 'easeInOut',
                                  }
                        }
                        className="mr-1.5 inline-flex size-1.5 rounded-full bg-black/75"
                    />
                    {t(activeView.status)}
                </div>
            </div>

            <div className="solvara-workspace-shell grid min-h-130 grid-cols-[170px_1fr] 2xl:min-h-160 2xl:grid-cols-[240px_1fr]">
                <aside className="border-r border-white/10 px-4 py-5 2xl:px-7 2xl:py-8">
                    {workspaceMenuGroups.map((group, groupIndex) => (
                        <div
                            key={group.label}
                            className={cn(groupIndex > 0 && 'mt-7 2xl:mt-10')}
                        >
                            <div className="mb-4 text-[10px] text-white/50 2xl:mb-6 2xl:text-[16px]">
                                {t(group.label)}
                            </div>
                            <div className="space-y-1.5">
                                {group.items.map((item) => (
                                    <WorkspaceMenuButton
                                        key={item.id}
                                        item={item}
                                        isActive={activeWorkspaceId === item.id}
                                        onSelect={() =>
                                            setActiveWorkspaceId(item.id)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </aside>

                <div className="p-4 2xl:p-7">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeView.id}
                            initial={
                                reduce
                                    ? false
                                    : { opacity: 0, y: 12, filter: 'blur(8px)' }
                            }
                            animate={
                                reduce
                                    ? undefined
                                    : { opacity: 1, y: 0, filter: 'blur(0px)' }
                            }
                            exit={
                                reduce
                                    ? undefined
                                    : {
                                          opacity: 0,
                                          y: -8,
                                          filter: 'blur(6px)',
                                      }
                            }
                            transition={{
                                duration: 0.34,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <div className="mb-6 flex items-center justify-between gap-4">
                                <div>
                                    <div className="text-[11px] font-semibold text-[#d2ed71] 2xl:text-[18px]">
                                        {t(activeView.eyebrow)}
                                    </div>
                                    <div className="mt-1 max-w-xl text-[11px] leading-5 text-white/42 2xl:text-[16px] 2xl:leading-7">
                                        {t(activeView.description)}
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-white/55 2xl:px-5 2xl:text-[15px]">
                                    <span className="size-1.5 rounded-full bg-[#a7e33d]" />
                                    {t(activeView.tag)}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-3 2xl:gap-5">
                                {activeView.metrics.map((metric, index) => (
                                    <WorkspaceMetricCard
                                        key={metric.label}
                                        metric={metric}
                                        index={index}
                                    />
                                ))}
                            </div>

                            <div className="mt-4 grid gap-3 lg:grid-cols-[1.14fr_0.86fr] 2xl:mt-6 2xl:gap-5">
                                <WorkspaceTimeline activeView={activeView} />
                                <WorkspaceChecklist activeView={activeView} />
                            </div>

                            <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-[10px] text-white/48 2xl:mt-5 2xl:px-6 2xl:py-4 2xl:text-[15px]">
                                <span>{t('Decision log')}</span>
                                <span className="text-[#d2ed71]">
                                    {t('Progress bisa dicek bertahap')}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <div className="solvara-workspace-bottom-wash pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-[#cbd341]/55 to-transparent" />
        </motion.div>
    );
}

function WorkspaceMenuButton({
    item,
    isActive,
    onSelect,
}: {
    item: WorkspaceView;
    isActive: boolean;
    onSelect: () => void;
}) {
    const { t } = useTranslator();

    return (
        <button
            type="button"
            onClick={onSelect}
            aria-pressed={isActive}
            className={cn(
                'solvara-workspace-menu-button group relative flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-left text-[11px] transition hover:bg-white/6 focus-visible:ring-2 focus-visible:ring-[#a7e33d]/60 focus-visible:outline-none 2xl:text-[17px]',
                isActive
                    ? 'bg-[#a7e33d]/8 font-semibold text-[#a7e33d]'
                    : 'text-white/62 hover:text-white',
            )}
        >
            <span
                className={cn(
                    'size-1.5 rounded-full border border-current transition 2xl:size-2',
                    isActive && 'bg-[#a7e33d] shadow-[0_0_18px_#a7e33d]',
                )}
            />
            <span>{t(item.label)}</span>
            {isActive && (
                <motion.span
                    layoutId="workspace-menu-active"
                    className="absolute inset-y-0 -right-2 w-px bg-[#a7e33d]/70"
                    transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                />
            )}
        </button>
    );
}

function WorkspaceMetricCard({
    metric,
    index,
}: {
    metric: WorkspaceView['metrics'][number];
    index: number;
}) {
    const reduce = useReducedMotion();
    const { t } = useTranslator();

    return (
        <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            whileHover={
                reduce
                    ? undefined
                    : {
                          y: -5,
                          borderColor: 'rgba(167,227,61,0.32)',
                      }
            }
            transition={{
                duration: 0.48,
                delay: index * 0.045,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="min-w-0 rounded-lg border border-white/10 bg-white/4.5 p-4 2xl:p-6"
        >
            <div className="flex items-center justify-between gap-2">
                <div className="truncate text-[11px] text-white/42 2xl:text-[17px]">
                    {t(metric.label)}
                </div>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] whitespace-nowrap text-[#d2ed71] 2xl:px-3 2xl:text-[13px]">
                    {t(metric.change)}
                </span>
            </div>
            <AnimatedMetricValue
                value={metric.value}
                className="mt-3 truncate text-[22px] font-semibold text-white 2xl:mt-5 2xl:text-[34px]"
            />
            <div className="mt-2 line-clamp-2 text-[10px] leading-4 text-white/45 2xl:text-[15px] 2xl:leading-6">
                {t(metric.caption)}
            </div>
        </motion.div>
    );
}

function WorkspaceTimeline({ activeView }: { activeView: WorkspaceView }) {
    const reduce = useReducedMotion();
    const { t } = useTranslator();

    return (
        <section className="relative overflow-hidden rounded-lg border border-white/10 bg-white/4.5 p-4 2xl:p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-[13px] font-semibold text-[#d2ed71] 2xl:text-[20px]">
                        {t(activeView.title)}
                    </h3>
                    <p className="mt-1 max-w-lg text-[11px] leading-5 text-white/45 2xl:text-[16px] 2xl:leading-7">
                        {t(activeView.description)}
                    </p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] font-semibold text-white/48 2xl:text-[13px]">
                    {t(activeView.status)}
                </span>
            </div>

            <div className="relative mt-8 grid grid-cols-4 gap-2 2xl:mt-12 2xl:gap-3">
                <motion.span
                    aria-hidden
                    className="absolute top-5 right-[12%] left-[12%] h-px bg-linear-to-r from-[#a7e33d] via-[#d2ed71] to-white/18 2xl:top-7"
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={reduce ? undefined : { scaleX: 1 }}
                    transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: 'left' }}
                />
                {activeView.steps.map((step, index) => (
                    <motion.div
                        key={step.label}
                        initial={reduce ? false : { opacity: 0, y: 12 }}
                        animate={reduce ? undefined : { opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.46,
                            delay: 0.16 + index * 0.06,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative min-w-0 rounded-md border border-white/10 bg-black/24 px-2 py-3 text-center 2xl:px-3 2xl:py-5"
                    >
                        <span className="mx-auto mb-3 flex size-4 items-center justify-center rounded-full bg-[#a7e33d] shadow-[0_0_20px_rgba(167,227,61,0.55)] 2xl:size-6">
                            <span className="size-1.5 rounded-full bg-black/70 2xl:size-2" />
                        </span>
                        <div className="truncate text-[10px] font-semibold text-white/72 2xl:text-[15px]">
                            {t(step.label)}
                        </div>
                        <div className="mt-1 line-clamp-2 text-[9px] leading-4 text-white/38 2xl:text-[13px] 2xl:leading-5">
                            {t(step.detail)}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 h-20 overflow-hidden rounded-md border border-white/10 bg-black/20 px-3 py-3 2xl:mt-8 2xl:h-28 2xl:px-5">
                <div className="flex h-full items-end gap-1.5">
                    {[36, 54, 46, 68, 58, 78, 64, 88, 72, 96].map(
                        (height, index) => (
                            <motion.span
                                key={`${activeView.id}-${height}-${index}`}
                                className="flex-1 rounded-t-sm bg-linear-to-t from-[#a7e33d]/18 to-[#d2ed71]"
                                initial={reduce ? false : { height: '14%' }}
                                animate={
                                    reduce
                                        ? undefined
                                        : { height: `${height}%` }
                                }
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.025,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                style={
                                    reduce
                                        ? { height: `${height}%` }
                                        : undefined
                                }
                            />
                        ),
                    )}
                </div>
            </div>
        </section>
    );
}

function WorkspaceChecklist({ activeView }: { activeView: WorkspaceView }) {
    const { t } = useTranslator();

    return (
        <section className="rounded-lg border border-white/10 bg-white/4.5 p-4 2xl:p-6">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-[13px] font-semibold text-[#d2ed71] 2xl:text-[20px]">
                    {t('Working notes')}
                </h3>
                <span className="font-mono text-[10px] text-white/30 2xl:text-[14px]">
                    {activeView.id}
                </span>
            </div>
            <div className="mt-5 space-y-3 2xl:mt-7 2xl:space-y-4">
                {activeView.checklist.map((item, index) => (
                    <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.38,
                            delay: index * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex gap-2.5 text-[10px] leading-5 text-white/58 2xl:text-[15px] 2xl:leading-7"
                    >
                        <Check className="mt-0.5 size-3.5 shrink-0 text-[#a7e33d] 2xl:size-5" />
                        <span>{t(item)}</span>
                    </motion.div>
                ))}
            </div>
            <div className="mt-6 rounded-md border border-[#a7e33d]/18 bg-[#a7e33d]/8 p-3 text-[10px] leading-5 text-[#d2ed71] 2xl:mt-8 2xl:p-4 2xl:text-[15px] 2xl:leading-7">
                {t(
                    'Tidak semua project perlu sistem besar. Yang penting scope, flow, dan handover-nya jelas sejak awal.',
                )}
            </div>
        </section>
    );
}

function MobileShowcase() {
    const reduce = useReducedMotion();
    const { t } = useTranslator();

    return (
        <motion.div
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-[22px] border border-white/10 bg-[#0a0d0c] text-left text-white shadow-[0_24px_80px_-30px_rgba(5,7,6,0.8)]"
        >
            <div className="flex h-12 items-center justify-between border-b border-white/10 px-4">
                <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-white/45" />
                    <span className="text-[13px] font-semibold">
                        solvara.workspace
                    </span>
                </div>
                <span className="rounded-full bg-[#a7e33d] px-2 py-1 text-[11px] font-semibold text-black">
                    Live
                </span>
            </div>
            <div className="p-4">
                <div className="flex items-center gap-2 text-[13px] text-white/50">
                    <LayoutDashboard className="size-4" aria-hidden />
                    {t('Launch board')}
                </div>
                <div className="mt-3 text-[28px] leading-[1.14] font-semibold">
                    IT + network readiness
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                    {miniMetrics.map((metric) => (
                        <div
                            key={metric.label}
                            className="min-w-0 rounded-lg border border-white/10 bg-white/6 p-3"
                        >
                            <div className="truncate text-[11px] text-white/45">
                                {t(metric.label)}
                            </div>
                            <AnimatedMetricValue
                                value={metric.value}
                                className="mt-3 text-[24px] font-semibold"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-3 rounded-lg border border-white/10 bg-white/6 p-3">
                    <div className="flex items-center gap-2 text-[13px] font-semibold">
                        <BarChart3 className="size-4" aria-hidden />
                        {t('Flow preview')}
                    </div>
                    <div className="mt-5 flex h-24 items-end gap-1.5">
                        {[34, 46, 38, 68, 54, 78, 64, 86].map(
                            (height, index) => (
                                <motion.span
                                    key={`${height}-${index}`}
                                    className="flex-1 rounded-t-md bg-linear-to-t from-[#a7e33d]/35 to-[#a7e33d]"
                                    initial={reduce ? false : { height: '12%' }}
                                    whileInView={
                                        reduce
                                            ? undefined
                                            : { height: `${height}%` }
                                    }
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{
                                        duration: 0.66,
                                        delay: index * 0.045,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    style={
                                        reduce
                                            ? { height: `${height}%` }
                                            : undefined
                                    }
                                />
                            ),
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function SocialProofBand() {
    return (
        <section className="px-5 pt-10 pb-5 text-white sm:px-8 sm:pb-7 lg:pt-28 lg:pb-8">
            <div className="mx-auto max-w-340">
                <TechLogoLoopSection />
            </div>

            <div className="mx-auto max-w-340">
                <ProjectReadinessPanel />
            </div>
        </section>
    );
}

function TechLogoLoopSection() {
    const { resolvedAppearance } = useAppearance();
    const fadeOutColor = resolvedAppearance === 'light' ? '#f6f8f2' : '#000000';

    return (
        <Reveal className="mb-10 overflow-hidden py-2 text-white">
            <div className="space-y-5">
                <LogoLoop
                    logos={webLogoItems}
                    speed={86}
                    direction="left"
                    logoHeight={48}
                    gap={54}
                    hoverSpeed={0}
                    scaleOnHover
                    fadeOut
                    fadeOutColor={fadeOutColor}
                    renderItem={(item) => <TechLoopLogoItem item={item} />}
                    ariaLabel="Web development technology logos"
                />
                <LogoLoop
                    logos={infrastructureLogoItems}
                    speed={80}
                    direction="right"
                    logoHeight={48}
                    gap={54}
                    hoverSpeed={0}
                    scaleOnHover
                    fadeOut
                    fadeOutColor={fadeOutColor}
                    renderItem={(item) => <TechLoopLogoItem item={item} />}
                    ariaLabel="Mobile network server and quality technology logos"
                />
            </div>
        </Reveal>
    );
}

function ProjectReadinessPanel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const reduce = useReducedMotion();
    const { t } = useTranslator();
    const active = readinessOptions[activeIndex];

    return (
        <Reveal>
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0d0c] shadow-[0_24px_90px_-60px_rgba(167,227,61,0.45)]">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(167,227,61,0.16),transparent_34%),radial-gradient(circle_at_88%_100%,rgba(216,181,109,0.13),transparent_32%)]"
                />
                <div className="relative grid gap-px bg-white/10 lg:grid-cols-[0.92fr_1.08fr]">
                    <div className="bg-[#0b0d0c]/96 p-5 sm:p-7 lg:p-8">
                        <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[#a7e33d] uppercase">
                            <ClipboardCheck className="size-4" aria-hidden />
                            {t('Project readiness')}
                        </div>
                        <h2 className="mt-4 max-w-lg text-[30px] leading-[1.14] font-semibold tracking-tight text-white sm:text-[42px]">
                            {t(
                                'Cek kebutuhan IT sebelum masuk ke scope detail.',
                            )}
                        </h2>
                        <p className="mt-5 max-w-md text-[14px] leading-6 text-white/52">
                            {t(
                                'Pilih kebutuhan awal. Panel ini merapikan titik awal, output, dan jalur kerja untuk web, network, server, CCTV, atau ISP.',
                            )}
                        </p>

                        <div
                            className="mt-7 grid gap-2 sm:grid-cols-2"
                            role="tablist"
                            aria-label={t('Tipe project')}
                        >
                            {readinessOptions.map((option, index) => {
                                const isActive = index === activeIndex;

                                return (
                                    <button
                                        key={option.label}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() => setActiveIndex(index)}
                                        className={cn(
                                            'group flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-[13px] font-semibold transition focus-visible:ring-2 focus-visible:ring-[#a7e33d]/45 focus-visible:outline-none',
                                            isActive
                                                ? 'border-[#a7e33d]/55 bg-[#a7e33d] text-black'
                                                : 'border-white/10 bg-white/4 text-white/68 hover:border-white/20 hover:bg-white/7 hover:text-white',
                                        )}
                                    >
                                        {t(option.label)}
                                        <ArrowRight
                                            className={cn(
                                                'size-4 shrink-0 transition group-hover:translate-x-0.5',
                                                isActive
                                                    ? 'text-black'
                                                    : 'text-[#a7e33d]',
                                            )}
                                            aria-hidden
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-[#0b0d0c]/92 p-5 sm:p-7 lg:p-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.label}
                                initial={
                                    reduce
                                        ? false
                                        : {
                                              opacity: 0,
                                              y: 12,
                                              filter: 'blur(8px)',
                                          }
                                }
                                animate={
                                    reduce
                                        ? undefined
                                        : {
                                              opacity: 1,
                                              y: 0,
                                              filter: 'blur(0px)',
                                          }
                                }
                                exit={
                                    reduce
                                        ? undefined
                                        : {
                                              opacity: 0,
                                              y: -8,
                                              filter: 'blur(6px)',
                                          }
                                }
                                transition={{
                                    duration: 0.34,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <div className="rounded-[18px] border border-white/10 bg-white/4 p-4">
                                        <Clock
                                            className="size-4 text-[#a7e33d]"
                                            aria-hidden
                                        />
                                        <div className="mt-3 text-[11px] text-white/42">
                                            {t('Estimasi awal')}
                                        </div>
                                        <div className="mt-1 text-[22px] font-semibold text-white">
                                            {t(active.estimate)}
                                        </div>
                                    </div>
                                    <div className="rounded-[18px] border border-white/10 bg-white/4 p-4">
                                        <Gauge
                                            className="size-4 text-gold"
                                            aria-hidden
                                        />
                                        <div className="mt-3 text-[11px] text-white/42">
                                            {t('Scope fit')}
                                        </div>
                                        <div className="mt-1 text-[22px] font-semibold text-white">
                                            {active.score}
                                        </div>
                                    </div>
                                    <div className="rounded-[18px] border border-white/10 bg-white/4 p-4">
                                        <GitBranch
                                            className="size-4 text-[#9ee5da]"
                                            aria-hidden
                                        />
                                        <div className="mt-3 text-[11px] text-white/42">
                                            {t('Route')}
                                        </div>
                                        <div className="mt-1 text-[22px] font-semibold text-white">
                                            {active.route.length} {t('step')}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.86fr]">
                                    <div>
                                        <div className="text-[11px] font-semibold tracking-[0.2em] text-white/36 uppercase">
                                            {t('Fokus awal')}
                                        </div>
                                        <p className="mt-3 text-[22px] leading-tight font-semibold tracking-tight text-white sm:text-[28px]">
                                            {t(active.intent)}
                                        </p>
                                        <p className="mt-4 text-[14px] leading-6 text-white/52">
                                            {t(active.output)}
                                        </p>
                                    </div>

                                    <div className="rounded-[20px] border border-white/10 bg-black/24 p-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-[11px] font-semibold tracking-[0.2em] text-white/36 uppercase">
                                                {t('Scope checkpoint')}
                                            </span>
                                            <span className="rounded-full bg-[#a7e33d]/12 px-2.5 py-1 text-[10px] font-semibold text-[#d2ed71]">
                                                {t('Ready to map')}
                                            </span>
                                        </div>
                                        <ul className="mt-4 space-y-3">
                                            {active.checks.map((check) => (
                                                <li
                                                    key={check}
                                                    className="flex items-center gap-2 text-[13px] text-white/66"
                                                >
                                                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#a7e33d] text-black">
                                                        <Check
                                                            className="size-3"
                                                            aria-hidden
                                                        />
                                                    </span>
                                                    {t(check)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-7 overflow-hidden rounded-[18px] border border-white/10">
                                    <ol className="grid gap-px bg-white/10 md:grid-cols-4">
                                        {active.route.map((step, index) => (
                                            <li
                                                key={step}
                                                className="bg-[#0d100f] px-4 py-4"
                                            >
                                                <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-[#a7e33d] uppercase">
                                                    0{index + 1}
                                                    <span className="h-px flex-1 bg-white/10" />
                                                </div>
                                                <div className="mt-3 text-[14px] font-semibold text-white/82">
                                                    {t(step)}
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </Reveal>
    );
}

function ServicesSection() {
    const reduce = useReducedMotion();
    const { t } = useTranslator();

    return (
        <section
            id="services"
            className="scroll-mt-32 px-5 pt-10 pb-12 text-white sm:px-8 md:pt-12 md:pb-14"
        >
            <div className="mx-auto max-w-340">
                <SectionHeader
                    eyebrow={t('Services')}
                    title={t(
                        'Web, mobile, network, server, dan security dalam satu scope.',
                    )}
                    description={t(
                        'Pilih kebutuhan yang paling dekat. Detail teknis tetap dirapikan saat discovery agar solusi tidak berlebihan.',
                    )}
                    titleClassName="max-w-5xl text-balance lg:text-[44px] xl:text-[50px] 2xl:text-[54px]"
                />

                <div className="mt-8 overflow-hidden rounded-[28px] border border-black/10 bg-[rgba(11,17,16,0.1)] shadow-[0_32px_110px_-78px_rgba(11,17,16,0.62)] md:mt-10 dark:border-white/10 dark:bg-[rgba(255,255,255,0.1)] dark:shadow-[0_32px_120px_-82px_rgba(167,227,61,0.35)]">
                    <div className="grid items-stretch gap-px md:grid-cols-2 xl:grid-cols-4">
                        {services.map((service, index) => {
                            const Icon = service.icon;

                            return (
                                <Reveal
                                    key={service.id}
                                    delay={index * 0.04}
                                    className="h-full"
                                >
                                    <motion.a
                                        href="#contact"
                                        whileHover={
                                            reduce
                                                ? undefined
                                                : { y: -3, scale: 1.004 }
                                        }
                                        transition={{
                                            duration: 0.35,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className="group flex h-full min-h-0 flex-col justify-between bg-white p-5 text-[#101511] transition hover:bg-[#fbfff1] focus-visible:ring-2 focus-visible:ring-[#a7e33d]/50 focus-visible:outline-none focus-visible:ring-inset sm:min-h-72 sm:p-6 xl:min-h-78 dark:bg-[#101311] dark:text-[#f5f8f1] dark:hover:bg-[#141814]"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between gap-4">
                                                <span
                                                    className={cn(
                                                        'flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br text-black',
                                                        serviceAccents[
                                                            index %
                                                                serviceAccents.length
                                                        ],
                                                    )}
                                                >
                                                    <Icon
                                                        className="size-5"
                                                        aria-hidden
                                                    />
                                                </span>
                                                <span className="rounded-full border border-black/10 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-black/42 uppercase dark:border-white/12 dark:text-[#c7d0bf]">
                                                    {t(service.badge)}
                                                </span>
                                            </div>
                                            <h3 className="mt-5 text-[21px] leading-[1.18] font-semibold tracking-tight text-[#101511] group-hover:text-[#5f8f12] sm:min-h-14 dark:text-[#f7faf3] dark:group-hover:text-[#d2ed71]">
                                                {t(service.title)}
                                            </h3>
                                            <p className="mt-2 line-clamp-3 text-[13px] leading-6 text-black/58 dark:text-[#b9c2b2]">
                                                {t(service.description)}
                                            </p>
                                            <ul className="mt-4 grid gap-2">
                                                {service.points.map((point) => (
                                                    <li
                                                        key={point}
                                                        className="flex items-center gap-2 text-[12px] leading-5 text-black/56 dark:text-[#c5cebd]"
                                                    >
                                                        <span className="size-1.5 shrink-0 rounded-full bg-[#a7e33d]" />
                                                        <span className="min-w-0">
                                                            {t(point)}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-[12px] font-semibold text-black/45 dark:border-white/10 dark:text-[#aeb8aa]">
                                            <span>{t('Konsultasi scope')}</span>
                                            <ArrowUpRight
                                                className="size-5 shrink-0 text-black/35 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#5f8f12] dark:text-[#9fa99a] dark:group-hover:text-[#a7e33d]"
                                                aria-hidden
                                            />
                                        </div>
                                    </motion.a>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

function SolutionDetailSection() {
    const [activeId, setActiveId] =
        useState<(typeof solutionTabs)[number]['id']>('web');
    const reduce = useReducedMotion();
    const { t } = useTranslator();
    const active =
        solutionTabs.find((solution) => solution.id === activeId) ??
        solutionTabs[0];
    const ActiveIcon = active.icon;
    const showSolution = (solutionId: (typeof solutionTabs)[number]['id']) => {
        if (solutionId === activeId) {
            return;
        }

        setActiveId(solutionId);
    };

    return (
        <section
            id="solutions"
            className="relative overflow-hidden px-2 py-10 text-white min-[390px]:px-3 sm:px-8 md:py-14"
        >
            <div className="mx-auto max-w-340">
                <div className="px-3 min-[390px]:px-2 sm:px-0">
                    <SectionKicker>{t('Solution detail')}</SectionKicker>
                    <Reveal>
                        <h2 className="mt-4 max-w-7xl text-[30px] leading-[1.12] font-semibold tracking-tight text-pretty sm:text-[52px] lg:text-[64px]">
                            {t(
                                'Web, mobile, network, server, CCTV, dan ISP dibuat rapi dari awal.',
                            )}
                        </h2>
                    </Reveal>
                </div>

                <Reveal className="mt-8">
                    <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#0d100f] shadow-[0_34px_120px_-72px_rgba(167,227,61,0.5)] sm:rounded-[28px]">
                        <div
                            className="grid grid-cols-2 gap-px bg-white/10 p-px sm:grid-cols-3 xl:grid-cols-6"
                            role="tablist"
                            aria-label={t('Pilih detail solusi IT')}
                        >
                            {solutionTabs.map((solution) => {
                                const Icon = solution.icon;
                                const isActive = solution.id === activeId;

                                return (
                                    <button
                                        key={solution.id}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() =>
                                            showSolution(solution.id)
                                        }
                                        className={cn(
                                            'group relative isolate flex min-h-15 items-center justify-between gap-2.5 overflow-hidden bg-[#101211] px-3 py-3 text-left transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#a7e33d]/50 focus-visible:outline-none min-[390px]:min-h-16 min-[390px]:gap-3 min-[390px]:px-4 sm:min-h-20 sm:gap-4 sm:px-5 sm:py-4',
                                            isActive
                                                ? 'text-black'
                                                : 'text-white hover:bg-[#151914]',
                                        )}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="solution-tab-active"
                                                aria-hidden
                                                className="absolute inset-0 -z-10 bg-[#a7e33d]"
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 260,
                                                    damping: 32,
                                                    mass: 0.8,
                                                }}
                                            />
                                        )}
                                        <span
                                            className={cn(
                                                'relative flex size-8.5 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 min-[390px]:size-9 sm:size-10 sm:rounded-[14px]',
                                                isActive
                                                    ? 'border-black/12 bg-black text-[#a7e33d]'
                                                    : 'border-white/10 bg-white/5 text-[#a7e33d]',
                                            )}
                                        >
                                            <Icon
                                                className="size-4.5"
                                                aria-hidden
                                            />
                                        </span>
                                        <span
                                            className={cn(
                                                'relative min-w-0 flex-1 text-[12px] leading-5 font-semibold wrap-anywhere transition-colors duration-300 min-[390px]:text-[13px] sm:text-[14px]',
                                                isActive
                                                    ? 'text-black'
                                                    : 'text-white',
                                            )}
                                        >
                                            {t(solution.label)}
                                        </span>
                                        <span
                                            className={cn(
                                                'relative hidden h-px w-6 transition-colors duration-300 2xl:block',
                                                isActive
                                                    ? 'bg-black/24'
                                                    : 'bg-white/14 group-hover:bg-[#a7e33d]/50',
                                            )}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.id}
                                initial={
                                    reduce
                                        ? false
                                        : {
                                              opacity: 0,
                                              y: 14,
                                              filter: 'blur(4px)',
                                          }
                                }
                                animate={
                                    reduce
                                        ? undefined
                                        : {
                                              opacity: 1,
                                              x: 0,
                                              filter: 'blur(0px)',
                                          }
                                }
                                exit={
                                    reduce
                                        ? undefined
                                        : {
                                              opacity: 0,
                                              y: -10,
                                              filter: 'blur(3px)',
                                          }
                                }
                                transition={{
                                    opacity: { duration: 0.22 },
                                    filter: { duration: 0.28 },
                                    y: {
                                        type: 'spring',
                                        stiffness: 220,
                                        damping: 30,
                                        mass: 0.9,
                                    },
                                }}
                                className="grid min-w-0 gap-px overflow-hidden bg-white/10 lg:grid-cols-[1.05fr_0.95fr]"
                            >
                                <div className="min-w-0 bg-[#0d100f] px-4 py-5 min-[390px]:p-5 sm:p-7 lg:p-9">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-[14px] bg-[#a7e33d] text-black sm:size-12 sm:rounded-2xl">
                                            <ActiveIcon
                                                className="size-4.5 sm:size-5"
                                                aria-hidden
                                            />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#a7e33d] uppercase">
                                                {t(active.eyebrow)}
                                            </p>
                                            <p className="mt-1 text-[12px] text-white/42">
                                                {t(active.imageMetric)}
                                            </p>
                                        </div>
                                    </div>

                                    <h3 className="mt-5 max-w-full text-[25px] leading-[1.14] font-semibold tracking-tight text-pretty wrap-anywhere text-white min-[390px]:text-[27px] sm:mt-7 sm:max-w-2xl sm:text-[46px]">
                                        {t(active.title)}
                                    </h3>
                                    <p className="mt-4 max-w-full text-[14px] leading-7 wrap-anywhere text-white/56 sm:mt-5 sm:max-w-xl sm:text-[15px]">
                                        {t(active.description)}
                                    </p>

                                    <div className="mt-6 grid gap-px overflow-hidden rounded-[18px] border border-black/10 bg-black/10 sm:mt-8 sm:rounded-[22px] md:grid-cols-2 dark:border-[#2d342f] dark:bg-[#2d342f]">
                                        <SolutionList
                                            title={t('Masalah')}
                                            items={active.problems}
                                            tone="muted"
                                        />
                                        <SolutionList
                                            title={t('Solusi')}
                                            items={active.solutions}
                                            tone="accent"
                                        />
                                    </div>

                                    <div className="mt-6 grid gap-px overflow-hidden rounded-[18px] border border-black/10 bg-black/10 sm:mt-8 sm:rounded-[22px] md:grid-cols-3 dark:border-[#2d342f] dark:bg-[#2d342f]">
                                        {active.packages.map((plan) => (
                                            <div
                                                key={plan.name}
                                                className="min-w-0 bg-white p-4 sm:p-5 dark:bg-[#141814]"
                                            >
                                                <h4 className="text-[15px] leading-snug font-semibold wrap-anywhere text-[#0b1110] dark:text-white">
                                                    {t(plan.name)}
                                                </h4>
                                                <ul className="mt-4 space-y-2">
                                                    {plan.points.map(
                                                        (point) => (
                                                            <li
                                                                key={point}
                                                                className="flex min-w-0 gap-2 text-[12px] leading-5 wrap-anywhere text-black/56 dark:text-white/52"
                                                            >
                                                                <Check
                                                                    className="mt-0.5 size-3.5 shrink-0 text-[#a7e33d]"
                                                                    aria-hidden
                                                                />
                                                                {t(point)}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="min-w-0 bg-white p-4 min-[390px]:p-5 sm:p-7 lg:p-9 dark:bg-[#101211]">
                                    <div className="overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_28px_110px_-72px_rgba(11,17,16,0.58)] sm:rounded-3xl dark:border-white/10 dark:bg-[#060907] dark:shadow-[0_28px_110px_-72px_rgba(167,227,61,0.5)]">
                                        <div className="relative aspect-3/2 min-h-58 overflow-hidden bg-black sm:min-h-80 lg:min-h-100">
                                            {active.imageSrc ? (
                                                <motion.img
                                                    key={active.imageSrc}
                                                    src={active.imageSrc}
                                                    alt={t(active.imageAlt)}
                                                    className="absolute inset-0 h-full w-full object-contain"
                                                    loading="lazy"
                                                    initial={
                                                        reduce
                                                            ? false
                                                            : {
                                                                  opacity: 0,
                                                              }
                                                    }
                                                    animate={
                                                        reduce
                                                            ? undefined
                                                            : {
                                                                  opacity: 1,
                                                              }
                                                    }
                                                    transition={{
                                                        opacity: {
                                                            duration: 0.7,
                                                            ease: [
                                                                0.22, 1, 0.36,
                                                                1,
                                                            ],
                                                        },
                                                        ease: 'easeInOut',
                                                    }}
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(167,227,61,0.18),transparent_34%),linear-gradient(135deg,#101511,#171d18_48%,#0b0f0c)]" />
                                            )}
                                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,4,0.02)_0%,rgba(3,5,4,0.1)_62%,rgba(3,5,4,0.34)_100%),radial-gradient(circle_at_20%_14%,rgba(167,227,61,0.18),transparent_34%)]" />
                                            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#a7e33d] to-transparent" />

                                            <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-4 sm:inset-x-7 sm:top-7">
                                                <div className="rounded-full border border-white/16 bg-black/34 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-white/78 uppercase shadow-[0_18px_60px_-36px_rgba(0,0,0,0.9)] backdrop-blur-md">
                                                    {t(active.imageLabel)}
                                                </div>
                                                <span className="hidden size-12 items-center justify-center rounded-full bg-[#a7e33d] text-black shadow-[0_0_44px_rgba(167,227,61,0.34)] sm:flex">
                                                    <ActiveIcon
                                                        className="size-5"
                                                        aria-hidden
                                                    />
                                                </span>
                                            </div>
                                        </div>

                                        <div className="border-t border-black/10 bg-[radial-gradient(circle_at_16%_0%,rgba(167,227,61,0.12),transparent_34%),linear-gradient(180deg,#ffffff,#f7faf2)] p-5 sm:p-6 dark:border-white/10 dark:bg-[radial-gradient(circle_at_16%_0%,rgba(167,227,61,0.16),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))]">
                                            <p className="text-[26px] leading-[1.08] font-semibold tracking-tight text-[#0b1110] sm:text-[38px] dark:text-white">
                                                {t(active.label)} {t('ready')}
                                            </p>
                                            <div className="mt-5 grid gap-2">
                                                {active.solutions
                                                    .slice(0, 3)
                                                    .map((item, index) => (
                                                        <div
                                                            key={item}
                                                            className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-[0_16px_60px_-48px_rgba(11,17,16,0.55)] dark:border-white/12 dark:bg-neutral-950/28 dark:shadow-[0_16px_60px_-42px_rgba(0,0,0,0.9)]"
                                                        >
                                                            <span className="text-[13px] text-black/68 dark:text-white/78">
                                                                {t(item)}
                                                            </span>
                                                            <span className="font-mono text-[11px] text-[#a7e33d]">
                                                                0{index + 1}
                                                            </span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </Reveal>

                <div className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
                    {portfolioSnapshots.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <Reveal
                                key={item.title}
                                delay={index * 0.05}
                                className="bg-[#111312] p-6"
                            >
                                <Icon
                                    className="size-5 text-[#a7e33d]"
                                    aria-hidden
                                />
                                <h3 className="mt-5 text-[21px] leading-tight font-semibold tracking-tight">
                                    {t(item.title)}
                                </h3>
                                <p className="mt-3 text-[14px] leading-6 text-white/52">
                                    {t(item.detail)}
                                </p>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function SolutionList({
    title,
    items,
    tone,
}: {
    title: string;
    items: readonly string[];
    tone: 'muted' | 'accent';
}) {
    const { t } = useTranslator();

    return (
        <div className="min-w-0 bg-white p-4 sm:p-5 dark:bg-[#141814]">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-black/34 uppercase dark:text-white/34">
                {t(title)}
            </p>
            <ul className="mt-4 space-y-3">
                {items.map((item) => (
                    <li
                        key={item}
                        className="flex min-w-0 items-start gap-3 text-[13px] leading-6 wrap-anywhere text-black/62 dark:text-white/62"
                    >
                        <span
                            className={cn(
                                'mt-2 size-1.5 rounded-full',
                                tone === 'accent'
                                    ? 'bg-[#a7e33d]'
                                    : 'bg-black/30 dark:bg-white/30',
                            )}
                        />
                        {t(item)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ProcessSection() {
    const { t } = useTranslator();

    return (
        <section
            id="process"
            className="px-5 py-10 text-white sm:px-8 md:py-14"
        >
            <div className="mx-auto grid max-w-340 gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                <div className="lg:sticky lg:top-36 lg:self-start">
                    <SectionKicker>{t('Process')}</SectionKicker>
                    <Reveal>
                        <h2 className="mt-4 max-w-xl text-[36px] leading-[1.14] font-semibold tracking-tight text-balance sm:text-[64px]">
                            {t('Cara kerja jelas dari survey sampai support.')}
                        </h2>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <p className="mt-6 max-w-sm text-[15px] leading-7 text-white/55">
                            {t(
                                'Kebutuhan dipetakan, instalasi atau development berjalan bertahap, lalu ditutup dengan QA dan handover.',
                            )}
                        </p>
                    </Reveal>
                    <a
                        href="#contact"
                        className="group mt-8 inline-flex h-12 w-fit items-center justify-center self-start rounded-xl bg-white px-7 text-[14px] font-semibold text-black transition hover:bg-[#d2ed71] focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:outline-none"
                    >
                        <LetterSwap3D>
                            {t('Diskusi kebutuhan awal')}
                        </LetterSwap3D>
                    </a>
                </div>

                <ProcessTimeline />
            </div>
        </section>
    );
}

function ProcessTimeline() {
    const timelineRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start 72%', 'end 44%'],
    });
    const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div className="pt-1">
            <div ref={timelineRef} className="relative">
                <div
                    className="pointer-events-none absolute top-21 bottom-21 left-6 w-px -translate-x-1/2 overflow-hidden bg-white/12 sm:top-23 sm:bottom-23 sm:left-8 lg:top-21 lg:bottom-21 lg:left-9"
                    aria-hidden
                >
                    <motion.div
                        style={reduce ? undefined : { scaleY: progressScale }}
                        className="h-full w-px origin-top bg-[#a7e33d]"
                    />
                </div>

                <ol className="relative">
                    {processSteps.map((step, index) => (
                        <ProcessTimelineStep
                            key={step.number}
                            step={step}
                            index={index}
                            isFirst={index === 0}
                            isLast={index === processSteps.length - 1}
                            stepCount={processSteps.length}
                            timelineProgress={scrollYProgress}
                        />
                    ))}
                </ol>
            </div>
        </div>
    );
}

function ProcessTimelineStep({
    step,
    index,
    isFirst,
    isLast,
    stepCount,
    timelineProgress,
}: {
    step: (typeof processSteps)[number];
    index: number;
    isFirst: boolean;
    isLast: boolean;
    stepCount: number;
    timelineProgress: MotionValue<number>;
}) {
    const reduce = useReducedMotion();
    const { resolvedAppearance } = useAppearance();
    const { t } = useTranslator();
    const isLightMode = resolvedAppearance === 'light';
    const Icon = processIcons[index] ?? Sparkles;
    const inactiveIconBackground = isLightMode ? '#f9fbf2' : '#0c0f0d';
    const inactiveIconColor = isLightMode
        ? 'rgba(11,17,16,0.66)'
        : 'rgba(255,255,255,0.68)';
    const inactiveIconBorder = isLightMode
        ? 'rgba(11,17,16,0.14)'
        : 'rgba(255,255,255,0.13)';
    const inactiveNumberColor = isLightMode
        ? 'rgba(11,17,16,0.34)'
        : 'rgba(255,255,255,0.36)';
    const lineReachPoint =
        index === 0
            ? 0
            : index === stepCount - 1
              ? 1
              : Math.max(0, index / Math.max(1, stepCount - 1) - 0.035);
    const iconProgress = useTransform(
        timelineProgress,
        [
            Math.max(0, lineReachPoint - 0.018),
            Math.min(1, lineReachPoint + 0.018),
        ],
        [0, 1],
    );
    const iconBackground = useTransform(
        iconProgress,
        [0, 1],
        [inactiveIconBackground, '#a7e33d'],
    );
    const iconColor = useTransform(
        iconProgress,
        [0, 1],
        [inactiveIconColor, '#050605'],
    );
    const iconBorder = useTransform(
        iconProgress,
        [0, 1],
        [inactiveIconBorder, 'rgba(167,227,61,0.95)'],
    );
    const iconShadow = useTransform(
        iconProgress,
        [0, 1],
        ['0 0 0 rgba(167,227,61,0)', '0 0 34px rgba(167,227,61,0.24)'],
    );
    const numberColor = useTransform(
        iconProgress,
        [0, 1],
        [inactiveNumberColor, '#a7e33d'],
    );

    return (
        <li className="relative grid min-h-28 grid-cols-[44px_minmax(0,1fr)] gap-x-4 py-4 sm:min-h-32 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-x-7 sm:py-5 lg:min-h-28 lg:grid-cols-[72px_220px_minmax(260px,1fr)] lg:gap-x-7 lg:py-4">
            {!isLast && (
                <span
                    className="pointer-events-none absolute right-0 bottom-0 left-17 h-px bg-white/10 sm:left-23 lg:left-31.75"
                    aria-hidden
                />
            )}

            <div className="relative col-start-1 row-span-2 flex min-h-20 items-center justify-center sm:min-h-24 lg:col-start-1 lg:row-span-1 lg:min-h-20">
                <motion.span
                    style={
                        reduce || isFirst
                            ? {
                                  backgroundColor: '#a7e33d',
                                  borderColor: 'rgba(167,227,61,0.95)',
                                  boxShadow: '0 0 34px rgba(167,227,61,0.24)',
                                  color: '#050605',
                              }
                            : {
                                  backgroundColor: iconBackground,
                                  borderColor: iconBorder,
                                  boxShadow: iconShadow,
                                  color: iconColor,
                              }
                    }
                    className="relative z-10 flex size-10 items-center justify-center rounded-full border text-white/70 sm:size-14"
                >
                    <Icon
                        className="size-4 sm:size-5"
                        strokeWidth={2.2}
                        aria-hidden
                    />
                    <span className="sr-only">
                        {t('Step')} {step.number}
                    </span>
                </motion.span>
            </div>

            <Reveal
                delay={0.04 + index * 0.04}
                className="col-start-2 row-start-1 self-center lg:col-start-2 lg:row-start-1"
            >
                <motion.span
                    style={
                        reduce || isFirst
                            ? { color: '#a7e33d' }
                            : { color: numberColor }
                    }
                    className="text-[11px] font-semibold tracking-[0.18em]"
                >
                    {step.number}
                </motion.span>
                <h3 className="mt-2 text-[24px] leading-tight font-semibold sm:text-[34px]">
                    {t(step.title)}
                </h3>
            </Reveal>

            <Reveal
                delay={0.08 + index * 0.04}
                className="col-start-2 row-start-2 mt-4 self-center lg:col-start-3 lg:row-start-1 lg:mt-0"
            >
                <p className="max-w-xl text-[15px] leading-7 text-white/58">
                    {t(step.description)}
                </p>
            </Reveal>
        </li>
    );
}

function TeamSection() {
    const defaultTeamMember = Math.max(
        0,
        teamMembers.findIndex((teamMember) => teamMember.photo),
    );
    const [activeMember, setActiveMember] = useState(defaultTeamMember);
    const reduce = useReducedMotion();
    const { t } = useTranslator();
    const member = teamMembers[activeMember] ?? teamMembers[0];
    const memberIndexLabel = String(activeMember + 1).padStart(2, '0');
    const memberCountLabel = String(teamMembers.length).padStart(2, '0');
    const panelAccent = '#101511';

    const goToMember = (index: number) => {
        const nextIndex = (index + teamMembers.length) % teamMembers.length;

        setActiveMember(nextIndex);
    };

    const goToPrevious = () => goToMember(activeMember - 1);
    const goToNext = () => goToMember(activeMember + 1);

    return (
        <section
            id="team"
            className="relative overflow-hidden px-5 py-10 text-white sm:px-8 md:py-14"
        >
            <div className="mx-auto max-w-340">
                <div>
                    <div>
                        <SectionKicker>{t('Team')}</SectionKicker>
                        <SplitHeading
                            text={t('Tim yang terlibat di Solvara Studio')}
                            className="mt-4 max-w-none text-[32px] leading-[1.14] font-semibold tracking-tight text-balance sm:text-[52px] lg:text-[56px] lg:text-nowrap xl:text-[60px] 2xl:text-[64px]"
                        />
                    </div>
                </div>

                <MobileTeamCard
                    member={member}
                    activeMember={activeMember}
                    onSelect={goToMember}
                    onPrevious={goToPrevious}
                    onNext={goToNext}
                />

                <Reveal className="mt-8 hidden lg:block">
                    <div
                        className="relative overflow-hidden rounded-3xl border border-black/10 bg-[#a7e33d] text-black shadow-[0_34px_120px_-58px_rgba(65,86,12,0.55)]"
                        style={
                            {
                                '--team-accent': panelAccent,
                            } as CSSProperties
                        }
                    >
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--team-accent) to-transparent opacity-80"
                        />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.2),transparent_34%,rgba(0,0,0,0.055)_74%,transparent)]"
                        />
                        <TeamCodeBackdrop
                            member={member}
                            reduce={Boolean(reduce)}
                        />
                        <div className="relative z-10 p-5 sm:p-7 lg:p-10">
                            <div className="flex flex-col gap-4 border-b border-black/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-4">
                                    <span
                                        className="text-[12px] font-semibold tracking-[0.22em] uppercase"
                                        style={{ color: panelAccent }}
                                    >
                                        {memberIndexLabel}/{memberCountLabel}
                                    </span>
                                    <span className="h-px w-14 bg-black/18" />
                                    <span className="text-[12px] font-semibold tracking-[0.18em] text-black/45 uppercase">
                                        {t(member.badge)}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={goToPrevious}
                                        aria-label={t(
                                            'Lihat anggota sebelumnya',
                                        )}
                                        className="inline-flex size-11 items-center justify-center rounded-full border border-black/15 bg-black/5 text-black transition hover:border-(--team-accent) hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:outline-none"
                                    >
                                        <ArrowLeft
                                            className="size-4"
                                            aria-hidden
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={goToNext}
                                        aria-label={t(
                                            'Lihat anggota berikutnya',
                                        )}
                                        className="inline-flex size-11 items-center justify-center rounded-full border border-black/15 bg-black/5 text-black transition hover:border-(--team-accent) hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:outline-none"
                                    >
                                        <ArrowRight
                                            className="size-4"
                                            aria-hidden
                                        />
                                    </button>
                                </div>
                            </div>

                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={member.name}
                                    drag={reduce ? false : 'x'}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.08}
                                    onDragEnd={(_, info) => {
                                        if (info.offset.x <= -70) {
                                            goToNext();
                                        }

                                        if (info.offset.x >= 70) {
                                            goToPrevious();
                                        }
                                    }}
                                    initial={
                                        reduce ? false : { opacity: 0, x: 34 }
                                    }
                                    animate={
                                        reduce
                                            ? { opacity: 1 }
                                            : { opacity: 1, x: 0 }
                                    }
                                    exit={
                                        reduce
                                            ? { opacity: 0 }
                                            : { opacity: 0, x: -34 }
                                    }
                                    transition={{
                                        duration: 0.42,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="grid cursor-grab gap-8 pt-7 active:cursor-grabbing lg:grid-cols-[minmax(0,0.95fr)_minmax(390px,0.72fr)] lg:items-center lg:gap-14 lg:pt-10 xl:grid-cols-[minmax(0,0.92fr)_minmax(440px,0.7fr)]"
                                >
                                    <div className="min-w-0">
                                        <p
                                            className="text-[12px] font-semibold tracking-[0.2em] uppercase"
                                            style={{ color: panelAccent }}
                                        >
                                            {t(member.role)}
                                        </p>
                                        <h3 className="mt-4 max-w-4xl text-[30px] leading-[1.14] font-semibold tracking-tight text-balance sm:text-[48px] lg:text-[62px]">
                                            {member.name}
                                        </h3>
                                        <p className="mt-6 max-w-3xl text-[17px] leading-7 text-black/72 sm:mt-8 sm:text-[26px] sm:leading-10">
                                            {t(member.statement)}
                                        </p>
                                        <div className="mt-8 max-w-3xl border-t border-black/10 pt-6">
                                            <p className="text-[11px] font-semibold tracking-[0.18em] text-black/42 uppercase">
                                                {t('Area fokus')}
                                            </p>
                                            <p className="mt-3 text-[15px] leading-7 text-black/60">
                                                {t(member.focus)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-6 border-t border-black/10 pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                                        <div className="relative mx-auto aspect-[0.72/1] w-full max-w-37.5 overflow-hidden rounded-full border border-black/12 bg-black/10 shadow-[0_28px_80px_-48px_rgba(0,0,0,0.72)] sm:max-w-45 lg:max-w-51.25 xl:max-w-57.5">
                                            {member.photo ? (
                                                <img
                                                    src={member.photo}
                                                    alt={`Portrait ${member.name}`}
                                                    className="h-full w-full object-cover"
                                                    style={{
                                                        objectPosition:
                                                            member.photoPosition,
                                                    }}
                                                />
                                            ) : (
                                                <div
                                                    className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_25%,rgba(0,0,0,0.13),transparent_32%),linear-gradient(145deg,rgba(255,255,255,0.22),rgba(0,0,0,0.05))] text-[72px] font-semibold tracking-tight sm:text-[96px]"
                                                    style={{
                                                        color: panelAccent,
                                                    }}
                                                    aria-hidden
                                                >
                                                    {member.initials}
                                                </div>
                                            )}
                                            <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-black/14 ring-inset" />
                                        </div>

                                        <dl className="grid gap-x-7 gap-y-4 border-t border-black/10 pt-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                                            {member.impact.map(
                                                ([label, value]) => (
                                                    <div
                                                        key={label}
                                                        className="min-w-0"
                                                    >
                                                        <dt className="text-[10px] font-semibold tracking-[0.18em] text-black/42 uppercase">
                                                            {t(label)}
                                                        </dt>
                                                        <dd className="mt-2 text-[13px] leading-5 text-black/72">
                                                            {t(value)}
                                                        </dd>
                                                    </div>
                                                ),
                                            )}
                                        </dl>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            <div className="mt-8 flex items-center justify-between gap-5 border-t border-black/10 pt-5">
                                <div
                                    className="flex items-center gap-2"
                                    role="tablist"
                                    aria-label={t('Pilih anggota tim')}
                                >
                                    {teamMembers.map((item, index) => {
                                        const isActive = index === activeMember;

                                        return (
                                            <button
                                                key={item.name}
                                                type="button"
                                                role="tab"
                                                aria-selected={isActive}
                                                aria-label={`${t('Lihat')} ${item.name}`}
                                                onClick={() =>
                                                    goToMember(index)
                                                }
                                                className="group flex h-8 items-center gap-2 rounded-full px-1.5 transition focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:outline-none"
                                            >
                                                <span
                                                    className="block h-2.5 rounded-full transition-all"
                                                    style={{
                                                        width: isActive
                                                            ? 34
                                                            : 10,
                                                        backgroundColor:
                                                            isActive
                                                                ? panelAccent
                                                                : 'rgba(0,0,0,0.24)',
                                                    }}
                                                />
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="hidden h-px flex-1 bg-linear-to-r from-black/18 via-black/6 to-transparent sm:block" />
                                <span className="text-right text-[11px] font-semibold tracking-[0.18em] text-black/42 uppercase">
                                    Solvara Studio
                                </span>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

function MobileTeamCard({
    member,
    activeMember,
    onSelect,
    onPrevious,
    onNext,
}: {
    member: TeamMember;
    activeMember: number;
    onSelect: (index: number) => void;
    onPrevious: () => void;
    onNext: () => void;
}) {
    const { t } = useTranslator();

    return (
        <div className="mt-8 lg:hidden">
            <article className="rounded-[28px] border border-white/10 bg-[#111312] p-6 text-white shadow-[0_28px_90px_-62px_rgba(167,227,61,0.38)]">
                <span className="inline-flex rounded-full bg-black px-4 py-2 text-[12px] font-semibold tracking-[0.14em] text-[#a7e33d] uppercase">
                    {t(member.badge)}
                </span>

                <h3 className="mt-7 text-[32px] leading-tight font-semibold tracking-tight text-white">
                    {member.name}
                </h3>

                <p className="mt-6 text-[20px] leading-9 text-white/72">
                    “{t(member.statement)}”
                </p>

                <div className="mt-8 flex items-center gap-4">
                    <div className="size-14 overflow-hidden rounded-full border border-white/12 bg-white/8">
                        {member.photo ? (
                            <img
                                src={member.photo}
                                alt={`Portrait ${member.name}`}
                                className="h-full w-full object-cover"
                                style={{
                                    objectPosition: member.photoPosition,
                                }}
                                loading="lazy"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-[18px] font-semibold text-[#a7e33d]">
                                {member.initials}
                            </div>
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="text-[18px] leading-tight font-semibold text-white">
                            {member.name}
                        </p>
                        <p className="mt-1 text-[14px] text-white/48">
                            {t(member.role)}
                        </p>
                    </div>
                </div>

                <p className="mt-8 text-[13px] font-semibold tracking-[0.18em] text-white/30 uppercase">
                    Solvara Studio
                </p>
            </article>

            <div className="mt-7 flex items-center justify-between gap-5">
                <div
                    className="flex items-center gap-3"
                    role="tablist"
                    aria-label={t('Pilih anggota tim')}
                >
                    {teamMembers.map((item, index) => {
                        const isActive = index === activeMember;

                        return (
                            <button
                                key={item.name}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                aria-label={`${t('Lihat')} ${item.name}`}
                                onClick={() => onSelect(index)}
                                className="rounded-full focus-visible:ring-2 focus-visible:ring-[#a7e33d]/50 focus-visible:outline-none"
                            >
                                <span
                                    className={cn(
                                        'block h-2.5 rounded-full transition-all',
                                        isActive
                                            ? 'w-13 bg-white'
                                            : 'w-2.5 bg-white/24',
                                    )}
                                />
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onPrevious}
                        aria-label={t('Lihat anggota sebelumnya')}
                        className="inline-flex size-13 items-center justify-center rounded-full bg-white/8 text-white transition hover:bg-[#a7e33d] hover:text-black focus-visible:ring-2 focus-visible:ring-[#a7e33d]/50 focus-visible:outline-none"
                    >
                        <ArrowLeft className="size-5" aria-hidden />
                    </button>
                    <button
                        type="button"
                        onClick={onNext}
                        aria-label={t('Lihat anggota berikutnya')}
                        className="inline-flex size-13 items-center justify-center rounded-full bg-white/8 text-white transition hover:bg-[#a7e33d] hover:text-black focus-visible:ring-2 focus-visible:ring-[#a7e33d]/50 focus-visible:outline-none"
                    >
                        <ArrowRight className="size-5" aria-hidden />
                    </button>
                </div>
            </div>
        </div>
    );
}

function TeamCodeBackdrop({
    member,
    reduce,
}: {
    member: TeamMember;
    reduce: boolean;
}) {
    const codeBackdrop =
        member.badge === 'Network Layer'
            ? {
                  primaryTitle: 'resources/network/solvara-topology.ts',
                  secondaryTitle: 'resources/network/noc-monitoring.ts',
                  lines: networkTeamCodeLines,
              }
            : member.badge === 'Mobile Flow'
              ? {
                    primaryTitle: 'resources/mobile/solvara-app-flow.tsx',
                    secondaryTitle: 'resources/mobile/device-quality.ts',
                    lines: mobileTeamCodeLines,
                }
              : member.badge === 'Web Platform'
                ? {
                      primaryTitle: 'resources/js/pages/welcome.tsx',
                      secondaryTitle: 'resources/js/solvara-web-flow.ts',
                      lines: webTeamCodeLines,
                  }
                : null;

    if (!codeBackdrop) {
        return null;
    }

    const secondaryLines = codeBackdrop.lines
        .slice(18)
        .concat(codeBackdrop.lines.slice(0, 18));

    return (
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(255,255,255,0.24),transparent_30%),linear-gradient(90deg,rgba(167,227,61,0.92)_0%,rgba(167,227,61,0.76)_34%,rgba(15,21,17,0.22)_100%)]" />
            <div className="absolute inset-y-0 right-0 w-full bg-[linear-gradient(90deg,rgba(167,227,61,0.98)_0%,rgba(167,227,61,0.82)_28%,rgba(9,13,10,0.24)_100%)] lg:w-[68%]" />
            <div className="absolute inset-y-0 right-0 w-full opacity-80 lg:w-[70%]">
                <div className="grid h-full grid-cols-1 gap-3 px-5 py-8 font-mono text-[10px] leading-[1.75] font-medium text-white sm:text-[11px] lg:grid-cols-[1.05fr_0.95fr] lg:px-8 xl:text-[12px]">
                    <CodeWindow
                        title={codeBackdrop.primaryTitle}
                        lines={codeBackdrop.lines}
                        reduce={reduce}
                    />
                    <CodeWindow
                        title={codeBackdrop.secondaryTitle}
                        lines={secondaryLines}
                        reduce={reduce}
                        startDelay={900}
                        muted
                    />
                </div>
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(167,227,61,0.99)_0%,rgba(167,227,61,0.94)_42%,rgba(167,227,61,0.48)_62%,transparent_82%)]" />
            <motion.div
                className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-white/70 to-transparent opacity-50"
                animate={reduce ? undefined : { x: ['-80%', '80%'] }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
}

function CodeWindow({
    title,
    lines,
    muted = false,
    reduce = false,
    startDelay = 0,
}: {
    title: string;
    lines: readonly string[];
    muted?: boolean;
    reduce?: boolean;
    startDelay?: number;
}) {
    const totalCharacters = lines.reduce(
        (total, line) => total + line.length + 1,
        0,
    );
    const pauseCharacters = 280;
    const [typedCharacters, setTypedCharacters] = useState(
        reduce ? totalCharacters : 0,
    );
    const visibleCharacters = reduce
        ? totalCharacters
        : Math.min(typedCharacters, totalCharacters);

    useEffect(() => {
        if (reduce) {
            setTypedCharacters(totalCharacters);

            return;
        }

        setTypedCharacters(0);

        let interval: number | undefined;
        const timeout = window.setTimeout(() => {
            interval = window.setInterval(() => {
                setTypedCharacters((current) => {
                    if (current >= totalCharacters + pauseCharacters) {
                        return 0;
                    }

                    return current + 2;
                });
            }, 58);
        }, startDelay);

        return () => {
            window.clearTimeout(timeout);

            if (interval) {
                window.clearInterval(interval);
            }
        };
    }, [pauseCharacters, reduce, startDelay, totalCharacters]);

    const getVisibleLine = (lineIndex: number) => {
        const usedBeforeLine = lines
            .slice(0, lineIndex)
            .reduce((total, line) => total + line.length + 1, 0);
        const remainingCharacters = visibleCharacters - usedBeforeLine;

        if (remainingCharacters <= 0) {
            return '';
        }

        return lines[lineIndex].slice(0, remainingCharacters);
    };

    const getCursorLine = () => {
        let usedCharacters = 0;

        for (let index = 0; index < lines.length; index += 1) {
            const nextUsedCharacters = usedCharacters + lines[index].length + 1;

            if (visibleCharacters <= nextUsedCharacters) {
                return index;
            }

            usedCharacters = nextUsedCharacters;
        }

        return lines.length - 1;
    };

    const cursorLine = getCursorLine();
    const visibleLineCount = muted ? 20 : 24;
    const firstVisibleLine = Math.max(
        0,
        Math.min(cursorLine - 6, Math.max(0, lines.length - visibleLineCount)),
    );
    const visibleLines = lines.slice(
        firstVisibleLine,
        firstVisibleLine + visibleLineCount,
    );

    return (
        <div
            className={cn(
                'overflow-hidden rounded-2xl border border-white/18 bg-black/24 shadow-[0_28px_100px_-72px_rgba(0,0,0,0.8)] backdrop-blur-[2px]',
                muted && 'hidden opacity-70 lg:block',
            )}
        >
            <div className="flex items-center justify-between border-b border-white/12 px-4 py-3 text-white/60">
                <span className="truncate text-[9px] font-semibold tracking-[0.18em] uppercase">
                    {title}
                </span>
                <span className="size-2 rounded-full bg-white/70" />
            </div>
            <pre className="max-h-105 overflow-hidden px-4 py-4 text-white/80">
                {visibleLines.map((line, visibleIndex) => {
                    const index = firstVisibleLine + visibleIndex;
                    const visibleLine = getVisibleLine(index);
                    const lineIsActive =
                        !reduce &&
                        index === cursorLine &&
                        typedCharacters <= totalCharacters;

                    return (
                        <code key={`${line}-${index}`} className="block">
                            <span className="mr-4 inline-block w-6 text-right text-white/38">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <span
                                className={cn(
                                    line.trim().startsWith('const') ||
                                        line.trim().startsWith('function') ||
                                        line.trim().startsWith('export')
                                        ? 'text-white'
                                        : 'text-white/68',
                                )}
                            >
                                {visibleLine || ' '}
                            </span>
                            {lineIsActive && (
                                <motion.span
                                    className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-white/80"
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />
                            )}
                        </code>
                    );
                })}
            </pre>
        </div>
    );
}

function SelectedWorkSection() {
    const reduce = useReducedMotion();
    const { t } = useTranslator();

    return (
        <section
            id="work"
            className="px-5 py-10 text-[#0b1110] sm:px-8 md:py-14 dark:text-white"
        >
            <div className="mx-auto max-w-340">
                <div className="overflow-hidden rounded-3xl border border-black/10 bg-[rgba(11,17,16,0.1)] shadow-[0_30px_110px_-82px_rgba(11,17,16,0.55)] dark:border-white/10 dark:bg-[#2d342f] dark:shadow-[0_34px_120px_-82px_rgba(0,0,0,0.75)]">
                    <div className="bg-white p-5 sm:p-8 md:p-10 dark:bg-[#0d100f]">
                        <SectionHeader
                            eyebrow={t('Selected work')}
                            title={t(
                                'Project real yang rapi dan siap dikembangkan.',
                            )}
                            titleClassName="max-w-none lg:text-nowrap"
                        />

                        <Reveal className="mt-7 flex justify-end">
                            <Link
                                href={projectsIndex.url()}
                                className="group inline-flex h-11 w-fit items-center gap-2 rounded-xl border border-black/10 px-4 text-[13px] font-semibold text-black/72 transition hover:border-[#a7e33d]/45 hover:bg-black/4 hover:text-black focus-visible:ring-2 focus-visible:ring-[#a7e33d]/50 focus-visible:outline-none dark:border-white/12 dark:text-white dark:hover:bg-white/6"
                            >
                                <LetterSwap3D>
                                    {t('Semua Project')}
                                </LetterSwap3D>
                                <ArrowUpRight
                                    className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    aria-hidden
                                />
                            </Link>
                        </Reveal>
                    </div>

                    <div className="grid gap-px md:grid-cols-2">
                        {works.map((work, index) => (
                            <Reveal
                                key={work.number}
                                delay={index * 0.05}
                                className="h-full"
                            >
                                <motion.article
                                    className="group h-full bg-white p-4 transition hover:bg-[#fbfff1] dark:bg-[#111312] dark:hover:bg-[#141814]"
                                    whileHover={
                                        reduce
                                            ? undefined
                                            : { y: -5, rotateX: 1.2 }
                                    }
                                    transition={{
                                        duration: 0.38,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <Link
                                        href={projectShow.url(work.slug)}
                                        className="block focus-visible:ring-2 focus-visible:ring-[#a7e33d]/50 focus-visible:outline-none"
                                    >
                                        <ProjectSnapshot
                                            work={work}
                                            index={index}
                                        />
                                    </Link>
                                    <div className="mt-5 px-1 pb-2">
                                        <div className="flex items-center gap-2 text-[11px] tracking-[0.18em] text-black/42 uppercase dark:text-white/42">
                                            <span className="text-[#67a500] dark:text-[#a7e33d]">
                                                {work.number}
                                            </span>
                                            <span className="size-1 rounded-full bg-black/18 dark:bg-white/20" />
                                            {t(work.category)}
                                        </div>
                                        <div className="mt-2 flex items-start justify-between gap-4">
                                            <h3 className="text-[30px] leading-[1.14] font-semibold tracking-tight text-[#0b1110] group-hover:text-[#5f8f12] dark:text-white dark:group-hover:text-[#d2ed71]">
                                                {work.name}
                                            </h3>
                                            <ArrowUpRight
                                                className="mt-2 size-5 text-black/35 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#5f8f12] dark:text-white/38 dark:group-hover:text-[#a7e33d]"
                                                aria-hidden
                                            />
                                        </div>
                                        <p className="mt-4 text-[14px] leading-6 text-black/58 dark:text-white/58">
                                            {t(work.summary)}
                                        </p>
                                        <dl className="mt-5 grid gap-4 border-t border-black/10 pt-5 text-[13px] leading-6 text-black/58 sm:grid-cols-2 dark:border-white/10 dark:text-white/58">
                                            <div>
                                                <dt className="mb-1 text-[10px] tracking-[0.2em] text-black/34 uppercase dark:text-white/34">
                                                    {t('Tantangan')}
                                                </dt>
                                                <dd>{t(work.challenge)}</dd>
                                            </div>
                                            <div>
                                                <dt className="mb-1 text-[10px] tracking-[0.2em] text-black/34 uppercase dark:text-white/34">
                                                    {t('Hasil')}
                                                </dt>
                                                <dd>{t(work.result)}</dd>
                                            </div>
                                        </dl>
                                        <ul className="mt-5 flex flex-wrap gap-2">
                                            {work.stack.map((item) => (
                                                <li
                                                    key={item}
                                                    className="rounded-full border border-black/10 px-3 py-1 text-[11px] text-black/54 dark:border-white/10 dark:text-white/54"
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                            <Link
                                                href={projectShow.url(
                                                    work.slug,
                                                )}
                                                className="group/link inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white text-[13px] font-semibold text-black shadow-sm transition hover:bg-[#d2ed71] focus-visible:ring-2 focus-visible:ring-[#a7e33d]/45 focus-visible:outline-none dark:border-transparent dark:shadow-none dark:focus-visible:ring-white/30"
                                            >
                                                <LetterSwap3D>
                                                    {t('Detail Project')}
                                                </LetterSwap3D>
                                                <ArrowRight
                                                    className="size-4 transition group-hover/link:translate-x-0.5"
                                                    aria-hidden
                                                />
                                            </Link>
                                            <a
                                                href={work.liveUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-black/12 text-[13px] font-semibold text-black/72 transition hover:border-[#a7e33d]/45 hover:bg-black/4 hover:text-black focus-visible:ring-2 focus-visible:ring-[#a7e33d]/50 focus-visible:outline-none dark:border-white/12 dark:text-white dark:hover:bg-white/6"
                                            >
                                                <LetterSwap3D>
                                                    {t('Buka Live')}
                                                </LetterSwap3D>
                                                <ArrowUpRight
                                                    className="size-4"
                                                    aria-hidden
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </motion.article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function WhySolvaraSection() {
    const { t } = useTranslator();

    return (
        <section
            id="why"
            className="relative overflow-x-clip px-5 py-10 text-[#0b1110] sm:px-8 md:py-14 dark:text-white"
        >
            <div className="relative mx-auto max-w-340">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.72fr)] lg:items-end">
                    <div>
                        <SectionKicker>{t('Kenapa pilih kami')}</SectionKicker>
                        <Reveal>
                            <h2 className="mt-5 max-w-5xl text-[34px] leading-[1.1] font-semibold tracking-tight text-balance sm:text-[58px] lg:text-[70px]">
                                {t('Solusi sesuai kebutuhan.')}{' '}
                                <span className="text-[#a7e33d]">
                                    {t('Support setelah instalasi.')}
                                </span>
                            </h2>
                        </Reveal>
                    </div>

                    <Reveal delay={0.12}>
                        <div className="rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_20px_70px_-55px_rgba(11,17,16,0.5)] dark:border-white/10 dark:bg-[rgba(255,255,255,0.04)] dark:shadow-none">
                            <p className="text-[15px] leading-7 text-black/62 dark:text-white/58">
                                {t(
                                    'Konsultasi gratis, eksekusi teknis jelas, dan support awal untuk web, mobile, network, server, CCTV, hingga kebutuhan ISP.',
                                )}
                            </p>
                            <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-black/10 bg-neutral-950/4 px-4 py-2 text-[11px] font-semibold tracking-[0.16em] text-black/52 uppercase dark:border-white/10 dark:bg-neutral-950/20 dark:text-white/52">
                                <span
                                    aria-hidden
                                    className="size-2 rounded-full bg-[#a7e33d] shadow-[0_0_18px_rgba(167,227,61,0.55)]"
                                />
                                {t('06 prinsip kerja')}
                            </div>
                        </div>
                    </Reveal>
                </div>

                <ul className="mt-8 grid gap-px overflow-hidden rounded-[28px] border border-black/10 bg-[rgba(11,17,16,0.1)] shadow-[0_30px_110px_-82px_rgba(11,17,16,0.55)] md:grid-cols-2 xl:grid-cols-3 dark:border-white/10 dark:bg-[rgba(255,255,255,0.1)] dark:shadow-none">
                    {whyValues.map((value, index) => (
                        <WhyValueLine
                            key={value.title}
                            value={value}
                            index={index}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}

function WhyValueLine({
    value,
    index,
}: {
    value: (typeof whyValues)[number];
    index: number;
}) {
    const Icon = value.icon;
    const reduce = useReducedMotion();
    const { t } = useTranslator();

    return (
        <motion.li
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.38 }}
            transition={{
                duration: 0.62,
                delay: index * 0.055,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative flex min-h-0 flex-col bg-white p-5 transition duration-300 hover:bg-[#fbfff1] sm:min-h-56 sm:p-6 dark:bg-[#101311] dark:hover:bg-[#141814]"
        >
            <div className="flex items-start justify-between gap-4">
                <motion.span
                    aria-hidden
                    whileHover={reduce ? undefined : { scale: 1.05, y: -1 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                    className="flex size-11 shrink-0 items-center justify-center rounded-[14px] border border-black/10 bg-neutral-950/4 text-[#68a800] transition duration-300 group-hover:border-[#a7e33d]/45 group-hover:bg-[#a7e33d]/12 dark:border-white/10 dark:bg-[rgba(255,255,255,0.05)] dark:text-[#a7e33d]/82 dark:group-hover:border-[#a7e33d]/28 dark:group-hover:bg-[#a7e33d]/8"
                >
                    <Icon className="size-5" />
                </motion.span>
                <span className="font-mono text-[11px] tracking-[0.18em] text-black/24 transition duration-300 group-hover:text-[#68a800] dark:text-white/24 dark:group-hover:text-[#a7e33d]">
                    0{index + 1}
                </span>
            </div>

            <h3 className="mt-7 max-w-sm text-[22px] leading-[1.15] font-semibold tracking-tight text-[#0b1110] sm:text-[25px] dark:text-white">
                {t(value.title)}
            </h3>
            <p className="mt-3 max-w-md text-[14px] leading-7 text-black/56 transition duration-300 group-hover:text-black/70 dark:text-white/50 dark:group-hover:text-white/66">
                {t(value.description)}
            </p>
        </motion.li>
    );
}

function TechQualitySection() {
    const reduce = useReducedMotion();
    const { t } = useTranslator();

    return (
        <section className="px-5 py-10 text-[#0b1110] sm:px-8 md:py-14 dark:text-white">
            <div className="mx-auto max-w-340">
                <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white p-5 shadow-[0_34px_120px_-72px_rgba(11,17,16,0.52)] sm:p-8 md:p-10 dark:border-[#2c332e] dark:bg-[#0d100f] dark:shadow-[0_34px_120px_-78px_rgba(0,0,0,0.72)]">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-12 top-0 h-px bg-linear-to-r from-transparent via-[#a7e33d] to-transparent opacity-80"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -top-36 right-0 size-90 rounded-full bg-[#a7e33d]/8 blur-3xl"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -bottom-42 -left-20 size-80 rounded-full bg-black/5 blur-3xl dark:bg-[#a7e33d]/3"
                    />

                    <div className="relative">
                        <SectionHeader
                            eyebrow={t('Tech & Quality')}
                            title={t(
                                'Tech stack yang benar-benar dipakai untuk build dan maintenance.',
                            )}
                            description={t(
                                'Stack disusun per kebutuhan web, mobile, network, server, CCTV, testing, dan deployment agar sistem mudah dirawat setelah rilis.',
                            )}
                            titleClassName="max-w-4xl"
                        />

                        <div className="mt-8 flex flex-wrap gap-2 border-y border-black/10 py-4 dark:border-[#2a302c]">
                            {[
                                'Web',
                                'Mobile',
                                'Network',
                                'Server',
                                'Database',
                                'CCTV',
                                'Testing',
                                'DevOps',
                            ].map((label, index) => (
                                <motion.span
                                    key={label}
                                    initial={
                                        reduce ? false : { opacity: 0, y: 8 }
                                    }
                                    whileInView={
                                        reduce
                                            ? undefined
                                            : { opacity: 1, y: 0 }
                                    }
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{
                                        duration: 0.42,
                                        delay: index * 0.035,
                                    }}
                                    className="rounded-full border border-black/10 bg-neutral-950/4 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-black/58 uppercase dark:border-[#303730] dark:bg-[#141814] dark:text-white/58"
                                >
                                    {t(label)}
                                </motion.span>
                            ))}
                        </div>

                        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-[rgba(11,17,16,0.1)] md:grid-cols-2 xl:grid-cols-3 dark:border-[#2d342f] dark:bg-[#2d342f]">
                            {techGroups.map((group, index) => (
                                <Reveal
                                    key={group.label}
                                    delay={index * 0.045}
                                    className="h-full"
                                >
                                    <motion.article
                                        whileHover={
                                            reduce ? undefined : { y: -6 }
                                        }
                                        transition={{
                                            type: 'spring',
                                            stiffness: 260,
                                            damping: 24,
                                        }}
                                        className="group relative flex h-full min-h-58 flex-col overflow-hidden bg-[#f8faf3] p-5 transition duration-300 hover:bg-white sm:p-6 dark:bg-[#141814] dark:hover:bg-[#171d18]"
                                    >
                                        <div
                                            aria-hidden
                                            className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-[#a7e33d]/0 to-transparent transition duration-300 group-hover:via-[#a7e33d]/85"
                                        />
                                        <div
                                            aria-hidden
                                            className="absolute -right-20 -bottom-24 size-42 rounded-full bg-[#a7e33d]/0 blur-3xl transition duration-500 group-hover:bg-[#a7e33d]/14"
                                        />

                                        <div className="relative flex items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="relative flex size-2">
                                                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#a7e33d]/45 opacity-75 motion-reduce:animate-none" />
                                                        <span className="relative inline-flex size-2 rounded-full bg-[#a7e33d]" />
                                                    </span>
                                                    <h3 className="text-[12px] font-semibold tracking-[0.2em] text-[#a7e33d] uppercase">
                                                        {t(group.label)}
                                                    </h3>
                                                </div>
                                                <p className="mt-3 max-w-72 text-[13px] leading-6 text-black/50 dark:text-white/45">
                                                    {group.items
                                                        .slice(0, 3)
                                                        .join(' / ')}
                                                </p>
                                            </div>
                                            <span className="font-mono text-[11px] tracking-[0.18em] text-black/22 transition duration-300 group-hover:text-[#68a800] dark:text-white/24 dark:group-hover:text-[#a7e33d]">
                                                {String(index + 1).padStart(
                                                    2,
                                                    '0',
                                                )}
                                            </span>
                                        </div>

                                        <ul className="relative mt-6 flex flex-wrap gap-2">
                                            {group.items.map(
                                                (item, itemIndex) => (
                                                    <li
                                                        key={item}
                                                        className={cn(
                                                            'rounded-full border px-3 py-1 text-[12px] transition duration-300',
                                                            itemIndex < 2
                                                                ? 'border-[#a7e33d]/38 bg-[#a7e33d]/14 text-[#5f8f12] dark:border-[#a7e33d]/30 dark:bg-[#a7e33d]/10 dark:text-[#d7ff7a]'
                                                                : 'border-black/10 bg-white text-black/58 group-hover:border-black/16 group-hover:text-black/76 dark:border-[#303730] dark:bg-[#101311] dark:text-white/58 dark:group-hover:border-[#3b443d] dark:group-hover:text-white/76',
                                                        )}
                                                        style={{
                                                            transitionDelay: `${itemIndex * 18}ms`,
                                                        }}
                                                    >
                                                        {item}
                                                    </li>
                                                ),
                                            )}
                                        </ul>

                                        <div className="relative mt-auto pt-6">
                                            <div className="h-px bg-linear-to-r from-black/10 via-black/5 to-transparent dark:from-[#313833] dark:via-[#252b27]" />
                                        </div>
                                    </motion.article>
                                </Reveal>
                            ))}
                        </div>

                        <div className="mt-8 rounded-2xl border border-black/10 bg-[#f8faf3] p-4 sm:p-5 dark:border-[#2d342f] dark:bg-[#141814]">
                            <div className="mb-4 flex items-center justify-between gap-4">
                                <p className="text-[11px] font-semibold tracking-[0.2em] text-black/44 uppercase dark:text-white/42">
                                    {t('Quality control')}
                                </p>
                                <span className="hidden h-px flex-1 bg-linear-to-r from-black/10 to-transparent sm:block dark:from-[#303730]" />
                            </div>

                            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                                {qualityNotes.map((note, index) => (
                                    <motion.div
                                        key={note}
                                        initial={
                                            reduce
                                                ? false
                                                : { opacity: 0, x: -10 }
                                        }
                                        whileInView={
                                            reduce
                                                ? undefined
                                                : { opacity: 1, x: 0 }
                                        }
                                        viewport={{ once: true, amount: 0.35 }}
                                        transition={{
                                            duration: 0.45,
                                            delay: index * 0.04,
                                        }}
                                        className="flex items-center gap-2 text-[13px] text-black/62 dark:text-white/62"
                                    >
                                        <Check
                                            className="size-4 shrink-0 text-[#a7e33d]"
                                            aria-hidden
                                        />
                                        {t(note)}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TestimonialsSection() {
    const { t } = useTranslator();

    return (
        <section className="px-5 py-10 text-white sm:px-8 md:py-14">
            <div className="mx-auto max-w-340">
                <SectionHeader
                    eyebrow={t('Testimonials')}
                    title={t('Yang terasa setelah project berjalan rapi.')}
                    titleClassName="max-w-none lg:text-nowrap"
                />

                <div className="relative -mx-5 mt-8 overflow-hidden px-5 md:mx-0 md:px-0">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-black to-transparent sm:w-28"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-black to-transparent sm:w-28"
                    />

                    <div className="solvara-testimonial-marquee flex w-max">
                        {[0, 1].map((copyIndex) => (
                            <div
                                key={copyIndex}
                                className="flex shrink-0 gap-4 pr-4"
                                aria-hidden={copyIndex > 0}
                            >
                                {testimonials.map((testimonial, index) => (
                                    <Reveal
                                        key={`${copyIndex}-${testimonial.name}`}
                                        delay={
                                            copyIndex === 0
                                                ? index * 0.04
                                                : undefined
                                        }
                                        className="w-[86vw] max-w-95 sm:w-[78vw] sm:max-w-105 md:w-108 xl:w-115"
                                    >
                                        <TestimonialCard
                                            testimonial={testimonial}
                                        />
                                    </Reveal>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TestimonialCard({
    testimonial,
}: {
    testimonial: (typeof testimonials)[number];
}) {
    const { t } = useTranslator();

    return (
        <figure className="flex h-full min-h-72 flex-col rounded-[22px] border border-white/10 bg-[#111312] p-5 sm:min-h-82.5 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
                <span
                    className="font-display text-[54px] leading-none text-[#a7e33d]"
                    aria-hidden
                >
                    “
                </span>
                <span className="rounded-full border border-[#a7e33d]/18 bg-[#a7e33d]/8 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-[#d2ed71] uppercase">
                    {testimonial.project}
                </span>
            </div>
            <blockquote className="-mt-6 text-[16px] leading-7 font-semibold tracking-tight text-white/88">
                {t(testimonial.quote)}
            </blockquote>
            <figcaption className="mt-auto border-t border-white/10 pt-5">
                <div className="text-[14px] font-semibold">
                    {testimonial.name}
                </div>
                <div className="mt-1 text-[12px] text-white/45">
                    {t(testimonial.role)}
                </div>
            </figcaption>
        </figure>
    );
}

function FAQSection() {
    const [open, setOpen] = useState(0);
    const reduce = useReducedMotion();
    const { t } = useTranslator();

    return (
        <section className="px-5 py-10 text-white sm:px-8 md:py-14">
            <div className="mx-auto grid max-w-340 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                    <SectionKicker>{t('FAQ')}</SectionKicker>
                    <Reveal>
                        <h2 className="mt-4 max-w-xl text-[36px] leading-[1.14] font-semibold tracking-tight sm:text-[56px]">
                            {t('Pertanyaan yang biasanya muncul di awal.')}
                        </h2>
                    </Reveal>
                </div>

                <ul className="border-t border-white/10">
                    {faqs.map((item, index) => {
                        const isOpen = open === index;
                        const buttonId = `faq-button-${index}`;
                        const panelId = `faq-panel-${index}`;

                        return (
                            <li
                                key={item.question}
                                className="border-b border-white/10"
                            >
                                <button
                                    id={buttonId}
                                    type="button"
                                    aria-expanded={isOpen}
                                    aria-controls={panelId}
                                    onClick={() => setOpen(isOpen ? -1 : index)}
                                    className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:ring-2 focus-visible:ring-[#a7e33d]/50 focus-visible:outline-none"
                                >
                                    <span className="text-[16px] font-semibold tracking-tight sm:text-[18px]">
                                        {t(item.question)}
                                    </span>
                                    <span className="solvara-icon-box flex size-9 shrink-0 items-center justify-center rounded-full border border-black/12 bg-white text-[#65ad00] shadow-[0_12px_34px_rgba(11,17,16,0.12)] transition">
                                        {isOpen ? (
                                            <Minus
                                                className="size-4"
                                                aria-hidden
                                            />
                                        ) : (
                                            <Plus
                                                className="size-4"
                                                aria-hidden
                                            />
                                        )}
                                    </span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={panelId}
                                            role="region"
                                            aria-labelledby={buttonId}
                                            initial={
                                                reduce
                                                    ? false
                                                    : { height: 0, opacity: 0 }
                                            }
                                            animate={
                                                reduce
                                                    ? undefined
                                                    : {
                                                          height: 'auto',
                                                          opacity: 1,
                                                      }
                                            }
                                            exit={
                                                reduce
                                                    ? undefined
                                                    : { height: 0, opacity: 0 }
                                            }
                                            transition={{ duration: 0.28 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="max-w-2xl pb-6 text-[15px] leading-7 text-white/56">
                                                {t(item.answer)}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

function ContactSection() {
    const [submitted, setSubmitted] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const { t } = useTranslator();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            contact: '',
            project_type: '' as ContactFormValues['project_type'],
            budget: '' as ContactFormValues['budget'],
            deadline: '',
            message: '',
            company: '',
        },
    });

    const onSubmit = async (values: ContactFormValues) => {
        setServerError(null);

        try {
            const response = await fetch(contactStore.url(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const data = await response
                    .json()
                    .catch(() => ({ message: null }));

                throw new Error(
                    data?.message ??
                        'Pesan belum bisa dikirim. Coba lagi sebentar lagi.',
                );
            }

            reset();
            setSubmitted(true);
        } catch (error) {
            setServerError(
                error instanceof Error
                    ? error.message
                    : 'Pesan belum bisa dikirim. Coba lagi sebentar lagi.',
            );
        }
    };

    return (
        <section id="contact" className="px-2 pb-2 text-black">
            <div className="rounded-3xl bg-white px-5 py-12 sm:px-8 md:py-16">
                <div className="mx-auto grid max-w-340 gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
                    <div>
                        <div className="text-[12px] font-semibold tracking-[0.2em] text-black/42 uppercase">
                            {t('Contact')}
                        </div>
                        <h2 className="mt-4 max-w-xl text-[36px] leading-[1.14] font-semibold tracking-tight sm:text-[62px]">
                            {t('Butuh solusi IT untuk bisnis Anda?')}
                            <span className="block text-[#6ea314]">
                                {t('Konsultasi gratis sekarang.')}
                            </span>
                        </h2>
                        <p className="mt-6 max-w-md text-[15px] leading-7 text-black/55">
                            {t(
                                'Ceritakan kebutuhan web, mobile, network, server, CCTV, atau ISP. Kami bantu susun langkah pertama yang realistis.',
                            )}
                        </p>
                        <div className="mt-8 grid gap-3 text-[13px] text-black/54">
                            {[
                                'Konsultasi awal gratis.',
                                'Bisa mulai dari audit kebutuhan.',
                                'Support setelah instalasi.',
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-2"
                                >
                                    <span className="size-1.5 rounded-full bg-gold" />
                                    {t(item)}
                                </div>
                            ))}
                        </div>
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="group mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black px-6 text-[14px] font-semibold text-white transition hover:bg-[#18201d] focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:outline-none sm:w-fit"
                        >
                            <MessageCircle className="size-4" aria-hidden />
                            <LetterSwap3D>
                                {t('Hubungi via WhatsApp')}
                            </LetterSwap3D>
                        </a>
                    </div>

                    {submitted ? (
                        <SuccessState onReset={() => setSubmitted(false)} />
                    ) : (
                        <form
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                            className="relative rounded-3xl border border-black/10 bg-white p-5 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.32)] sm:p-8"
                        >
                            <div aria-hidden className="sr-only">
                                <label htmlFor="company">Company</label>
                                <input
                                    id="company"
                                    type="text"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    {...register('company')}
                                />
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <Field
                                    label={t('Nama')}
                                    error={errors.name?.message}
                                    required
                                >
                                    <input
                                        type="text"
                                        autoComplete="name"
                                        placeholder={t('Nama lengkap')}
                                        className={inputClass(!!errors.name)}
                                        {...register('name')}
                                    />
                                </Field>
                                <Field
                                    label={t('Email atau WhatsApp')}
                                    error={errors.contact?.message}
                                    required
                                >
                                    <input
                                        type="text"
                                        autoComplete="email tel"
                                        placeholder="hello@brand.com / +62..."
                                        className={inputClass(!!errors.contact)}
                                        {...register('contact')}
                                    />
                                </Field>
                                <Field
                                    label={t('Jenis project')}
                                    error={errors.project_type?.message}
                                    required
                                >
                                    <select
                                        className={inputClass(
                                            !!errors.project_type,
                                        )}
                                        defaultValue=""
                                        {...register('project_type')}
                                    >
                                        <option value="" disabled>
                                            {t('Pilih jenis project')}
                                        </option>
                                        {projectTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {t(type)}
                                            </option>
                                        ))}
                                    </select>
                                </Field>
                                <Field
                                    label={t('Budget range')}
                                    error={errors.budget?.message}
                                    required
                                >
                                    <select
                                        className={inputClass(!!errors.budget)}
                                        defaultValue=""
                                        {...register('budget')}
                                    >
                                        <option value="" disabled>
                                            {t('Pilih budget range')}
                                        </option>
                                        {budgetRanges.map((range) => (
                                            <option key={range} value={range}>
                                                {t(range)}
                                            </option>
                                        ))}
                                    </select>
                                </Field>
                                <Field
                                    label={t('Target deadline')}
                                    error={errors.deadline?.message}
                                >
                                    <select
                                        className={inputClass(
                                            !!errors.deadline,
                                        )}
                                        defaultValue=""
                                        {...register('deadline')}
                                    >
                                        <option value="">
                                            {t('Pilih target deadline')}
                                        </option>
                                        {deadlineRanges.map((range) => (
                                            <option key={range} value={range}>
                                                {t(range)}
                                            </option>
                                        ))}
                                    </select>
                                </Field>
                                <Field
                                    label={t('Pesan')}
                                    error={errors.message?.message}
                                    required
                                    className="md:col-span-2"
                                >
                                    <textarea
                                        rows={5}
                                        placeholder={t(
                                            'Ceritakan ringkas konteks project, halaman/fitur yang dibutuhkan, dan apa yang sudah dimiliki saat ini.',
                                        )}
                                        className={cn(
                                            inputClass(!!errors.message),
                                            'resize-y',
                                        )}
                                        {...register('message')}
                                    />
                                </Field>
                            </div>

                            {serverError && (
                                <p
                                    role="alert"
                                    className="mt-5 rounded-xl border border-coral/25 bg-coral/8 px-4 py-3 text-[13px] text-[#9a3a31]"
                                >
                                    {t(serverError)}
                                </p>
                            )}

                            <div className="mt-7 flex flex-col gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                                <p className="max-w-sm text-[12px] leading-5 text-black/44">
                                    {t(
                                        'Data hanya dipakai untuk meninjau kebutuhan project dan menyusun langkah awal.',
                                    )}
                                </p>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black px-6 text-[14px] font-semibold text-white transition hover:bg-[#18201d] focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2
                                                className="size-4 animate-spin"
                                                aria-hidden
                                            />
                                            {t('Mengirim')}
                                        </>
                                    ) : (
                                        <>
                                            <LetterSwap3D>
                                                {t('Kirim detail project')}
                                            </LetterSwap3D>
                                            <ArrowRight
                                                className="size-4 transition group-hover:translate-x-0.5"
                                                aria-hidden
                                            />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}

function Footer() {
    const { t } = useTranslator();

    return (
        <footer className="px-2 pb-2 text-black">
            <div className="rounded-3xl bg-[#a7e33d] px-5 py-14 sm:px-8">
                <div className="mx-auto grid max-w-340 gap-10 md:grid-cols-[1fr_1fr_1fr]">
                    <div>
                        <a
                            href="#top"
                            className="inline-flex items-center gap-2 font-semibold focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:outline-none"
                        >
                            <span className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-black ring-1 ring-black/10">
                                <img
                                    src={BRAND_LOGO_SRC}
                                    alt=""
                                    className="size-full object-cover"
                                />
                            </span>
                            Solvara Studio
                        </a>
                        <p className="mt-5 max-w-sm text-[15px] leading-7 text-black/58">
                            {t(
                                'Studio digital dan infrastruktur IT untuk website, mobile, network, server, CCTV, dan support bisnis.',
                            )}
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2">
                        <div>
                            <h3 className="text-[11px] font-semibold tracking-[0.2em] text-black/42 uppercase">
                                {t('Menu')}
                            </h3>
                            <ul className="mt-4 space-y-2 text-[14px]">
                                {navItems.map((item) => (
                                    <li key={item.href}>
                                        <a
                                            href={item.href}
                                            className="hover:underline"
                                        >
                                            {t(item.label)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[11px] font-semibold tracking-[0.2em] text-black/42 uppercase">
                                {t('Contact')}
                            </h3>
                            <ul className="mt-4 space-y-2 text-[14px]">
                                <li>
                                    <a
                                        href="mailto:hello@solvarastudio.com"
                                        className="inline-flex items-center gap-2 hover:underline"
                                    >
                                        <Mail className="size-4" aria-hidden />
                                        Email
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={WHATSAPP_URL}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 hover:underline"
                                    >
                                        <MessageCircle
                                            className="size-4"
                                            aria-hidden
                                        />
                                        WhatsApp
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[11px] font-semibold tracking-[0.2em] text-black/42 uppercase">
                            {t('Social')}
                        </h3>
                        <div className="mt-4 flex gap-3">
                            {[
                                {
                                    href: 'https://instagram.com/solvarastudio',
                                    label: 'Instagram',
                                    icon: Instagram,
                                },
                                {
                                    href: 'https://linkedin.com',
                                    label: 'LinkedIn',
                                    icon: Linkedin,
                                },
                                {
                                    href: 'https://github.com',
                                    label: 'GitHub',
                                    icon: Github,
                                },
                            ].map((social) => {
                                const Icon = social.icon;

                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.label}
                                        className="flex size-10 items-center justify-center rounded-full border border-black/15 bg-black/5 transition hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:outline-none"
                                    >
                                        <Icon className="size-4" aria-hidden />
                                    </a>
                                );
                            })}
                        </div>
                        <Link
                            href={login()}
                            className="mt-6 inline-flex h-10 items-center gap-2 rounded-full border border-black/15 bg-black/5 px-4 text-[13px] font-semibold text-black/72 transition hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:outline-none"
                        >
                            <LayoutDashboard className="size-4" aria-hidden />
                            {t('Admin login')}
                        </Link>
                    </div>
                </div>

                <div className="mx-auto mt-12 flex max-w-340 flex-col gap-3 border-t border-black/10 pt-5 text-[12px] text-black/42 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
                    <p>{t('© 2026 Solvara Studio. Built with clarity.')}</p>
                    <div className="flex flex-col gap-2 sm:items-end">
                        <a
                            href="https://www.instagram.com/intravert__"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 font-semibold text-black/72 transition hover:text-black hover:underline focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:outline-none"
                        >
                            <Instagram className="size-3.5" aria-hidden />
                            {t('Design by Intra Sepriansa')}
                        </a>
                        <p>
                            {t('Web, mobile, network, server, CCTV, dan ISP.')}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function TechLoopLogoItem({ item }: { item: LogoItem }) {
    const label = 'node' in item ? item.title : (item.alt ?? item.title);

    return (
        <span
            className="inline-flex size-12 items-center justify-center text-white/50 transition duration-300 hover:scale-110 hover:text-white/90 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none motion-reduce:transition-none"
            role="img"
            aria-label={label ?? 'Technology logo'}
        >
            <span className="inline-flex size-10 items-center justify-center">
                {'node' in item ? (
                    item.node
                ) : (
                    <span
                        aria-hidden
                        className="block size-full bg-current"
                        style={{
                            WebkitMask: `url("${item.src}") center / contain no-repeat`,
                            mask: `url("${item.src}") center / contain no-repeat`,
                        }}
                    />
                )}
            </span>
        </span>
    );
}

function HeroHeadline() {
    const reduce = useReducedMotion();
    const { t } = useTranslator();
    const text = 'Solusi Web, Mobile, Network & Server untuk Bisnis Anda';
    const lines =
        t(text) === text
            ? [
                  ['Solusi', 'Web,', 'Mobile,'],
                  ['Network', '&', 'Server'],
              ]
            : [
                  ['Web,', 'Mobile,'],
                  ['Network', '&', 'Server'],
              ];

    if (reduce) {
        return (
            <h1 className="solvara-hero-headline mt-7 w-full max-w-280 text-[32px] leading-[1.12] font-semibold text-black sm:mt-9 sm:text-[72px] lg:text-[88px] 2xl:mt-12 2xl:max-w-360 2xl:text-[122px]">
                <span className="block">{t('Solusi Web, Mobile,')}</span>
                <span className="block">Network & Server</span>
                <span className="block">
                    {t('untuk')}{' '}
                    <span className="font-display text-[#7eb61d] italic">
                        {t('Bisnis Anda')}
                    </span>
                </span>
            </h1>
        );
    }

    const wordVariant = {
        hidden: { opacity: 0, y: '105%', filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.82,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            },
        },
    };

    return (
        <motion.h1
            aria-label={t(text)}
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.075,
                        delayChildren: 0.1,
                    },
                },
            }}
            className="solvara-hero-headline mt-7 w-full max-w-280 text-[32px] leading-[1.12] font-semibold text-black sm:mt-9 sm:text-[72px] lg:text-[88px] 2xl:mt-12 2xl:max-w-360 2xl:text-[122px]"
        >
            <span aria-hidden="true">
                {lines.map((line) => (
                    <span
                        key={line.join('-')}
                        className="block overflow-hidden pb-[0.05em]"
                    >
                        {line.map((word, index) => (
                            <motion.span
                                key={word}
                                variants={wordVariant}
                                className="inline-block will-change-transform"
                            >
                                {word}
                                {index < line.length - 1 && '\u00A0'}
                            </motion.span>
                        ))}
                    </span>
                ))}
                <span className="block overflow-hidden pb-[0.08em]">
                    <motion.span
                        variants={wordVariant}
                        className="inline-block will-change-transform"
                    >
                        {t('untuk')}&nbsp;
                    </motion.span>
                    <motion.span
                        variants={wordVariant}
                        className="relative inline-block will-change-transform"
                    >
                        <motion.span
                            aria-hidden
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.78,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="absolute inset-x-[-0.05em] bottom-[0.1em] h-[0.23em] origin-left rounded-full bg-gold/24 blur-[1px]"
                        />
                        <span className="relative font-display text-[#7eb61d] italic">
                            {t('Bisnis Anda')}
                        </span>
                    </motion.span>
                </span>
            </span>
        </motion.h1>
    );
}

function SplitHeading({
    text,
    className,
    delay = 0,
}: {
    text: string;
    className?: string;
    delay?: number;
}) {
    const reduce = useReducedMotion();

    if (reduce) {
        return <h2 className={className}>{text}</h2>;
    }

    const words = text.split(' ');

    return (
        <motion.h2
            aria-label={text}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.28 }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.035,
                        delayChildren: delay,
                    },
                },
            }}
            className={className}
        >
            <span aria-hidden="true">
                {words.map((word, index) => (
                    <motion.span
                        key={`${word}-${index}`}
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 18,
                                filter: 'blur(8px)',
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                                transition: {
                                    duration: 0.62,
                                    ease: [0.22, 1, 0.36, 1],
                                },
                            },
                        }}
                        className="inline-block will-change-transform"
                    >
                        {word}
                        {index < words.length - 1 && '\u00A0'}
                    </motion.span>
                ))}
            </span>
        </motion.h2>
    );
}

function AnimatedMetricValue({
    value,
    className,
}: {
    value: string;
    className?: string;
}) {
    const reduce = useReducedMotion();

    if (reduce) {
        return <span className={cn('block', className)}>{value}</span>;
    }

    return (
        <span
            aria-label={value}
            className={cn('block overflow-hidden leading-none', className)}
        >
            <span aria-hidden="true" className="inline-flex">
                {Array.from(value).map((char, index) => (
                    <motion.span
                        key={`${char}-${index}`}
                        initial={{ opacity: 0, y: '115%', filter: 'blur(4px)' }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0px)',
                        }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{
                            duration: 0.58,
                            delay: index * 0.035,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="inline-block"
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </span>
        </span>
    );
}

function LetterSwap3D({
    children,
    className,
}: {
    children: string;
    className?: string;
}) {
    const reduce = useReducedMotion();

    if (reduce) {
        return <span className={className}>{children}</span>;
    }

    return (
        <span
            aria-label={children}
            className={cn('letter-swap-3d inline-flex leading-none', className)}
        >
            <span aria-hidden="true" className="inline-flex">
                {Array.from(children).map((char, index) => (
                    <span
                        key={`${char}-${index}`}
                        className="letter-swap-3d__cell"
                        style={
                            {
                                '--letter-delay': `${index * 0.024}s`,
                            } as CSSProperties
                        }
                    >
                        <span className="letter-swap-3d__front">
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                        <span className="letter-swap-3d__back">
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    </span>
                ))}
            </span>
        </span>
    );
}

function ProjectSnapshot({ work, index }: { work: Work; index: number }) {
    const accents = ['#a7e33d', '#9ee5da', '#d8b56d', '#ef6f61'] as const;
    const accent = accents[index % accents.length];
    const { t } = useTranslator();

    return (
        <div className="relative h-58 overflow-hidden rounded-[18px] bg-[#050706] p-3 sm:h-65">
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    background: `radial-gradient(circle at 70% 10%, ${accent}55, transparent 36%), radial-gradient(circle at 10% 80%, #ffffff18, transparent 34%)`,
                }}
            />
            <img
                src={work.image}
                alt={`${t('Screenshot project')} ${work.name}`}
                className="relative h-full w-full rounded-[14px] border border-white/10 object-cover object-top shadow-[0_22px_80px_-45px_rgba(0,0,0,0.95)] transition duration-500 group-hover:scale-[1.025]"
                loading="lazy"
            />
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-b-[14px] bg-black/72 px-3 py-2 backdrop-blur-md">
                <span className="truncate text-[12px] font-semibold text-white">
                    {work.name}
                </span>
                <span
                    className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold text-black"
                    style={{ backgroundColor: accent }}
                >
                    {t('Live')}
                </span>
            </div>
        </div>
    );
}

function SectionHeader({
    eyebrow,
    title,
    description,
    titleClassName,
}: {
    eyebrow: string;
    title: string;
    description?: string;
    titleClassName?: string;
}) {
    const { t } = useTranslator();

    return (
        <div className="grid gap-6 md:grid-cols-[1fr_0.7fr] md:items-end">
            <div>
                <SectionKicker>{t(eyebrow)}</SectionKicker>
                <SplitHeading
                    text={t(title)}
                    className={cn(
                        'mt-4 max-w-3xl text-[32px] leading-[1.14] font-semibold tracking-tight sm:text-[52px]',
                        titleClassName,
                    )}
                />
            </div>
            {description && (
                <Reveal delay={0.08}>
                    <p className="max-w-md text-[15px] leading-7 text-white/55">
                        {t(description)}
                    </p>
                </Reveal>
            )}
        </div>
    );
}

function SectionKicker({ children }: { children: ReactNode }) {
    const reduce = useReducedMotion();

    return (
        <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-[#a7e33d] uppercase">
            <motion.span
                aria-hidden
                animate={reduce ? undefined : { scale: [1, 1.45, 1] }}
                transition={
                    reduce
                        ? undefined
                        : {
                              duration: 2.6,
                              repeat: Infinity,
                              ease: 'easeInOut',
                          }
                }
                className="size-1.5 rounded-full bg-[#a7e33d]"
            />
            {children}
        </div>
    );
}

function Reveal({
    children,
    delay = 0,
    className,
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
}) {
    const reduce = useReducedMotion();

    if (reduce) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function Field({
    label,
    children,
    error,
    required,
    className,
}: {
    label: string;
    children: ReactNode;
    error?: string;
    required?: boolean;
    className?: string;
}) {
    const { t } = useTranslator();

    return (
        <label className={cn('flex flex-col gap-1.5', className)}>
            <span className="flex items-center gap-1 text-[11px] font-semibold tracking-[0.16em] text-black/42 uppercase">
                {t(label)}
                {required && <span className="text-gold">*</span>}
            </span>
            {children}
            {error && (
                <span className="text-[12px] text-[#9a3a31]">{t(error)}</span>
            )}
        </label>
    );
}

function SuccessState({ onReset }: { onReset: () => void }) {
    const { t } = useTranslator();

    return (
        <div className="rounded-3xl border border-black/10 bg-soft p-8">
            <div className="flex size-12 items-center justify-center rounded-full bg-[#a7e33d] text-black">
                <Check className="size-5" aria-hidden />
            </div>
            <h3 className="mt-6 text-[32px] leading-tight font-semibold tracking-tight">
                {t('Terima kasih. Detail awal project sudah terkirim.')}
            </h3>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-black/56">
                {t(
                    'Kami akan meninjau scope-nya dulu sebelum memberi estimasi. Biasanya respons keluar dalam 24 jam kerja.',
                )}
            </p>
            <button
                type="button"
                onClick={onReset}
                className="mt-7 inline-flex h-11 items-center rounded-xl border border-black/10 px-5 text-[13px] font-semibold transition hover:border-black/25 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-none"
            >
                {t('Kirim project lain')}
            </button>
        </div>
    );
}

const inputClass = (hasError: boolean) =>
    cn(
        'min-h-12 w-full rounded-xl border bg-white px-3.5 py-3 text-[14px] text-black transition placeholder:text-black/32 focus:ring-2 focus:ring-black/12 focus:outline-none',
        hasError
            ? 'border-coral focus:border-coral'
            : 'border-black/10 focus:border-black/35',
    );

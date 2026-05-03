import { useCallback } from 'react';
import { useLanguage } from '@/hooks/use-language';
import type { Language } from '@/hooks/use-language';

type TranslationMap = Record<string, string>;

const en: TranslationMap = {
    'Solvara Studio — Web, Mobile, Network & Server untuk Bisnis':
        'Solvara Studio - Web, Mobile, Network & Server for Business',
    'Solvara Studio membantu setup website, mobile experience, WiFi bisnis, server, cloud, CCTV, dan jaringan skala corporate atau ISP.':
        'Solvara Studio helps build websites, mobile experiences, business WiFi, servers, cloud, CCTV, and corporate or ISP-scale networks.',
    Karya: 'Work',
    Layanan: 'Services',
    Solusi: 'Solutions',
    Proses: 'Process',
    Kontak: 'Contact',
    'Konsultasi Gratis': 'Free Consultation',
    'Konsultasi Gratis Sekarang': 'Get a Free Consultation',
    'Hubungi via WhatsApp': 'Contact via WhatsApp',
    'Tutup menu navigasi': 'Close navigation menu',
    'Buka menu navigasi': 'Open navigation menu',
    'Navigasi utama': 'Main navigation',
    'Navigasi mobile': 'Mobile navigation',
    'Web, mobile, network, server, CCTV, dan ISP-ready support':
        'Web, mobile, network, server, CCTV, and ISP-ready support',
    'Dari setup WiFi cafe & kantor hingga infrastruktur server dan jaringan skala corporate & ISP, kami bantu bisnis Anda berjalan lebih stabil, aman, dan siap berkembang.':
        'From cafe and office WiFi setup to server infrastructure and corporate or ISP-scale networks, we help your business run more stable, secure, and ready to grow.',
    'Solusi Web, Mobile, Network & Server untuk Bisnis Anda':
        'Web, Mobile, Network & Server Solutions for Your Business',
    'Solusi Web, Mobile,': 'Web, Mobile,',
    'Network & Server': 'Network & Server',
    untuk: 'for',
    'Bisnis Anda': 'Your Business',
    'Solvara Workspace': 'Solvara Workspace',
    'Project control': 'Project control',
    'Ready to scope': 'Ready to scope',
    'Ringkasan awal untuk melihat tujuan bisnis, halaman inti, prioritas fitur, dan risiko launch sebelum project masuk sprint.':
        'An early summary to review business goals, core pages, feature priorities, and launch risks before the project enters a sprint.',
    'Target bisnis sudah dipetakan': 'Business targets have been mapped',
    'Halaman utama siap disusun': 'Core pages are ready to structure',
    'Integrasi dan konten diperhatikan':
        'Integrations and content are being watched',
    'Cukup realistis untuk sprint awal':
        'Realistic enough for the first sprint',
    'Tujuan bisnis': 'Business goals',
    'Struktur halaman': 'Page structure',
    'Fitur inti': 'Core features',
    'Risiko rilis': 'Release risks',
    'Tujuan project ditulis dalam bahasa bisnis.':
        'Project goals are written in business language.',
    'Halaman utama dibatasi agar sprint tetap realistis.':
        'Core pages are limited so the sprint stays realistic.',
    'Area yang belum pasti dicatat sebagai decision log.':
        'Unclear areas are recorded as a decision log.',
    'Scope lock': 'Scope lock',
    'Ruang lingkup yang bisa dieksekusi': 'Executable project scope',
    'Scope dibuat jelas sejak awal: apa yang dibangun, apa yang ditunda, data apa yang dibutuhkan, dan bagaimana revisi dikendalikan.':
        'Scope is made clear from the start: what gets built, what waits, what data is needed, and how revisions are controlled.',
    'Item kerja utama sudah dibatasi': 'Main work items are bounded',
    'Putaran revisi dibuat terukur': 'Revision rounds are measured',
    'Request tambahan tidak tercecer': 'Extra requests stay tracked',
    'Keputusan punya penanggung jawab': 'Decisions have a clear owner',
    'Kebutuhan utama': 'Main needs',
    'Batas pekerjaan': 'Work boundary',
    'Waktu dan prioritas': 'Timeline and priority',
    'Setiap fitur punya alasan dan prioritas.':
        'Every feature has a reason and priority.',
    'Revisi dibedakan dari tambahan scope baru.':
        'Revisions are separated from new scope additions.',
    'Timeline tidak dibuat lebih agresif dari kapasitas realistis.':
        'The timeline is not made more aggressive than realistic capacity.',
    'Experience map': 'Experience map',
    'Alur pengguna sebelum visual': 'User flow before visual polish',
    'Sebelum UI dipoles, alur pengguna, struktur informasi, CTA, dan empty state dirapikan agar halaman terasa mudah dipakai.':
        'Before polishing the UI, user flow, information structure, CTAs, and empty states are cleaned up so pages feel easier to use.',
    'Alur penting sudah divisualkan': 'Important flows are visualized',
    'Jalur konversi tidak bercabang terlalu banyak':
        'Conversion paths do not branch too much',
    'Loading, empty, error, dan success state':
        'Loading, empty, error, and success states',
    'Flow dicek dari layar kecil dulu':
        'The flow is checked from small screens first',
    'Urutan halaman': 'Page order',
    'Arah interaksi': 'Interaction direction',
    'Kondisi UI': 'UI states',
    'Teks aksi': 'Action copy',
    'CTA utama terlihat jelas tanpa perlu banyak instruksi.':
        'The main CTA is clear without too many instructions.',
    'Form dan dashboard punya state yang bisa dipahami.':
        'Forms and dashboards have understandable states.',
    'Konten dipotong agar halaman tidak terasa berat.':
        'Content is trimmed so the page does not feel heavy.',
    'Build board': 'Build board',
    'Development bertahap dengan preview': 'Staged development with preview',
    'Frontend, backend, form, dashboard, dan integrasi dibangun bertahap. Progress bisa dicek lewat staging, bukan menunggu hasil akhir.':
        'Frontend, backend, forms, dashboards, and integrations are built in stages. Progress can be reviewed through staging instead of waiting for the final result.',
    'Task dibagi agar mudah dicek': 'Tasks are split for easier review',
    'Endpoint inti punya validation': 'Core endpoints have validation',
    'Staging tersedia per milestone': 'Staging is available per milestone',
    'Dicek sebelum launch': 'Checked before launch',
    'Komponen dasar': 'Base components',
    'Page dan state': 'Pages and state',
    'API dan auth': 'API and auth',
    'Preview client': 'Client preview',
    'Preview dibagikan per milestone yang bisa dites.':
        'Preview links are shared per testable milestone.',
    'Form, route, dan API punya error handling.':
        'Forms, routes, and APIs have error handling.',
    'Komponen dibuat reusable untuk halaman lanjutan.':
        'Components are reusable for future pages.',
    'Release check': 'Release check',
    'QA sebelum halaman dipublish': 'QA before the page goes live',
    'Responsive layout, form, SEO dasar, performance, link, dan edge case dicek sebelum launch agar rilis tidak hanya terlihat bagus.':
        'Responsive layout, forms, basic SEO, performance, links, and edge cases are checked before launch so the release is not just visually good.',
    'Target halaman inti tetap ringan': 'Core pages stay lightweight',
    'Mobile sampai desktop dicek': 'Mobile to desktop is checked',
    'Success, error, dan validation aman':
        'Success, error, and validation states are safe',
    'Meta dan struktur awal tersedia':
        'Metadata and initial structure are available',
    'Tidak overlap': 'No overlap',
    'Validasi input': 'Input validation',
    'Asset ringan': 'Lightweight assets',
    'DNS dan SSL': 'DNS and SSL',
    'Tidak ada teks overlap di breakpoint utama.':
        'No text overlaps at key breakpoints.',
    'CTA, form, dan link keluar berjalan sesuai tujuan.':
        'CTAs, forms, and outbound links work as intended.',
    'Checklist launch disimpan untuk handover.':
        'The launch checklist is saved for handover.',
    'Handover notes': 'Handover notes',
    'Catatan admin yang mudah dipakai': 'Admin notes that are easy to use',
    'Panel admin tidak hanya dibuat, tapi dijelaskan: apa yang bisa diubah, field mana yang wajib, dan bagian mana yang perlu hati-hati.':
        'The admin panel is not only built, but explained: what can be changed, which fields are required, and which areas need care.',
    'Alur pengelolaan konten ditulis': 'Content management flows are written',
    'Akses admin dibatasi sesuai kebutuhan':
        'Admin access is limited based on need',
    'Field penting dijelaskan': 'Important fields are explained',
    'Support awal setelah launch': 'Initial support after launch',
    'Akses admin': 'Admin access',
    'Cara update': 'How to update',
    'Role dan izin': 'Roles and permissions',
    'Issue awal': 'Initial issues',
    'Admin tahu mana konten yang boleh diubah.':
        'Admins know which content can be changed.',
    'Field wajib dan format upload diberi catatan.':
        'Required fields and upload formats are documented.',
    'Support awal fokus pada bug dan adjustment kecil.':
        'Initial support focuses on bugs and small adjustments.',
    'Production route': 'Production route',
    'Deploy yang tidak mengandalkan ingatan':
        'Deployment that does not rely on memory',
    'Deployment dirapikan dalam checklist: environment, build asset, storage, queue, scheduler, SSL, dan backup agar maintenance lebih tenang.':
        'Deployment is organized into a checklist: environment, asset build, storage, queue, scheduler, SSL, and backups so maintenance is calmer.',
    'Variable penting tidak ditebak': 'Important variables are not guessed',
    'Queue worker siap via Supervisor':
        'Queue worker is ready through Supervisor',
    'HTTPS masuk checklist launch': 'HTTPS is part of the launch checklist',
    'Backup database disarankan': 'Database backups are recommended',
    'Nginx + PHP-FPM': 'Nginx + PHP-FPM',
    'Frontend assets': 'Frontend assets',
    Supervisor: 'Supervisor',
    Certbot: 'Certbot',
    'Environment production dipisah dari local.':
        'The production environment is separated from local.',
    'Queue dan scheduler punya proses sendiri.':
        'Queue and scheduler have their own processes.',
    'Rollback dan backup minimal punya catatan awal.':
        'Rollback and backup have at least initial notes.',
    'Backend contract': 'Backend contract',
    'API yang jelas untuk dikembangkan': 'A clear API for future development',
    'Endpoint, validation, resource response, auth guard, rate limit, dan error message dibuat jelas agar frontend dan backend tidak saling menebak.':
        'Endpoints, validation, resource responses, auth guards, rate limits, and error messages are made clear so frontend and backend do not guess each other.',
    'Route inti terdaftar jelas': 'Core routes are clearly listed',
    'Input masuk lewat Form Request': 'Input goes through Form Request',
    'Admin endpoint dijaga token': 'Admin endpoints are protected by tokens',
    'Form publik punya batas request': 'Public forms have request limits',
    'Endpoint list': 'Endpoint list',
    Validation: 'Validation',
    'Response shape': 'Response shape',
    'Admin access': 'Admin access',
    'Frontend memakai route typed agar URL tidak hardcode.':
        'Frontend uses typed routes so URLs are not hardcoded.',
    'Response API konsisten lewat resource.':
        'API responses stay consistent through resources.',
    'Endpoint publik punya honeypot dan rate limit.':
        'Public endpoints have honeypot and rate limiting.',
    'Decision log': 'Decision log',
    'Progress bisa dicek bertahap': 'Progress can be checked in stages',
    'Working notes': 'Working notes',
    'Tidak semua project perlu sistem besar. Yang penting scope, flow, dan handover-nya jelas sejak awal.':
        'Not every project needs a big system. What matters is clear scope, flow, and handover from the start.',
    'Launch board': 'Launch board',
    'Flow preview': 'Flow preview',
    'Project readiness': 'Project readiness',
    'Cek kebutuhan IT sebelum masuk ke scope detail.':
        'Check IT needs before entering detailed scope.',
    'Pilih kebutuhan awal. Panel ini merapikan titik awal, output, dan jalur kerja untuk web, network, server, CCTV, atau ISP.':
        'Pick the initial need. This panel organizes starting points, outputs, and workflow paths for web, network, server, CCTV, or ISP.',
    'Tipe project': 'Project type',
    'Website / app': 'Website / app',
    'Kredibilitas, alur pengguna, dashboard, dan inquiry yang rapi.':
        'Credibility, user flow, dashboard, and clean inquiry handling.',
    '1-2 minggu': '1-2 weeks',
    'Halaman inti, web app, lead form, dashboard, SEO dasar.':
        'Core pages, web app, lead form, dashboard, and basic SEO.',
    'Brand message': 'Brand message',
    'Responsive UX': 'Responsive UX',
    'Inquiry flow': 'Inquiry flow',
    'Network bisnis': 'Business network',
    'WiFi stabil, coverage merata, dan bandwidth tidak cepat penuh.':
        'Stable WiFi, even coverage, and bandwidth that does not fill up too quickly.',
    '1-5 hari': '1-5 days',
    'Router, switch, access point, kabel, dan konfigurasi bandwidth.':
        'Router, switch, access point, cabling, and bandwidth configuration.',
    'Jumlah device': 'Device count',
    'Coverage area': 'Coverage area',
    'Traffic profile': 'Traffic profile',
    'Server / cloud': 'Server / cloud',
    'Deploy aplikasi, database, backup, dan keamanan dasar.':
        'Application deploy, database, backup, and basic security.',
    '1-7 hari': '1-7 days',
    'VPS/cloud/on-premise server siap operasi dengan checklist.':
        'VPS/cloud/on-premise server ready for operation with a checklist.',
    'Resource server': 'Server resources',
    'Backup plan': 'Backup plan',
    'Access control': 'Access control',
    'CCTV / ISP': 'CCTV / ISP',
    'Monitoring keamanan, routing advanced, dan jaringan skala besar.':
        'Security monitoring, advanced routing, and large-scale networks.',
    'CCTV remote monitoring atau network ISP dengan routing dan monitoring.':
        'CCTV remote monitoring or ISP network with routing and monitoring.',
    'Area pantau': 'Monitored area',
    'HA target': 'HA target',
    'Estimasi awal': 'Initial estimate',
    'Scope fit': 'Scope fit',
    Route: 'Route',
    'Fokus awal': 'Initial focus',
    'Scope checkpoint': 'Scope checkpoint',
    'Ready to map': 'Ready to map',
    Services: 'Services',
    'Web, mobile, network, server, dan security dalam satu scope.':
        'Web, mobile, network, server, and security in one scope.',
    'Pilih kebutuhan yang paling dekat. Detail teknis tetap dirapikan saat discovery agar solusi tidak berlebihan.':
        'Choose the closest need. Technical details are still cleaned up during discovery so the solution does not become excessive.',
    'Website & Web App': 'Website & Web App',
    'Company profile, landing page, dashboard, dan aplikasi web yang siap dipakai bisnis.':
        'Company profiles, landing pages, dashboards, and web apps ready for business use.',
    'Mobile Experience': 'Mobile Experience',
    'Alur mobile, responsive UX, dan interface aplikasi yang nyaman untuk layar kecil.':
        'Mobile flow, responsive UX, and app interfaces that feel comfortable on small screens.',
    'Business Network Solutions': 'Business Network Solutions',
    'Setup WiFi, LAN, dan bandwidth agar operasional kantor, cafe, atau toko lebih stabil.':
        'WiFi, LAN, and bandwidth setup so office, cafe, or store operations run more stable.',
    'Server & Cloud Solutions': 'Server & Cloud Solutions',
    'Setup server, deploy aplikasi, database, backup, dan hardening awal.':
        'Server setup, application deploy, database, backup, and initial hardening.',
    'CCTV & Security System': 'CCTV & Security System',
    'Instalasi CCTV, DVR/NVR, monitoring via HP, dan integrasi jaringan.':
        'CCTV installation, DVR/NVR, mobile monitoring, and network integration.',
    'ISP & Advanced Network': 'ISP & Advanced Network',
    'Infrastruktur skala besar untuk enterprise dan ISP: routing, traffic, dan NOC.':
        'Large-scale infrastructure for enterprise and ISP: routing, traffic, and NOC.',
    'Maintenance & Optimization': 'Maintenance & Optimization',
    'Perawatan performa, keamanan, improvement, dan support setelah instalasi.':
        'Performance care, security, improvements, and support after installation.',
    'API & Integration': 'API & Integration',
    'Fondasi data, autentikasi, integrasi WhatsApp/payment, dan proses bisnis.':
        'Data foundation, authentication, WhatsApp/payment integration, and business process support.',
    'Landing page': 'Landing page',
    'Dashboard admin': 'Admin dashboard',
    'Web application': 'Web application',
    'Mobile UI flow': 'Mobile UI flow',
    'Responsive system': 'Responsive system',
    'App-ready design': 'App-ready design',
    'WiFi cafe & kantor': 'Cafe & office WiFi',
    'LAN & kabel': 'LAN & cabling',
    'Optimasi bandwidth': 'Bandwidth optimization',
    'VPS / cloud / on-premise': 'VPS / cloud / on-premise',
    'App & database deploy': 'App & database deploy',
    'Backup data': 'Data backup',
    'Instalasi kamera': 'Camera installation',
    'Monitoring via HP': 'Mobile monitoring',
    'Storage rekaman': 'Recording storage',
    'Fiber / wireless': 'Fiber / wireless',
    'BGP & OSPF': 'BGP & OSPF',
    'Monitoring NOC': 'NOC monitoring',
    'Performance check': 'Performance check',
    'Security review': 'Security review',
    'After-install support': 'After-install support',
    'Auth & role': 'Auth & role',
    'External integration': 'External integration',
    'Konsultasi scope': 'Discuss scope',
    'Solution detail': 'Solution detail',
    'Web, mobile, network, server, CCTV, dan ISP dibuat rapi dari awal.':
        'Web, mobile, network, server, CCTV, and ISP are structured cleanly from the start.',
    'Pilih detail solusi IT': 'Choose IT solution detail',
    'Website dan dashboard yang siap dipakai bisnis.':
        'Websites and dashboards ready for business use.',
    'Untuk company profile, landing page, admin panel, dashboard, dan sistem internal yang butuh alur rapi.':
        'For company profiles, landing pages, admin panels, dashboards, and internal systems that need a clean flow.',
    'Brand belum terlihat profesional':
        'The brand does not look professional yet',
    'Inquiry dan CTA belum rapi': 'Inquiry and CTAs are not clean yet',
    'Project belum mudah dikelola dari admin':
        'Projects are not easy to manage from admin yet',
    'Struktur halaman dan copy jelas': 'Clear page structure and copy',
    'UI responsive desktop dan mobile': 'Responsive UI for desktop and mobile',
    'Admin panel dan CRUD project': 'Admin panel and project CRUD',
    'Deploy production dan basic SEO': 'Production deploy and basic SEO',
    'Hero, service, portfolio': 'Hero, services, portfolio',
    'CTA dan form inquiry': 'CTA and inquiry form',
    'Halaman layanan': 'Service pages',
    'Optimasi responsive': 'Responsive optimization',
    'Login admin': 'Admin login',
    'CRUD project': 'Project CRUD',
    'Upload media': 'Media upload',
    'Mobile experience yang cepat dan enak digunakan.':
        'A fast mobile experience that feels easy to use.',
    'Untuk mobile-first website, PWA, prototype app, dan integrasi API agar flow pengguna lebih ringan.':
        'For mobile-first websites, PWA, app prototypes, and API integrations so user flow feels lighter.',
    'Tampilan mobile belum nyaman': 'Mobile views are not comfortable yet',
    'Flow pengguna terlalu panjang': 'The user flow is too long',
    'Aplikasi belum siap integrasi API':
        'The application is not ready for API integration yet',
    'Desain UI mobile-first': 'Mobile-first UI design',
    'PWA, React Native, atau Flutter scope':
        'PWA, React Native, or Flutter scope',
    'Integrasi API dan autentikasi': 'API and authentication integration',
    'Testing device dan performa': 'Device and performance testing',
    'Responsive audit': 'Responsive audit',
    'CTA dan form mobile': 'CTA and mobile form',
    'WiFi dan LAN yang stabil untuk operasional harian.':
        'Stable WiFi and LAN for daily operations.',
    'Untuk cafe, kantor, toko, dan bisnis yang mulai terasa lambat saat user bertambah.':
        'For cafes, offices, stores, and businesses that start slowing down as users increase.',
    'Internet lambat saat banyak pengguna':
        'Internet slows down with many users',
    'WiFi tidak merata': 'WiFi coverage is uneven',
    'Koneksi sering putus': 'Connections often drop',
    'Desain jaringan sesuai kebutuhan': 'Network design based on needs',
    'Setup router, switch, access point':
        'Router, switch, and access point setup',
    'Penarikan kabel rapi': 'Clean cabling',
    'Optimasi performa jaringan': 'Network performance optimization',
    'Setup WiFi & router': 'WiFi and router setup',
    'Hingga 10 device': 'Up to 10 devices',
    'Setup LAN + WiFi': 'LAN + WiFi setup',
    'Support banyak user': 'Support for many users',
    'Multi access point': 'Multiple access points',
    'Manajemen bandwidth': 'Bandwidth management',
    'Server siap pakai untuk aplikasi dan data bisnis.':
        'Ready-to-use servers for business applications and data.',
    'Cocok untuk perusahaan, startup, dan aplikasi berbasis web yang butuh fondasi lebih handal.':
        'Suitable for companies, startups, and web-based applications that need a more reliable foundation.',
    'Deploy aplikasi belum rapi': 'Application deployment is not clean yet',
    'Database dan file belum punya backup':
        'Databases and files do not have backups yet',
    'Server lambat saat trafik naik': 'Servers slow down when traffic rises',
    'Setup web server & database': 'Web server and database setup',
    'Deploy aplikasi bisnis': 'Business application deploy',
    'Backup & keamanan data': 'Data backup and security',
    'Monitoring server': 'Server monitoring',
    'VPS/cloud setup': 'VPS/cloud setup',
    'SSL dan web server': 'SSL and web server',
    'App + database deploy': 'App + database deploy',
    'Backup schedule': 'Backup schedule',
    'Monitoring basic': 'Basic monitoring',
    'Server lokal': 'Local server',
    'Maintenance checklist': 'Maintenance checklist',
    'Keamanan bisnis dengan monitoring yang mudah dicek.':
        'Business security with monitoring that is easy to check.',
    'Untuk toko, kantor, gudang, dan area operasional yang perlu dipantau dari HP.':
        'For stores, offices, warehouses, and operational areas that need mobile monitoring.',
    'Area penting belum terpantau': 'Important areas are not monitored yet',
    'Akses rekaman sulit dicek': 'Recordings are hard to check',
    'CCTV belum terintegrasi jaringan':
        'CCTV is not integrated with the network yet',
    'Instalasi kamera CCTV': 'CCTV camera installation',
    'Setup DVR/NVR': 'DVR/NVR setup',
    'Penyimpanan rekaman': 'Recording storage',
    'Kamera area kasir': 'Cashier area camera',
    'DVR/NVR setup': 'DVR/NVR setup',
    'Network integration': 'Network integration',
    'Coverage check': 'Coverage check',
    'Remote access': 'Remote access',
    'Topologi, routing, dan monitoring untuk jaringan besar.':
        'Topology, routing, and monitoring for large networks.',
    'Untuk enterprise dan ISP yang butuh high availability, scalability, dan security.':
        'For enterprise and ISP needs that require high availability, scalability, and security.',
    'Routing dan traffic belum terkendali':
        'Routing and traffic are not controlled yet',
    'Monitoring belum terpusat': 'Monitoring is not centralized yet',
    'Skalabilitas jaringan belum siap': 'Network scalability is not ready yet',
    'Infrastruktur jaringan ISP': 'ISP network infrastructure',
    'Routing advanced (BGP, OSPF)': 'Advanced routing (BGP, OSPF)',
    'Fiber optic & wireless': 'Fiber optic and wireless',
    'Monitoring & NOC': 'Monitoring and NOC',
    'Topology design': 'Topology design',
    'Fiber / wireless scope': 'Fiber / wireless scope',
    'Traffic management': 'Traffic management',
    'Failover plan': 'Failover plan',
    'Monitoring dashboard': 'Monitoring dashboard',
    Alerting: 'Alerting',
    'Incident notes': 'Incident notes',
    Masalah: 'Problems',
    ready: 'ready',
    'Setup jaringan kantor 20+ user': 'Office network setup for 20+ users',
    'LAN, WiFi, router, dan bandwidth dibuat lebih stabil.':
        'LAN, WiFi, router, and bandwidth are made more stable.',
    'Instalasi CCTV toko retail': 'Retail store CCTV installation',
    'Monitoring via HP dengan storage rekaman yang mudah dicek.':
        'Mobile monitoring with recording storage that is easy to check.',
    'Deploy server aplikasi': 'Application server deployment',
    'Web server, database, SSL, backup, dan checklist launch.':
        'Web server, database, SSL, backup, and launch checklist.',
    'Cara kerja jelas dari survey sampai support.':
        'A clear workflow from survey to support.',
    'Kebutuhan dipetakan, instalasi atau development berjalan bertahap, lalu ditutup dengan QA dan handover.':
        'Needs are mapped, installation or development runs in stages, then closes with QA and handover.',
    'Diskusi kebutuhan awal': 'Discuss initial needs',
    Discovery: 'Discovery',
    'Kita mulai dari kebutuhan, target pengguna, prioritas bisnis, dan batasan teknis.':
        'We start from needs, target users, business priorities, and technical constraints.',
    'Audit & Desain': 'Audit & Design',
    'Alur halaman, kebutuhan device, denah jaringan, server, atau CCTV dirapikan sebelum eksekusi.':
        'Page flow, device needs, network layout, server, or CCTV are organized before execution.',
    'UI Design': 'UI Design',
    'Tampilan dibuat bersih, konsisten, responsive, dan sesuai karakter brand.':
        'The interface is made clean, consistent, responsive, and aligned with the brand character.',
    Development: 'Development',
    'Frontend, backend, server, jaringan, dan integrasi dibangun bertahap dengan checkpoint yang bisa dicek.':
        'Frontend, backend, server, network, and integrations are built in stages with reviewable checkpoints.',
    'QA & Launch': 'QA & Launch',
    'Form, responsive layout, performa, akses admin, dan edge case diuji sebelum rilis.':
        'Forms, responsive layout, performance, admin access, and edge cases are tested before release.',
    Support: 'Support',
    'Handover, dokumentasi ringan, dan support awal disiapkan agar operasional bisa lanjut.':
        'Handover, lightweight documentation, and initial support are prepared so operations can continue.',
    Step: 'Step',
    Team: 'Team',
    'Tim yang terlibat di Solvara Studio':
        'The team involved in Solvara Studio',
    'Web Developer': 'Web Developer',
    'Network Engineering': 'Network Engineering',
    'Mobile Programming': 'Mobile Programming',
    'Menangani arah teknis web, interface landing, dashboard, backend flow, integrasi, dan kualitas pengalaman pengguna di browser.':
        'Handles web technical direction, landing interfaces, dashboards, backend flow, integrations, and browser user experience quality.',
    'Merapikan sisi konektivitas, infrastruktur jaringan, akses layanan, dan fondasi operasional agar sistem lebih stabil saat dipakai.':
        'Organizes connectivity, network infrastructure, service access, and operational foundations so systems stay more stable in use.',
    'Mengawal kebutuhan mobile, pola interaksi layar kecil, alur aplikasi, dan konsistensi experience lintas device.':
        'Handles mobile needs, small-screen interaction patterns, app flow, and cross-device experience consistency.',
    'Area fokus': 'Focus area',
    Ownership: 'Ownership',
    Focus: 'Focus',
    Output: 'Output',
    'Website & dashboard': 'Website & dashboard',
    'UI, API, build flow': 'UI, API, build flow',
    'Web siap bisnis': 'Business-ready web',
    'Network setup': 'Network setup',
    'Stabilitas akses': 'Access stability',
    'Operasional rapi': 'Clean operations',
    'Mobile experience': 'Mobile experience',
    'App flow & UX': 'App flow & UX',
    'Lintas device': 'Cross-device',
    'Lihat anggota sebelumnya': 'View previous team member',
    'Lihat anggota berikutnya': 'View next team member',
    'Pilih anggota tim': 'Choose team member',
    'Selected work': 'Selected work',
    'Project real yang rapi dan siap dikembangkan.':
        'Real projects that are clean and ready to grow.',
    'Semua Project': 'All Projects',
    Tantangan: 'Challenge',
    Hasil: 'Outcome',
    'Detail Project': 'Project Details',
    'Buka Live': 'Open Live',
    'Kenapa pilih kami': 'Why choose us',
    'Solusi sesuai kebutuhan.': 'Solutions based on your needs.',
    'Konsultasi gratis, eksekusi teknis jelas, dan support awal untuk web, mobile, network, server, CCTV, hingga kebutuhan ISP.':
        'Free consultation, clear technical execution, and initial support for web, mobile, network, server, CCTV, and ISP needs.',
    '06 prinsip kerja': '06 work principles',
    'Konsultasi gratis': 'Free consultation',
    'Kebutuhan awal dibaca dulu agar solusi tidak kebesaran atau kurang tepat.':
        'Initial needs are reviewed first so the solution is neither oversized nor off-target.',
    'Tenaga berpengalaman': 'Experienced team',
    'Web, mobile, network, server, dan security dikerjakan dengan pendekatan teknis yang jelas.':
        'Web, mobile, network, server, and security are handled with a clear technical approach.',
    'Solusi sesuai kebutuhan': 'Solutions based on needs',
    'Scope disusun dari kondisi bisnis, jumlah user, device, data, dan target operasional.':
        'Scope is built from business conditions, user count, devices, data, and operational targets.',
    'Support setelah instalasi': 'Support after installation',
    'Setelah setup, ada catatan handover dan support awal untuk memastikan sistem berjalan.':
        'After setup, handover notes and initial support help ensure the system runs.',
    'Siap untuk UMKM hingga corporate':
        'Ready for SMEs through corporate needs',
    'Pekerjaan bisa dimulai dari WiFi toko sampai network skala enterprise dan ISP.':
        'Work can start from store WiFi through enterprise and ISP-scale networks.',
    'Quality checklist': 'Quality checklist',
    'Performa, keamanan dasar, responsive view, backup, dan dokumentasi dicek sebelum handover.':
        'Performance, basic security, responsive views, backups, and documentation are checked before handover.',
    'Tech & Quality': 'Tech & Quality',
    'Tech stack yang benar-benar dipakai untuk build dan maintenance.':
        'Tech stacks that are actually used for build and maintenance.',
    'Stack disusun per kebutuhan web, mobile, network, server, CCTV, testing, dan deployment agar sistem mudah dirawat setelah rilis.':
        'Stacks are organized by web, mobile, network, server, CCTV, testing, and deployment needs so systems are easier to maintain after release.',
    'Data & Dashboard': 'Data & Dashboard',
    'CCTV & Security': 'CCTV & Security',
    'Testing & QA': 'Testing & QA',
    'DevOps & Integrations': 'DevOps & Integrations',
    'Quality control': 'Quality control',
    'Pest + PHPUnit feature coverage': 'Pest + PHPUnit feature coverage',
    'Playwright smoke check': 'Playwright smoke check',
    'Pint, ESLint, dan Prettier': 'Pint, ESLint, and Prettier',
    'Backup dan rollback checklist': 'Backup and rollback checklist',
    'Deployment monitoring-ready': 'Deployment monitoring-ready',
    'Security baseline review': 'Security baseline review',
    Testimonials: 'Testimonials',
    'Yang terasa setelah project berjalan rapi.':
        'What people feel after the project runs cleanly.',
    FAQ: 'FAQ',
    'Pertanyaan yang biasanya muncul di awal.':
        'Questions that usually come up at the beginning.',
    'Berapa lama proses pembuatan website?':
        'How long does website development take?',
    'Tergantung scope. Landing page sederhana biasanya bisa dimulai dari 1–2 minggu, sedangkan web app atau dashboard membutuhkan estimasi setelah discovery.':
        'It depends on scope. A simple landing page can usually start from 1-2 weeks, while a web app or dashboard needs estimation after discovery.',
    'Apakah bisa mulai dari desain saja?': 'Can we start from design only?',
    'Bisa. Project dapat dimulai dari UX/UI design, development saja, atau full dari strategi konten sampai launch.':
        'Yes. A project can start from UX/UI design, development only, or full scope from content strategy to launch.',
    'Apakah bisa setup jaringan, server, atau CCTV?':
        'Can you set up network, server, or CCTV?',
    'Bisa. Kebutuhan akan dicek dari lokasi, jumlah user/device, target performa, keamanan, dan kondisi infrastruktur yang sudah ada.':
        'Yes. Needs are checked from location, user/device count, performance target, security, and existing infrastructure condition.',
    'Apakah bisa dibuatkan admin panel?': 'Can you build an admin panel?',
    'Bisa. Admin panel dapat disiapkan untuk mengelola konten, data, user, transaksi, inquiry, atau resource lain sesuai kebutuhan.':
        'Yes. Admin panels can be prepared to manage content, data, users, transactions, inquiries, or other resources based on need.',
    'Apakah bisa integrasi WhatsApp, payment, atau API lain?':
        'Can you integrate WhatsApp, payment, or other APIs?',
    'Bisa. Integrasi akan dicek dari dokumentasi layanan terkait dan dimasukkan ke scope teknis.':
        'Yes. Integrations are reviewed from the service documentation and added to the technical scope.',
    'Apakah ada support setelah launch?': 'Is there support after launch?',
    'Ada support awal setelah launch. Untuk kebutuhan jangka panjang, maintenance bisa dibuat terpisah.':
        'Initial support is available after launch. Long-term maintenance can be scoped separately.',
    'Apakah saya harus sudah punya konten?':
        'Do I need to already have content?',
    'Tidak harus lengkap. Konten bisa dirapikan bersama berdasarkan struktur halaman, prioritas informasi, dan tujuan bisnis.':
        'Not necessarily complete. Content can be refined together based on page structure, information priority, and business goals.',
    'Butuh solusi IT untuk bisnis Anda?':
        'Need an IT solution for your business?',
    'Konsultasi gratis sekarang.': 'Get a free consultation now.',
    'Ceritakan kebutuhan web, mobile, network, server, CCTV, atau ISP. Kami bantu susun langkah pertama yang realistis.':
        'Tell us your web, mobile, network, server, CCTV, or ISP needs. We help define a realistic first step.',
    'Konsultasi awal gratis.': 'Free initial consultation.',
    'Bisa mulai dari audit kebutuhan.': 'Can start from a needs audit.',
    'Support setelah instalasi.': 'Support after installation.',
    Nama: 'Name',
    'Nama lengkap': 'Full name',
    'Email atau WhatsApp': 'Email or WhatsApp',
    'Jenis project': 'Project type',
    'Pilih jenis project': 'Choose project type',
    'Budget range': 'Budget range',
    'Pilih budget range': 'Choose budget range',
    'Target deadline': 'Target deadline',
    'Pilih target deadline': 'Choose target deadline',
    Pesan: 'Message',
    'Ceritakan ringkas konteks project, halaman/fitur yang dibutuhkan, dan apa yang sudah dimiliki saat ini.':
        'Briefly describe the project context, pages/features needed, and what you already have.',
    'Data hanya dipakai untuk meninjau kebutuhan project dan menyusun langkah awal.':
        'Data is only used to review project needs and define the first step.',
    Mengirim: 'Sending',
    'Kirim detail project': 'Send project details',
    'Pesan belum bisa dikirim. Coba lagi sebentar lagi.':
        'The message could not be sent. Please try again shortly.',
    'Nama minimal 2 karakter.': 'Name must be at least 2 characters.',
    'Nama terlalu panjang.': 'Name is too long.',
    'Email atau nomor WhatsApp wajib diisi.':
        'Email or WhatsApp number is required.',
    'Kontak terlalu panjang.': 'Contact is too long.',
    'Pilih jenis project.': 'Choose a project type.',
    'Pilih budget range.': 'Choose a budget range.',
    'Pesan minimal 20 karakter.': 'Message must be at least 20 characters.',
    'Pesan terlalu panjang.': 'Message is too long.',
    'Form tidak valid.': 'The form is invalid.',
    'Company profile': 'Company profile',
    'Mobile app / mobile UX': 'Mobile app / mobile UX',
    'Setup jaringan kantor / bisnis': 'Office / business network setup',
    'Server & cloud': 'Server & cloud',
    'CCTV & security system': 'CCTV & security system',
    'ISP / advanced network': 'ISP / advanced network',
    'Dashboard / admin panel': 'Dashboard / admin panel',
    'Backend / API': 'Backend / API',
    Maintenance: 'Maintenance',
    'Belum yakin': 'Not sure yet',
    '< Rp5 juta': '< IDR 5 million',
    'Rp5–10 juta': 'IDR 5-10 million',
    'Rp10–25 juta': 'IDR 10-25 million',
    'Rp25–50 juta': 'IDR 25-50 million',
    '> Rp50 juta': '> IDR 50 million',
    'Ingin diskusi dulu': 'Want to discuss first',
    Secepatnya: 'As soon as possible',
    '2–4 minggu': '2-4 weeks',
    '1–2 bulan': '1-2 months',
    '3 bulan+': '3+ months',
    Fleksibel: 'Flexible',
    'Terima kasih. Detail awal project sudah terkirim.':
        'Thank you. The initial project details have been sent.',
    'Kami akan meninjau scope-nya dulu sebelum memberi estimasi. Biasanya respons keluar dalam 24 jam kerja.':
        'We will review the scope first before giving an estimate. Responses usually come within 24 business hours.',
    'Kirim project lain': 'Send another project',
    'Studio digital dan infrastruktur IT untuk website, mobile, network, server, CCTV, dan support bisnis.':
        'Digital studio and IT infrastructure partner for websites, mobile, network, server, CCTV, and business support.',
    Menu: 'Menu',
    Social: 'Social',
    'Admin login': 'Admin login',
    '© 2026 Solvara Studio. Built with clarity.':
        '© 2026 Solvara Studio. Built with clarity.',
    'Design by Intra Sepriansa': 'Design by Intra Sepriansa',
    'Web, mobile, network, server, CCTV, dan ISP.':
        'Web, mobile, network, server, CCTV, and ISP.',
    Live: 'Live',
    'Project - Solvara Studio': 'Projects - Solvara Studio',
    'Kumpulan project Solvara Studio: ciper, LinguaPath, MajorMind, dan SMANTEN.':
        'A collection of Solvara Studio projects: ciper, LinguaPath, MajorMind, and SMANTEN.',
    'Project library': 'Project library',
    'Project yang sudah punya konteks nyata.': 'Projects with real context.',
    'Dari starter Laravel sampai portal sekolah kompleks, setiap project punya kebutuhan, fitur, dan pendekatan UI yang berbeda.':
        'From a Laravel starter to a complex school portal, every project has different needs, features, and UI approaches.',
    'Kembali ke Solvara Studio': 'Back to Solvara Studio',
    Landing: 'Landing',
    'Diskusi Project': 'Discuss Project',
    'Detail project': 'Project details',
    'Buka live': 'Open live',
    'Project detail': 'Project detail',
    'Buka live project': 'Open live project',
    'Semua project': 'All projects',
    Project: 'Project',
    Diskusi: 'Discuss',
    'Project lain': 'Other projects',
    'Lihat konteks berbeda.': 'Explore different contexts.',
    'Project breakdown': 'Project breakdown',
    'Scope, alur, dan hasil dibuat jelas dari awal.':
        'Scope, workflow, and outcomes are clarified from the start.',
    Problem: 'Problem',
    Outcome: 'Outcome',
    Workflow: 'Workflow',
    'Alur pengerjaan': 'Workflow',
    'Fitur utama': 'Core features',
    'Animasi dan UI advanced': 'Advanced animation and UI',
    item: 'items',
    'Tech stack': 'Tech stack',
    'Dibangun dengan stack yang sesuai kebutuhan produk.':
        'Built with a stack that fits the product needs.',
    'Hover nama stack untuk melihat logo. Bagian ini sengaja dibuat seperti technical note, bukan daftar chip.':
        'Hover a stack name to see its logo. This section is intentionally written like a technical note, not a chip list.',
    'Project ini dibangun dengan': 'This project was built with',
    '. Stack dipilih untuk menjaga alur development tetap cepat, interface mudah dikembangkan, backend rapi, dan quality check tetap realistis untuk kebutuhan project.':
        '. The stack was chosen to keep development fast, interfaces easy to extend, backend structure clean, and quality checks realistic for project needs.',
    'Aktifkan mode gelap': 'Enable dark mode',
    'Aktifkan mode terang': 'Enable light mode',
    'Mode gelap': 'Dark mode',
    'Mode terang': 'Light mode',
    step: 'steps',
    Lihat: 'View',
    'Screenshot project': 'Project screenshot',
    'Preview video project': 'Project video preview',
    'Starter Laravel + React untuk fondasi aplikasi yang butuh auth, dashboard, settings, dan struktur UI awal sebelum masuk ke domain bisnis khusus.':
        'A Laravel + React starter for applications that need auth, dashboard, settings, and an initial UI structure before entering a specific business domain.',
    'Project ini berfungsi sebagai fondasi aplikasi. Fokusnya bukan domain bisnis tertentu, tetapi menyiapkan struktur awal yang rapi agar SaaS, sistem admin, atau dashboard internal bisa mulai dibangun lebih cepat.':
        'This project works as an application foundation. The focus is not a specific business domain, but a clean initial structure so SaaS, admin systems, or internal dashboards can start faster.',
    'Auth flow, dashboard dasar, settings, dan UI starter sudah siap sebagai base yang bisa dikembangkan menjadi produk operasional.':
        'Auth flow, base dashboard, settings, and starter UI are ready as a foundation that can grow into an operational product.',
    'ciper dibuat sebagai base aplikasi agar produk Laravel + React tidak perlu selalu dimulai dari halaman kosong. Struktur awalnya sudah menutup kebutuhan umum seperti auth, dashboard, settings, appearance, dan layout authenticated.':
        'ciper was created as an application base so Laravel + React products do not always start from a blank page. The initial structure already covers common needs like auth, dashboard, settings, appearance, and authenticated layout.',
    'Fondasi ini cocok ketika project berikutnya perlu langsung masuk ke modul bisnis: data, role, billing, workflow internal, atau dashboard operasional tanpa mengulang shell UI dari awal.':
        'This foundation fits when the next project needs to jump straight into business modules: data, roles, billing, internal workflows, or operational dashboards without rebuilding the UI shell.',
    'Core flow': 'Core flow',
    'Auth, dashboard, settings, appearance, dan security flow':
        'Auth, dashboard, settings, appearance, and security flow',
    Frontend: 'Frontend',
    'React 19, TypeScript, Tailwind v4, dan reusable UI shell':
        'React 19, TypeScript, Tailwind v4, and reusable UI shell',
    Backend: 'Backend',
    'Laravel 13, Fortify, Wayfinder, dan route typing':
        'Laravel 13, Fortify, Wayfinder, and route typing',
    Quality: 'Quality',
    'Pest, Pint, Vite build, dan struktur siap modular':
        'Pest, Pint, Vite build, and modular-ready structure',
    'Audit kebutuhan aplikasi dan modul awal':
        'Audit application needs and initial modules',
    'Aktifkan auth, settings, dan layout authenticated':
        'Enable auth, settings, and authenticated layout',
    'Rapikan komponen UI agar siap dipakai ulang':
        'Clean up UI components so they are reusable',
    'Siapkan fondasi untuk modul bisnis berikutnya':
        'Prepare the foundation for the next business modules',
    'Landing page Laravel starter': 'Laravel starter landing page',
    'Login, register, forgot password, reset password, verify email, confirm password, dan 2FA challenge':
        'Login, registration, forgot password, reset password, email verification, password confirmation, and 2FA challenge',
    'Dashboard dasar dengan placeholder layout':
        'Base dashboard with placeholder layout',
    'Settings untuk profile, security, password, dan appearance':
        'Settings for profile, security, password, and appearance',
    'Fondasi untuk SaaS, dashboard internal, atau sistem admin':
        'Foundation for SaaS, internal dashboards, or admin systems',
    'Tailwind transition untuk state dasar':
        'Tailwind transitions for base states',
    'Radix animation state untuk dialog, sheet, dan dropdown':
        'Radix animation states for dialogs, sheets, and dropdowns',
    'tw-animate-css, skeleton loading, dan spinner':
        'tw-animate-css, skeleton loading, and spinner',
    'Belum memakai Framer Motion, GSAP, atau 3D scene khusus':
        'Not yet using Framer Motion, GSAP, or custom 3D scenes',
    'Starter siap dikembangkan': 'Starter ready to extend',
    'Auth lengkap': 'Complete auth',
    'UI system dasar': 'Base UI system',
    'Wayfinder-ready': 'Wayfinder-ready',
    'Cocok sebagai boilerplate saat bisnis butuh mempercepat fase awal aplikasi tanpa membangun auth dan layout dari nol.':
        'Suitable as a boilerplate when a business needs to speed up the early application phase without building auth and layout from zero.',
    'Aplikasi EdTech full-stack untuk belajar bahasa Inggris, latihan TOEFL ITP-style, SRS vocabulary, mistake journal, dan analytics belajar.':
        'A full-stack EdTech application for English learning, TOEFL ITP-style practice, SRS vocabulary, mistake journal, and learning analytics.',
    'Platform belajar bahasa membutuhkan alur belajar bertahap, latihan yang tersimpan, evaluasi progress, dan admin panel untuk mengelola konten pembelajaran.':
        'A language learning platform needs staged learning flows, saved practice, progress evaluation, and an admin panel for learning content management.',
    'LinguaPath berkembang menjadi produk EdTech matang dengan study path, practice mode, exam simulation, vocabulary SRS, mistake journal, writing/speaking practice, analytics, dan admin panel.':
        'LinguaPath evolved into a mature EdTech product with study paths, practice mode, exam simulation, vocabulary SRS, mistake journal, writing/speaking practice, analytics, and admin panel.',
    'LinguaPath dirancang sebagai platform belajar TOEFL ITP-style dengan perjalanan belajar yang terstruktur. User tidak hanya membaca materi, tetapi juga masuk ke latihan, simulasi, review kesalahan, vocabulary SRS, dan analytics progress.':
        'LinguaPath is designed as a TOEFL ITP-style learning platform with a structured learning journey. Users do not only read material, but also practice, simulate exams, review mistakes, use vocabulary SRS, and track progress analytics.',
    'Sisi admin dibuat untuk mengelola konten pembelajaran, soal, reading passage, audio, dan review aset, sehingga platform bisa berkembang sebagai produk EdTech yang kontennya terus bertambah.':
        'The admin side manages learning content, questions, reading passages, audio, and asset review, so the platform can grow as an EdTech product with expanding content.',
    'Learning flow': 'Learning flow',
    'Study path, lesson, practice, exam simulation, dan result':
        'Study path, lesson, practice, exam simulation, and result',
    Retention: 'Retention',
    'Vocabulary SRS, mistake journal, review status, dan feedback':
        'Vocabulary SRS, mistake journal, review status, and feedback',
    Analytics: 'Analytics',
    'Progress belajar, performa skill, intensitas latihan, dan charts':
        'Learning progress, skill performance, practice intensity, and charts',
    Admin: 'Admin',
    'Question bank, passage, audio assets, bulk review, dan import':
        'Question bank, passages, audio assets, bulk review, and import',
    'Petakan journey belajar dan tipe latihan':
        'Map the learning journey and practice types',
    'Bangun engine latihan, exam, dan answer tracking':
        'Build the practice, exam, and answer tracking engine',
    'Tambahkan review kesalahan, SRS, dan analytics':
        'Add mistake review, SRS, and analytics',
    'Siapkan admin workflow untuk konten pembelajaran':
        'Prepare the admin workflow for learning content',
    '60-day study path untuk belajar bertahap':
        '60-day study path for staged learning',
    'Lesson page dengan section pembelajaran dan mini-test':
        'Lesson pages with learning sections and mini-tests',
    'Practice mode dengan setup, sesi latihan, answer tracking, dan result':
        'Practice mode with setup, practice sessions, answer tracking, and results',
    'Exam simulation TOEFL ITP-style dengan section, timer, server-saved answer, dan result page':
        'TOEFL ITP-style exam simulation with sections, timer, server-saved answers, and result page',
    'Vocabulary SRS, flashcard, quiz, dan status tracking':
        'Vocabulary SRS, flashcards, quizzes, and status tracking',
    'Mistake journal untuk jawaban salah, review status, dan penjelasan':
        'Mistake journal for wrong answers, review status, and explanations',
    'Speaking dan writing practice dengan feedback heuristik':
        'Speaking and writing practice with heuristic feedback',
    'Analytics dashboard untuk progress, intensitas latihan, dan performa skill':
        'Analytics dashboard for progress, practice intensity, and skill performance',
    'Admin panel untuk questions, reading passages, audio assets, review audio, bulk review, dan import listening audio':
        'Admin panel for questions, reading passages, audio assets, audio review, bulk review, and listening audio import',
    'Framer Motion untuk study path, analytics, vocabulary, lesson, practice, dan mistakes':
        'Framer Motion for study paths, analytics, vocabulary, lessons, practice, and mistakes',
    'Progress bar animation, fade-up section, staggered content, card entrance, tab indicator, dan flip card vocabulary':
        'Progress bar animation, fade-up sections, staggered content, card entrance, tab indicators, and vocabulary flip cards',
    'Visual grainient, gradient text, magic bento, shape grid, spotlight card, magnet, dan count-up':
        'Visual grainient, gradient text, magic bento, shape grid, spotlight card, magnet, and count-up',
    'Recharts membuat dashboard terasa data-driven, bukan halaman statis':
        'Recharts makes the dashboard feel data-driven, not like a static page',
    'EdTech full-stack': 'Full-stack EdTech',
    'Exam simulation': 'Exam simulation',
    'Vocabulary SRS': 'Vocabulary SRS',
    'Admin content workflow': 'Admin content workflow',
    'Cocok untuk platform pembelajaran yang membutuhkan materi, latihan, progress tracking, dan panel admin yang kuat.':
        'Suitable for learning platforms that need materials, practice, progress tracking, and a strong admin panel.',
    'Sistem rekomendasi jurusan berbasis multi-algoritma untuk membantu siswa memilih jurusan dengan assessment, ranking, scenario lab, dan explainability.':
        'A multi-algorithm major recommendation system that helps students choose majors with assessments, rankings, scenario labs, and explainability.',
    'Rekomendasi jurusan tidak cukup hanya berupa quiz sederhana. Sistem perlu membaca profil siswa, psikometri, constraint, bobot kriteria, dan memberi hasil yang bisa dijelaskan.':
        'Major recommendation cannot stop at a simple quiz. The system needs to read student profiles, psychometrics, constraints, criteria weights, and provide explainable results.',
    'MajorMind menggabungkan RIASEC, Grit Scale, adaptive logic test, AHP, TOPSIS, SAW, profile matching, scenario lab, comparison, insights, dan export PDF.':
        'MajorMind combines RIASEC, Grit Scale, adaptive logic test, AHP, TOPSIS, SAW, profile matching, scenario lab, comparison, insights, and PDF export.',
    'MajorMind dibangun untuk membantu siswa mengambil keputusan jurusan dengan data yang lebih bisa dijelaskan. Sistem membaca minat, grit, logic test, constraint, bobot kriteria, dan beberapa algoritma scoring sebelum memberi ranking.':
        'MajorMind is built to help students make major decisions with more explainable data. The system reads interests, grit, logic tests, constraints, criteria weights, and several scoring algorithms before producing rankings.',
    'Bagian pentingnya bukan hanya hasil akhir, tetapi explainability. User bisa melihat perbandingan, sensitivity analysis, scenario lab, breakdown algoritma, sampai export PDF untuk diskusi lanjutan.':
        'The important part is not only the final result, but explainability. Users can view comparisons, sensitivity analysis, scenario labs, algorithm breakdowns, and export PDFs for further discussion.',
    Assessment: 'Assessment',
    'RIASEC, Grit Scale, adaptive logic test, dan profile input':
        'RIASEC, Grit Scale, adaptive logic test, and profile input',
    Scoring: 'Scoring',
    'AHP, TOPSIS, SAW, profile matching, dan RIASEC affinity':
        'AHP, TOPSIS, SAW, profile matching, and RIASEC affinity',
    'Decision lab': 'Decision lab',
    'Scenario, comparison, Monte Carlo, insight, dan sensitivity':
        'Scenario, comparison, Monte Carlo, insight, and sensitivity',
    'Dashboard hasil, explainability, dan export PDF':
        'Result dashboard, explainability, and PDF export',
    'Definisikan kriteria, constraint, dan bobot keputusan':
        'Define criteria, constraints, and decision weights',
    'Bangun assessment engine dan scoring pipeline':
        'Build the assessment engine and scoring pipeline',
    'Tambahkan comparison, scenario lab, dan visual explainability':
        'Add comparison, scenario lab, and visual explainability',
    'Validasi output agar ranking bisa dipahami user':
        'Validate outputs so rankings are understandable to users',
    'Landing page modern untuk sistem rekomendasi jurusan':
        'Modern landing page for a major recommendation system',
    'Assessment engine untuk input profil siswa':
        'Assessment engine for student profile input',
    'RIASEC assessment 48 item dan Grit Scale':
        '48-item RIASEC assessment and Grit Scale',
    'Adaptive Logic Test berbasis IRT/CAT': 'IRT/CAT-based Adaptive Logic Test',
    'AHP untuk bobot kriteria dan consistency ratio':
        'AHP for criteria weights and consistency ratio',
    'TOPSIS, SAW, profile matching, dan RIASEC affinity untuk final scoring':
        'TOPSIS, SAW, profile matching, and RIASEC affinity for final scoring',
    'Hard constraint filtering untuk jurusan tertentu':
        'Hard constraint filtering for specific majors',
    'Dashboard hasil asesmen': 'Assessment result dashboard',
    'Scenario Lab dengan sensitivity analysis, comparison, Monte Carlo, dan save scenario':
        'Scenario Lab with sensitivity analysis, comparison, Monte Carlo, and save scenario',
    'Comparison page dengan matrix, spider chart, Pareto, algorithm breakdown, dan decision scoring':
        'Comparison page with matrix, spider chart, Pareto, algorithm breakdown, and decision scoring',
    'Insights page dan export PDF untuk dashboard, comparison, dan insight':
        'Insights page and PDF export for dashboard, comparison, and insight',
    'Firebase Google login': 'Firebase Google login',
    'Three.js custom canvas untuk neural-brain-3d, paradigm-shift-3d, core-reactor-3d, neural-network-3d, laser-flow, dan header 3D':
        'Three.js custom canvas for neural-brain-3d, paradigm-shift-3d, core-reactor-3d, neural-network-3d, laser-flow, and 3D header',
    'Framer Motion untuk page transition, scroll progress, entrance animation, dan micro-interaction':
        'Framer Motion for page transitions, scroll progress, entrance animations, and micro-interactions',
    'SVG animate untuk radar dan network visual':
        'SVG animation for radar and network visuals',
    'UI futuristik dengan dark interface, glow effect, matrix-like visualization, radar/spider chart, dan explainability dashboard':
        'Futuristic UI with dark interface, glow effects, matrix-like visualization, radar/spider charts, and explainability dashboard',
    'Multi-algorithm scoring': 'Multi-algorithm scoring',
    'Scenario Lab': 'Scenario Lab',
    'Explainability dashboard': 'Explainability dashboard',
    'PDF export': 'PDF export',
    'Cocok untuk produk assessment, rekomendasi, dan dashboard keputusan yang membutuhkan logika scoring yang bisa diaudit.':
        'Suitable for assessment, recommendation, and decision dashboard products that need auditable scoring logic.',
    'Portal sekolah lengkap untuk SMAN 1 Tenjo dengan public site, CMS, dashboard internal, PPDB, alumni, jadwal, dan role-based access.':
        'A complete school portal for SMAN 1 Tenjo with public site, CMS, internal dashboards, PPDB, alumni, schedules, and role-based access.',
    'Portal sekolah membutuhkan public site yang informatif, CMS yang mudah dikelola, dashboard internal multi-role, PPDB, data alumni, jadwal, media, dan layanan sekolah.':
        'A school portal needs an informative public site, easy-to-manage CMS, multi-role internal dashboards, PPDB, alumni data, schedules, media, and school services.',
    'SMANTEN berkembang menjadi platform digital sekolah yang menggabungkan website publik, admin CMS, dashboard guru/siswa/wali, PPDB, alumni, virtual tour, map, dan internal API.':
        'SMANTEN evolved into a school digital platform combining a public website, admin CMS, teacher/student/parent dashboards, PPDB, alumni, virtual tour, map, and internal API.',
    'SMANTEN dibuat sebagai platform sekolah yang menyatukan website publik, CMS, PPDB, dashboard internal, data akademik, alumni, media, jadwal, dan layanan sekolah dalam satu sistem.':
        'SMANTEN was built as a school platform that unifies the public website, CMS, PPDB, internal dashboards, academic data, alumni, media, schedules, and school services in one system.',
    'Strukturnya disiapkan untuk banyak role. Admin mengelola konten dan data, guru/siswa/wali masuk ke dashboard sesuai kebutuhan, sementara pengunjung publik tetap mendapat pengalaman website yang rapi dan informatif.':
        'The structure supports many roles. Admins manage content and data, teachers/students/parents access dashboards based on needs, while public visitors still get a clean and informative website experience.',
    'Public site': 'Public site',
    'Profil, akademik, kesiswaan, PPDB, media, layanan, dan berita':
        'Profile, academics, student affairs, PPDB, media, services, and news',
    Dashboard: 'Dashboard',
    'Admin, guru, siswa, wali, role access, dan data operasional':
        'Admin, teachers, students, parents, role access, and operational data',
    CMS: 'CMS',
    'Artikel, organisasi, portfolio, guru, siswa, jadwal, dan media':
        'Articles, organizations, portfolio, teachers, students, schedules, and media',
    Experience: 'Experience',
    'Virtual tour, map, alumni, sitemap XML, dan internal API':
        'Virtual tour, map, alumni, XML sitemap, and internal API',
    'Kelompokkan kebutuhan publik, admin, dan role internal':
        'Group public, admin, and internal role needs',
    'Bangun CMS, dashboard, PPDB, alumni, dan jadwal':
        'Build CMS, dashboards, PPDB, alumni, and schedules',
    'Integrasikan media, map, virtual tour, dan internal API':
        'Integrate media, maps, virtual tour, and internal API',
    'Rapikan navigasi agar portal tetap mudah dipakai banyak user':
        'Clean up navigation so the portal stays easy for many user types',
    'Public site: home, profil sekolah, akademik, kesiswaan, PPDB, media, berita, layanan, dokumen, organisasi, guru, ekstrakurikuler, alumni, alumni story, virtual tour, dan sitemap XML':
        'Public site: home, school profile, academics, student affairs, PPDB, media, news, services, documents, organizations, teachers, extracurriculars, alumni, alumni stories, virtual tour, and XML sitemap',
    'Dashboard admin, guru, siswa, dan wali':
        'Admin, teacher, student, and parent dashboards',
    'Admin PPDB dan detail aplikasi': 'PPDB admin and application details',
    'Manajemen artikel, organisasi, portfolio, guru, siswa, jadwal, dan website portal':
        'Management for articles, organizations, portfolios, teachers, students, schedules, and website portal',
    'Internal API untuk rooms, timetable, roles, media assets, organization assignments, CSV export, dan moderation':
        'Internal API for rooms, timetables, roles, media assets, organization assignments, CSV export, and moderation',
    'Framer Motion luas untuk hero animation, scroll transform, staggered cards, dan page entrance':
        'Broad Framer Motion usage for hero animation, scroll transforms, staggered cards, and page entrance',
    'HeroScene 3D, virtual tour panorama viewer, circular gallery, animated counter, border glow, global command palette, dan interactive organization chart':
        'HeroScene 3D, virtual tour panorama viewer, circular gallery, animated counters, border glow, global command palette, and interactive organization chart',
    'Leaflet untuk lokasi, alumni, geocode, dan PPDB distance map':
        'Leaflet for locations, alumni, geocoding, and PPDB distance map',
    'Recharts untuk dashboard internal dan statistik':
        'Recharts for internal dashboards and statistics',
    'Portal institusi kompleks': 'Complex institution portal',
    'Role-based dashboard': 'Role-based dashboard',
    'PPDB workflow': 'PPDB workflow',
    'Virtual tour dan map': 'Virtual tour and map',
    'Cocok untuk institusi pendidikan atau organisasi yang membutuhkan public site, CMS, dashboard internal, dan data operasional dalam satu platform.':
        'Suitable for educational institutions or organizations that need a public site, CMS, internal dashboards, and operational data in one platform.',
    'Fondasinya enak untuk mulai project baru. Auth, settings, dan layout dashboard sudah rapi, jadi pengembangan bisa langsung fokus ke domain aplikasinya.':
        'The foundation is comfortable for starting new projects. Auth, settings, and dashboard layout are already clean, so development can focus directly on the application domain.',
    'Alur belajarnya terasa jelas. Study path, latihan, simulasi exam, dan vocabulary review punya tempat masing-masing tanpa membuat pengguna bingung.':
        'The learning flow feels clear. Study paths, practice, exam simulation, and vocabulary review each have their own place without confusing users.',
    'Bagian admin cukup matang untuk mengelola question, reading passage, audio asset, dan review konten. Workflow-nya tidak terasa seperti tempelan.':
        'The admin side is mature enough to manage questions, reading passages, audio assets, and content review. The workflow does not feel bolted on.',
    'MajorMind tidak berhenti di quiz jurusan biasa. Ada scoring, constraint, comparison, dan insight yang membuat hasil rekomendasi lebih bisa dijelaskan.':
        'MajorMind does not stop at a normal major quiz. Scoring, constraints, comparison, and insights make the recommendation results more explainable.',
    'Scenario Lab dan comparison page membantu melihat perubahan bobot dan dampaknya. Visualisasinya kuat, tapi tetap punya konteks keputusan.':
        'Scenario Lab and the comparison page help show weight changes and their impact. The visuals are strong, but still carry decision context.',
    'Struktur portal sekolahnya lengkap. Public site, berita, layanan, dokumen, guru, alumni, dan PPDB terasa berada dalam satu sistem yang konsisten.':
        'The school portal structure is complete. Public site, news, services, documents, teachers, alumni, and PPDB feel like one consistent system.',
    'Role dashboard untuk admin, guru, siswa, dan wali membuat platform ini terasa operasional. Data sekolah tidak hanya tampil, tapi bisa dikelola.':
        'Role dashboards for admins, teachers, students, and parents make this platform feel operational. School data is not only displayed, but manageable.',
    'Yang paling terasa adalah detail teknisnya dicatat. Dari route, asset, form, responsive layout, sampai testing flow, semuanya punya alasan yang jelas.':
        'The most noticeable part is that technical details are documented. From routes, assets, forms, responsive layout, to testing flow, everything has a clear reason.',
};

export const translate = (language: Language, text: string): string => {
    if (language === 'id') {
        return text;
    }

    return en[text] ?? text;
};

export const translateArray = (
    language: Language,
    items: readonly string[],
): string[] => items.map((item) => translate(language, item));

export const useTranslator = () => {
    const { language } = useLanguage();
    const t = useCallback(
        (text: string): string => translate(language, text),
        [language],
    );

    return { language, t } as const;
};

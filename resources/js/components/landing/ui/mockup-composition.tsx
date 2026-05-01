import {
    ArrowUpRight,
    Check,
    Cpu,
    Gauge,
    Layers,
    ShieldCheck,
    Smartphone,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const timeline = [
    { label: 'Discovery', state: 'done' },
    { label: 'UX', state: 'done' },
    { label: 'UI', state: 'done' },
    { label: 'Build', state: 'active' },
    { label: 'QA', state: 'pending' },
    { label: 'Launch', state: 'pending' },
] as const;

const checklist = [
    { label: 'Responsive', done: true },
    { label: 'Forms', done: true },
    { label: 'SEO draft', done: true },
] as const;

export function MockupComposition() {
    const reduce = useReducedMotion();

    const float = reduce
        ? {}
        : {
              animate: { y: [0, -6, 0] },
              transition: {
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut' as const,
              },
          };

    return (
        <div
            className="relative aspect-[5/6] w-full max-w-[560px]"
            aria-label="Komposisi visual workspace project Solvara"
            role="img"
        >
            {/* Browser shell — main surface */}
            <motion.div
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-0 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.18)]"
            >
                {/* top bar */}
                <div className="flex items-center justify-between border-b border-line/80 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                        <span className="size-2.5 rounded-full bg-[#FCD7D3]" />
                        <span className="size-2.5 rounded-full bg-[#FBE9C5]" />
                        <span className="size-2.5 rounded-full bg-[#D5EDDF]" />
                    </div>
                    <div className="hidden items-center gap-2 rounded-md border border-line bg-soft px-3 py-1 text-[10px] text-muted-ink sm:flex">
                        <span className="font-mono">
                            solvara.studio/workspace
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="rounded-full bg-mint px-2 py-0.5 text-[9px] font-medium tracking-wider text-teal uppercase">
                            Build ready
                        </span>
                    </div>
                </div>

                {/* main area */}
                <div className="grid grid-cols-12 gap-4 p-5">
                    <div className="col-span-12 sm:col-span-7">
                        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-ink uppercase">
                            <span className="size-1 rounded-full bg-gold" />
                            Project workspace
                        </div>
                        <div className="mt-3 font-display text-[22px] leading-[1.15] text-ink">
                            Booking flow.
                            <span className="block text-teal italic">
                                Live preview.
                            </span>
                        </div>
                        <div className="mt-4 space-y-2">
                            <div className="h-2 w-11/12 rounded-full bg-soft" />
                            <div className="h-2 w-9/12 rounded-full bg-soft" />
                            <div className="h-2 w-7/12 rounded-full bg-soft" />
                        </div>

                        {/* timeline */}
                        <div className="mt-5">
                            <div className="text-[10px] tracking-[0.2em] text-muted-ink uppercase">
                                Project timeline
                            </div>
                            <ol className="mt-2 grid grid-cols-6 gap-1.5">
                                {timeline.map((step) => (
                                    <li
                                        key={step.label}
                                        className="flex flex-col items-start gap-1"
                                    >
                                        <span
                                            className={
                                                step.state === 'done'
                                                    ? 'block h-1 w-full rounded-full bg-[var(--color-teal)]'
                                                    : step.state === 'active'
                                                      ? 'block h-1 w-full rounded-full bg-gold'
                                                      : 'block h-1 w-full rounded-full bg-line'
                                            }
                                        />
                                        <span
                                            className={
                                                step.state === 'pending'
                                                    ? 'text-[9px] text-muted-ink'
                                                    : 'text-[9px] text-ink'
                                            }
                                        >
                                            {step.label}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    {/* small preview list */}
                    <div className="col-span-12 sm:col-span-5">
                        <div className="rounded-xl border border-line bg-soft/60 p-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] tracking-[0.2em] text-muted-ink uppercase">
                                    Live previews
                                </span>
                                <ArrowUpRight
                                    aria-hidden
                                    className="size-3 text-muted-ink"
                                />
                            </div>
                            <ul className="mt-2 space-y-1.5">
                                {[
                                    'Booking flow',
                                    'Admin dashboard',
                                    'Landing campaign',
                                ].map((label, idx) => (
                                    <li
                                        key={label}
                                        className="flex items-center justify-between rounded-md border border-line bg-white px-2.5 py-1.5"
                                    >
                                        <span className="flex items-center gap-2 text-[11px] text-ink">
                                            <span className="size-1.5 rounded-full bg-gold" />
                                            {label}
                                        </span>
                                        <span
                                            className={
                                                idx === 0
                                                    ? 'rounded-full bg-mint px-1.5 py-0.5 text-[9px] font-medium text-teal'
                                                    : 'text-[9px] text-muted-ink'
                                            }
                                        >
                                            {idx === 0 ? 'Active' : 'Draft'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Floating mobile preview (bottom-left) */}
            <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                    duration: 0.7,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -bottom-2 left-0 sm:left-2"
            >
                <motion.div {...float} className="solvara-blob">
                    <div className="w-[150px] rounded-[22px] border border-line bg-white p-2 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.25)]">
                        <div className="rounded-[16px] bg-mint p-3">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1 text-[9px] font-medium tracking-wider text-teal uppercase">
                                    <Smartphone
                                        aria-hidden
                                        className="size-3"
                                    />
                                    Booking flow
                                </span>
                                <span className="size-1 rounded-full bg-gold" />
                            </div>
                            <div className="mt-2 space-y-1.5">
                                <div className="h-1.5 w-3/4 rounded-full bg-white/70" />
                                <div className="h-1.5 w-2/3 rounded-full bg-white/70" />
                                <div className="h-1.5 w-1/2 rounded-full bg-white/70" />
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-1.5">
                                <div className="rounded-md bg-white/80 p-1.5">
                                    <div className="text-[8px] tracking-wider text-muted-ink uppercase">
                                        Date
                                    </div>
                                    <div className="text-[10px] font-medium text-ink">
                                        12 Mei
                                    </div>
                                </div>
                                <div className="rounded-md bg-white/80 p-1.5">
                                    <div className="text-[8px] tracking-wider text-muted-ink uppercase">
                                        Slot
                                    </div>
                                    <div className="text-[10px] font-medium text-ink">
                                        09:30
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 rounded-full bg-[var(--color-teal)] px-2 py-1 text-center text-[9px] font-medium text-white">
                                Konfirmasi booking
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Status panel (bottom-right) */}
            <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                    duration: 0.7,
                    delay: 0.18,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute right-0 -bottom-4 sm:right-2"
            >
                <div className="w-[210px] rounded-2xl border border-line bg-white p-3 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.2)]">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] tracking-[0.2em] text-muted-ink uppercase">
                            Current build
                        </span>
                        <span className="flex items-center gap-1 rounded-full bg-mint px-2 py-0.5 text-[9px] font-medium text-teal">
                            <span className="size-1 animate-pulse rounded-full bg-[var(--color-teal)]" />
                            Staging ready
                        </span>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                        {checklist.map((item) => (
                            <li
                                key={item.label}
                                className="flex items-center gap-2 text-[11px] text-ink"
                            >
                                <span className="flex size-4 items-center justify-center rounded-full bg-mint text-teal">
                                    <Check
                                        aria-hidden
                                        className="size-2.5 stroke-[3]"
                                    />
                                </span>
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>

            {/* Performance chip (top-right) */}
            <motion.div
                initial={reduce ? false : { opacity: 0, y: -10 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                    duration: 0.7,
                    delay: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -top-3 right-2 sm:right-6"
            >
                <motion.div
                    animate={reduce ? undefined : { y: [0, -4, 0] }}
                    transition={
                        reduce
                            ? undefined
                            : {
                                  duration: 7,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                              }
                    }
                    className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.25)]"
                >
                    <Gauge aria-hidden className="size-3.5 text-teal" />
                    <span className="text-[11px] font-medium text-ink">
                        90+ target
                    </span>
                    <span className="text-[10px] text-muted-ink">
                        core pages
                    </span>
                </motion.div>
            </motion.div>

            {/* API chip (mid-left) */}
            <motion.div
                initial={reduce ? false : { opacity: 0, x: -10 }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                    duration: 0.7,
                    delay: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute top-[34%] left-0"
            >
                <div className="rounded-xl border border-line bg-white px-3 py-2 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.2)]">
                    <div className="flex items-center gap-2">
                        <span className="flex size-6 items-center justify-center rounded-md bg-mist">
                            <Cpu aria-hidden className="size-3 text-teal" />
                        </span>
                        <div>
                            <div className="text-[10px] tracking-[0.2em] text-muted-ink uppercase">
                                API
                            </div>
                            <div className="text-[11px] font-medium text-ink">
                                REST
                            </div>
                        </div>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-muted-ink">
                        <ShieldCheck aria-hidden className="size-3 text-teal" />
                        Sanctum auth
                    </div>
                </div>
            </motion.div>

            {/* Decorative thin grid + dot accents */}
            <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-6 inset-y-0 -z-10"
                style={{
                    background:
                        'radial-gradient(60% 60% at 80% 10%, color-mix(in srgb, var(--color-mint) 60%, transparent), transparent 70%), radial-gradient(50% 50% at 5% 80%, color-mix(in srgb, var(--color-mist) 60%, transparent), transparent 70%)',
                }}
            />

            {/* Layers tag (top-left) */}
            <div className="pointer-events-none absolute -top-2 left-3 hidden items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-[10px] text-muted-ink shadow-[0_8px_20px_-14px_rgba(15,23,42,0.2)] sm:flex">
                <Layers aria-hidden className="size-3 text-gold" />
                4-step handover
            </div>
        </div>
    );
}

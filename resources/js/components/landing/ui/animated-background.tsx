/**
 * Subtle, performance-friendly animated background for the hero/landing.
 * Uses 3 soft blobs (mint/mist/gold) animated via CSS keyframes (declared in app.css).
 * Respects prefers-reduced-motion.
 */
export function AnimatedBackground() {
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
            <div className="absolute inset-x-0 top-0 h-px bg-line" />

            <div
                className="solvara-blob solvara-blob-a absolute top-[-10%] -left-32 h-[520px] w-[520px] rounded-full opacity-70 blur-3xl"
                style={{
                    background:
                        'radial-gradient(closest-side, color-mix(in srgb, var(--color-mint) 80%, transparent), transparent 70%)',
                }}
            />
            <div
                className="solvara-blob solvara-blob-b absolute top-[10%] -right-40 h-[640px] w-[640px] rounded-full opacity-65 blur-3xl"
                style={{
                    background:
                        'radial-gradient(closest-side, color-mix(in srgb, var(--color-mist) 90%, transparent), transparent 70%)',
                }}
            />
            <div
                className="solvara-blob solvara-blob-c absolute top-[55%] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
                style={{
                    background:
                        'radial-gradient(closest-side, color-mix(in srgb, var(--color-gold) 35%, transparent), transparent 70%)',
                }}
            />

            {/* Editorial grid lines, very faint */}
            <div
                className="absolute inset-0 opacity-[0.35]"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, color-mix(in srgb, var(--color-line) 60%, transparent) 1px, transparent 1px)',
                    backgroundSize: '120px 100%',
                    maskImage:
                        'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
                }}
            />
        </div>
    );
}

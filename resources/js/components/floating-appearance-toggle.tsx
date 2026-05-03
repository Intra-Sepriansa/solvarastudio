import { Moon, Sun } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

type FloatingAppearanceToggleProps = {
    className?: string;
};

export default function FloatingAppearanceToggle({
    className,
}: FloatingAppearanceToggleProps) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isLightMode = resolvedAppearance === 'light';
    const Icon = isLightMode ? Moon : Sun;

    return (
        <button
            type="button"
            onClick={() => updateAppearance(isLightMode ? 'dark' : 'light')}
            aria-label={
                isLightMode ? 'Aktifkan mode gelap' : 'Aktifkan mode terang'
            }
            className={cn(
                'fixed right-5 bottom-5 z-50 inline-flex size-13 items-center justify-center rounded-full border backdrop-blur-2xl transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#a7e33d]/60 focus-visible:outline-none sm:right-7 sm:bottom-7',
                isLightMode
                    ? 'border-black/12 bg-white text-black shadow-[0_18px_60px_rgba(11,17,16,0.18)] hover:bg-white/92'
                    : 'border-[#a7e33d]/55 bg-[#a7e33d] text-black shadow-[0_18px_60px_rgba(167,227,61,0.34)] ring-1 ring-black/12 hover:bg-[#b8ef55]',
                className,
            )}
        >
            <Icon className="size-5" strokeWidth={2.2} aria-hidden />
            <span className="sr-only">
                {isLightMode ? 'Mode gelap' : 'Mode terang'}
            </span>
        </button>
    );
}

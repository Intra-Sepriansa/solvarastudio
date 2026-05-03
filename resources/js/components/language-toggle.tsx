import { Languages } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { cn } from '@/lib/utils';

type LanguageToggleProps = {
    className?: string;
    tone?: 'dark' | 'light' | 'adaptive';
};

export default function LanguageToggle({
    className,
    tone = 'adaptive',
}: LanguageToggleProps) {
    const { language, updateLanguage } = useLanguage();
    const isDarkTone = tone === 'dark';
    const isAdaptiveTone = tone === 'adaptive';

    return (
        <div
            className={cn(
                'inline-flex h-10 items-center gap-1 rounded-full border p-1 shadow-sm',
                isAdaptiveTone
                    ? 'border-black/12 bg-white/86 text-black dark:border-white/12 dark:bg-white/8 dark:text-white'
                    : isDarkTone
                      ? 'border-white/12 bg-white/8 text-white'
                      : 'border-black/12 bg-white/86 text-black',
                className,
            )}
            aria-label="Language selector"
        >
            <Languages
                className={cn(
                    'ml-2 size-4',
                    isAdaptiveTone
                        ? 'text-[#5f8f12] dark:text-[#a7e33d]'
                        : isDarkTone
                          ? 'text-[#a7e33d]'
                          : 'text-[#5f8f12]',
                )}
                aria-hidden
            />
            {(['id', 'en'] as const).map((item) => {
                const isActive = language === item;

                return (
                    <button
                        key={item}
                        type="button"
                        onClick={() => updateLanguage(item)}
                        aria-pressed={isActive}
                        className={cn(
                            'h-7 rounded-full px-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase transition focus-visible:ring-2 focus-visible:outline-none',
                            isActive
                                ? 'bg-[#a7e33d] text-black'
                                : isAdaptiveTone
                                  ? 'text-black/68 hover:bg-black/6 hover:text-black focus-visible:ring-black/20 dark:text-white/64 dark:hover:bg-white/8 dark:hover:text-white dark:focus-visible:ring-white/30'
                                  : isDarkTone
                                    ? 'text-white/58 hover:bg-white/8 hover:text-white focus-visible:ring-white/30'
                                    : 'text-black/68 hover:bg-black/6 hover:text-black focus-visible:ring-black/20',
                        )}
                    >
                        {item}
                    </button>
                );
            })}
        </div>
    );
}

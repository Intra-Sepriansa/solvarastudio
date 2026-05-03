import { motion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface DecryptedTextProps extends HTMLMotionProps<'span'> {
    text: string;
    speed?: number;
    maxIterations?: number;
    sequential?: boolean;
    revealDirection?: 'start' | 'end' | 'center';
    useOriginalCharsOnly?: boolean;
    characters?: string;
    className?: string;
    encryptedClassName?: string;
    parentClassName?: string;
    animateOn?: 'view' | 'hover' | 'inViewHover' | 'click';
    clickMode?: 'once' | 'toggle';
}

type Direction = 'forward' | 'reverse';

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    sequential = false,
    revealDirection = 'start',
    useOriginalCharsOnly = false,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
    className = '',
    parentClassName = '',
    encryptedClassName = '',
    animateOn = 'hover',
    clickMode = 'once',
    ...props
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState<string>(text);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
        new Set(),
    );
    const [hasAnimated, setHasAnimated] = useState<boolean>(false);
    const [isDecrypted, setIsDecrypted] = useState<boolean>(
        animateOn !== 'click',
    );
    const [direction, setDirection] = useState<Direction>('forward');

    const containerRef = useRef<HTMLSpanElement>(null);
    const orderRef = useRef<number[]>([]);
    const pointerRef = useRef<number>(0);
    const intervalRef = useRef<number | null>(null);

    const availableChars = useMemo<string[]>(() => {
        return useOriginalCharsOnly
            ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
            : characters.split('');
    }, [useOriginalCharsOnly, text, characters]);

    const shuffleText = useCallback(
        (originalText: string, currentRevealed: Set<number>) => {
            return originalText
                .split('')
                .map((char, index) => {
                    if (char === ' ') {
                        return ' ';
                    }

                    if (currentRevealed.has(index)) {
                        return originalText[index];
                    }

                    return availableChars[
                        Math.floor(Math.random() * availableChars.length)
                    ];
                })
                .join('');
        },
        [availableChars],
    );

    const computeOrder = useCallback(
        (length: number): number[] => {
            const order: number[] = [];

            if (length <= 0) {
                return order;
            }

            if (revealDirection === 'start') {
                for (let index = 0; index < length; index += 1) {
                    order.push(index);
                }

                return order;
            }

            if (revealDirection === 'end') {
                for (let index = length - 1; index >= 0; index -= 1) {
                    order.push(index);
                }

                return order;
            }

            const middle = Math.floor(length / 2);
            let offset = 0;

            while (order.length < length) {
                if (offset % 2 === 0) {
                    const index = middle + offset / 2;

                    if (index >= 0 && index < length) {
                        order.push(index);
                    }
                } else {
                    const index = middle - Math.ceil(offset / 2);

                    if (index >= 0 && index < length) {
                        order.push(index);
                    }
                }

                offset += 1;
            }

            return order.slice(0, length);
        },
        [revealDirection],
    );

    const fillAllIndices = useCallback((): Set<number> => {
        const indices = new Set<number>();

        for (let index = 0; index < text.length; index += 1) {
            indices.add(index);
        }

        return indices;
    }, [text]);

    const removeRandomIndices = useCallback(
        (set: Set<number>, count: number): Set<number> => {
            const items = Array.from(set);

            for (let index = 0; index < count && items.length > 0; index += 1) {
                const itemIndex = Math.floor(Math.random() * items.length);
                items.splice(itemIndex, 1);
            }

            return new Set(items);
        },
        [],
    );

    const encryptInstantly = useCallback(() => {
        const emptySet = new Set<number>();
        setRevealedIndices(emptySet);
        setDisplayText(shuffleText(text, emptySet));
        setIsDecrypted(false);
    }, [text, shuffleText]);

    const triggerDecrypt = useCallback(() => {
        if (sequential) {
            orderRef.current = computeOrder(text.length);
            pointerRef.current = 0;
        }

        setRevealedIndices(new Set());
        setDirection('forward');
        setIsAnimating(true);
    }, [sequential, computeOrder, text.length]);

    const triggerReverse = useCallback(() => {
        if (sequential) {
            orderRef.current = computeOrder(text.length).slice().reverse();
            pointerRef.current = 0;
        }

        const filledIndices = fillAllIndices();
        setRevealedIndices(filledIndices);
        setDisplayText(shuffleText(text, filledIndices));
        setDirection('reverse');
        setIsAnimating(true);
    }, [sequential, computeOrder, fillAllIndices, shuffleText, text]);

    useEffect(() => {
        if (!isAnimating) {
            return;
        }

        let currentIteration = 0;

        const getNextIndex = (revealedSet: Set<number>): number => {
            const textLength = text.length;

            switch (revealDirection) {
                case 'start':
                    return revealedSet.size;
                case 'end':
                    return textLength - 1 - revealedSet.size;
                case 'center': {
                    const middle = Math.floor(textLength / 2);
                    const offset = Math.floor(revealedSet.size / 2);
                    const nextIndex =
                        revealedSet.size % 2 === 0
                            ? middle + offset
                            : middle - offset - 1;

                    if (
                        nextIndex >= 0 &&
                        nextIndex < textLength &&
                        !revealedSet.has(nextIndex)
                    ) {
                        return nextIndex;
                    }

                    for (let index = 0; index < textLength; index += 1) {
                        if (!revealedSet.has(index)) {
                            return index;
                        }
                    }

                    return 0;
                }
                default:
                    return revealedSet.size;
            }
        };

        intervalRef.current = window.setInterval(() => {
            setRevealedIndices((previousRevealed) => {
                if (sequential) {
                    if (direction === 'forward') {
                        if (previousRevealed.size < text.length) {
                            const nextIndex = getNextIndex(previousRevealed);
                            const nextRevealed = new Set(previousRevealed);
                            nextRevealed.add(nextIndex);
                            setDisplayText(shuffleText(text, nextRevealed));

                            return nextRevealed;
                        }

                        window.clearInterval(intervalRef.current ?? undefined);
                        setIsAnimating(false);
                        setIsDecrypted(true);

                        return previousRevealed;
                    }

                    if (pointerRef.current < orderRef.current.length) {
                        const indexToRemove =
                            orderRef.current[pointerRef.current];
                        pointerRef.current += 1;

                        const nextRevealed = new Set(previousRevealed);
                        nextRevealed.delete(indexToRemove);
                        setDisplayText(shuffleText(text, nextRevealed));

                        if (nextRevealed.size === 0) {
                            window.clearInterval(
                                intervalRef.current ?? undefined,
                            );
                            setIsAnimating(false);
                            setIsDecrypted(false);
                        }

                        return nextRevealed;
                    }

                    window.clearInterval(intervalRef.current ?? undefined);
                    setIsAnimating(false);
                    setIsDecrypted(false);

                    return previousRevealed;
                }

                if (direction === 'forward') {
                    setDisplayText(shuffleText(text, previousRevealed));
                    currentIteration += 1;

                    if (currentIteration >= maxIterations) {
                        window.clearInterval(intervalRef.current ?? undefined);
                        setIsAnimating(false);
                        setDisplayText(text);
                        setIsDecrypted(true);
                    }

                    return previousRevealed;
                }

                const currentSet =
                    previousRevealed.size === 0
                        ? fillAllIndices()
                        : previousRevealed;
                const removeCount = Math.max(
                    1,
                    Math.ceil(text.length / Math.max(1, maxIterations)),
                );
                const nextSet = removeRandomIndices(currentSet, removeCount);
                setDisplayText(shuffleText(text, nextSet));
                currentIteration += 1;

                if (nextSet.size === 0 || currentIteration >= maxIterations) {
                    window.clearInterval(intervalRef.current ?? undefined);
                    setIsAnimating(false);
                    setIsDecrypted(false);
                    setDisplayText(shuffleText(text, new Set()));

                    return new Set();
                }

                return nextSet;
            });
        }, speed);

        return () => window.clearInterval(intervalRef.current ?? undefined);
    }, [
        isAnimating,
        text,
        speed,
        maxIterations,
        sequential,
        revealDirection,
        shuffleText,
        direction,
        fillAllIndices,
        removeRandomIndices,
    ]);

    const handleClick = () => {
        if (animateOn !== 'click') {
            return;
        }

        if (clickMode === 'once') {
            if (isDecrypted) {
                return;
            }

            setDirection('forward');
            triggerDecrypt();
        }

        if (clickMode === 'toggle') {
            if (isDecrypted) {
                triggerReverse();
            } else {
                setDirection('forward');
                triggerDecrypt();
            }
        }
    };

    const triggerHoverDecrypt = useCallback(() => {
        if (isAnimating) {
            return;
        }

        setRevealedIndices(new Set());
        setIsDecrypted(false);
        setDisplayText(text);
        setDirection('forward');
        setIsAnimating(true);
    }, [isAnimating, text]);

    const resetToPlainText = useCallback(() => {
        window.clearInterval(intervalRef.current ?? undefined);
        setIsAnimating(false);
        setRevealedIndices(new Set());
        setDisplayText(text);
        setIsDecrypted(true);
        setDirection('forward');
    }, [text]);

    useEffect(() => {
        if (animateOn !== 'view' && animateOn !== 'inViewHover') {
            return;
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasAnimated) {
                    triggerDecrypt();
                    setHasAnimated(true);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        });
        const currentRef = containerRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [animateOn, hasAnimated, triggerDecrypt]);

    useEffect(() => {
        if (animateOn === 'click') {
            encryptInstantly();
        } else {
            setDisplayText(text);
            setIsDecrypted(true);
        }

        setRevealedIndices(new Set());
        setDirection('forward');
    }, [animateOn, text, encryptInstantly]);

    const animateProps =
        animateOn === 'hover' || animateOn === 'inViewHover'
            ? {
                  onMouseEnter: triggerHoverDecrypt,
                  onMouseLeave: resetToPlainText,
              }
            : animateOn === 'click'
              ? {
                    onClick: handleClick,
                }
              : {};

    return (
        <motion.span
            ref={containerRef}
            className={`inline-block whitespace-pre-wrap ${parentClassName}`}
            {...animateProps}
            {...props}
        >
            <span className="sr-only">{text}</span>

            <span aria-hidden="true">
                {displayText.split('').map((char, index) => {
                    const isRevealedOrDone =
                        revealedIndices.has(index) ||
                        (!isAnimating && isDecrypted);

                    return (
                        <span
                            key={index}
                            className={
                                isRevealedOrDone
                                    ? className
                                    : encryptedClassName
                            }
                        >
                            {char}
                        </span>
                    );
                })}
            </span>
        </motion.span>
    );
}

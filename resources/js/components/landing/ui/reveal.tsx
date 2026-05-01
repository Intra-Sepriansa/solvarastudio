import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import type { ReactNode } from 'react';

type RevealProps = {
    children: ReactNode;
    delay?: number;
    y?: number;
    duration?: number;
    className?: string;
    once?: boolean;
};

export function Reveal({
    children,
    delay = 0,
    y = 18,
    duration = 0.7,
    className,
    once = true,
}: RevealProps) {
    const reduce = useReducedMotion();

    if (reduce) {
        return <div className={className}>{children}</div>;
    }

    const variants: Variants = {
        hidden: { opacity: 0, y },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.2 }}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function Stagger({
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
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.08,
                        delayChildren: delay,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

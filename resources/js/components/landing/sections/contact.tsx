import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    budgetRanges,
    deadlineRanges,
    projectTypes,
} from '@/data/contactOptions';
import { cn } from '@/lib/utils';
import { Reveal } from '../ui/reveal';
import { SectionLabel } from '../ui/section-label';

const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Nama minimal 2 karakter')
        .max(100, 'Nama terlalu panjang'),
    contact: z
        .string()
        .trim()
        .min(5, 'Email atau nomor WhatsApp wajib diisi')
        .max(150, 'Terlalu panjang'),
    project_type: z.enum(projectTypes, {
        message: 'Pilih jenis project',
    }),
    budget: z.enum(budgetRanges, {
        message: 'Pilih budget range',
    }),
    deadline: z
        .union([z.enum(deadlineRanges), z.literal('')])
        .optional()
        .transform((v) => (v === '' ? undefined : v)),
    message: z
        .string()
        .trim()
        .min(20, 'Pesan minimal 20 karakter')
        .max(2000, 'Pesan terlalu panjang'),
    company: z.string().max(0, 'Form tidak valid'),
});

type ContactFormValues = z.input<typeof contactSchema>;

export function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

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
            const csrfToken = document
                .querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
                ?.getAttribute('content');

            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}),
                },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                const data = await res
                    .json()
                    .catch(() => ({ message: undefined }));

                throw new Error(
                    data?.message ??
                        'Sepertinya ada gangguan. Coba lagi sebentar lagi atau kirim email ke hello@solvarastudio.com.',
                );
            }

            setSubmitted(true);
            reset();
        } catch (err) {
            setServerError(
                err instanceof Error
                    ? err.message
                    : 'Sepertinya ada gangguan. Coba lagi sebentar lagi.',
            );
        }
    };

    return (
        <section id="contact" className="relative overflow-hidden bg-white">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    background:
                        'radial-gradient(60% 50% at 80% 0%, color-mix(in srgb, var(--color-mint) 60%, transparent), transparent 70%), radial-gradient(50% 40% at 0% 90%, color-mix(in srgb, var(--color-mist) 60%, transparent), transparent 70%)',
                }}
            />
            <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
                <div className="grid grid-cols-12 gap-y-12 md:gap-x-12">
                    <div className="col-span-12 md:sticky md:top-28 md:col-span-5 md:self-start">
                        <SectionLabel number="08">Contact</SectionLabel>
                        <Reveal>
                            <h2 className="mt-4 font-display text-[34px] leading-[1.05] text-ink md:text-[48px]">
                                Punya ide project?
                                <br />
                                <span className="text-teal italic">
                                    Kita rapikan jadi scope yang bisa
                                    dikerjakan.
                                </span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-muted-ink">
                                Ceritakan kebutuhan awal, jenis project, budget,
                                dan target waktu. Kami akan bantu susun langkah
                                pertama yang masuk akal.
                            </p>
                        </Reveal>

                        <ul className="mt-8 space-y-3 border-t border-line pt-6 text-[13.5px] text-muted-ink">
                            <li className="flex items-start gap-2">
                                <span
                                    aria-hidden
                                    className="mt-2 size-1 shrink-0 rounded-full bg-gold"
                                />
                                Respons biasanya kurang dari 24 jam kerja.
                            </li>
                            <li className="flex items-start gap-2">
                                <span
                                    aria-hidden
                                    className="mt-2 size-1 shrink-0 rounded-full bg-gold"
                                />
                                Discovery awal 30–60 menit, gratis.
                            </li>
                            <li className="flex items-start gap-2">
                                <span
                                    aria-hidden
                                    className="mt-2 size-1 shrink-0 rounded-full bg-gold"
                                />
                                Tidak harus sudah punya konten lengkap.
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-12 md:col-span-7">
                        <Reveal>
                            {submitted ? (
                                <SuccessState
                                    onReset={() => setSubmitted(false)}
                                />
                            ) : (
                                <form
                                    noValidate
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="rounded-3xl border border-line bg-white p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.18)] md:p-10"
                                >
                                    {/* Honeypot */}
                                    <div
                                        aria-hidden
                                        className="absolute top-auto left-[-9999px] h-px w-px overflow-hidden"
                                    >
                                        <label htmlFor="company">Company</label>
                                        <input
                                            id="company"
                                            type="text"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            {...register('company')}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        <Field
                                            label="Nama"
                                            error={errors.name?.message}
                                            required
                                        >
                                            <input
                                                type="text"
                                                autoComplete="name"
                                                placeholder="Nama lengkap"
                                                className={inputCls(
                                                    !!errors.name,
                                                )}
                                                {...register('name')}
                                            />
                                        </Field>

                                        <Field
                                            label="Email atau WhatsApp"
                                            error={errors.contact?.message}
                                            required
                                        >
                                            <input
                                                type="text"
                                                autoComplete="email tel"
                                                placeholder="hello@studioanda.com / +62…"
                                                className={inputCls(
                                                    !!errors.contact,
                                                )}
                                                {...register('contact')}
                                            />
                                        </Field>

                                        <Field
                                            label="Jenis project"
                                            error={errors.project_type?.message}
                                            required
                                        >
                                            <select
                                                className={selectCls(
                                                    !!errors.project_type,
                                                )}
                                                {...register('project_type')}
                                                defaultValue=""
                                            >
                                                <option value="" disabled>
                                                    Pilih jenis project
                                                </option>
                                                {projectTypes.map((p) => (
                                                    <option key={p} value={p}>
                                                        {p}
                                                    </option>
                                                ))}
                                            </select>
                                        </Field>

                                        <Field
                                            label="Budget range"
                                            error={errors.budget?.message}
                                            required
                                        >
                                            <select
                                                className={selectCls(
                                                    !!errors.budget,
                                                )}
                                                {...register('budget')}
                                                defaultValue=""
                                            >
                                                <option value="" disabled>
                                                    Pilih budget range
                                                </option>
                                                {budgetRanges.map((p) => (
                                                    <option key={p} value={p}>
                                                        {p}
                                                    </option>
                                                ))}
                                            </select>
                                        </Field>

                                        <Field
                                            label="Target deadline"
                                            error={errors.deadline?.message}
                                        >
                                            <select
                                                className={selectCls(
                                                    !!errors.deadline,
                                                )}
                                                {...register('deadline')}
                                                defaultValue=""
                                            >
                                                <option value="">
                                                    Pilih target deadline
                                                </option>
                                                {deadlineRanges.map((p) => (
                                                    <option key={p} value={p}>
                                                        {p}
                                                    </option>
                                                ))}
                                            </select>
                                        </Field>

                                        <Field
                                            label="Pesan"
                                            error={errors.message?.message}
                                            required
                                            className="md:col-span-2"
                                        >
                                            <textarea
                                                rows={5}
                                                placeholder="Ceritakan ringkas konteks project, halaman/fitur yang dibutuhkan, dan apa yang sudah dimiliki saat ini."
                                                className={cn(
                                                    inputCls(!!errors.message),
                                                    'resize-y',
                                                )}
                                                {...register('message')}
                                            />
                                        </Field>
                                    </div>

                                    {serverError && (
                                        <p
                                            role="alert"
                                            className="mt-5 rounded-md border border-[color-mix(in_srgb,var(--color-coral)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-coral)_8%,white)] px-4 py-3 text-[13px] text-[#9a3a31]"
                                        >
                                            {serverError}
                                        </p>
                                    )}

                                    <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
                                        <p className="text-[12.5px] text-muted-ink">
                                            Dengan mengirim form, Anda setuju
                                            data dipakai hanya untuk
                                            mendiskusikan project.
                                        </p>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-teal)] px-6 py-3 text-[13px] font-medium text-white transition hover:bg-[var(--color-teal-soft)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-teal)_50%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2
                                                        aria-hidden
                                                        className="size-4 animate-spin"
                                                    />
                                                    Mengirim…
                                                </>
                                            ) : (
                                                <>
                                                    Kirim detail project
                                                    <ArrowRight
                                                        aria-hidden
                                                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                                                    />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
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
    children: React.ReactNode;
    error?: string;
    required?: boolean;
    className?: string;
}) {
    return (
        <label className={cn('flex flex-col gap-1.5', className)}>
            <span className="flex items-center gap-1 text-[12px] tracking-[0.16em] text-muted-ink uppercase">
                {label}
                {required && (
                    <span aria-hidden className="text-gold">
                        *
                    </span>
                )}
            </span>
            {children}
            {error && (
                <span className="text-[12px] text-[#a3382e]">{error}</span>
            )}
        </label>
    );
}

const inputCls = (hasError: boolean) =>
    cn(
        'w-full rounded-lg border bg-white px-3.5 py-3 text-[14px] text-ink transition placeholder:text-muted-ink/70 focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-teal)_28%,transparent)] focus:outline-none',
        hasError
            ? 'border-[color-mix(in_srgb,var(--color-coral)_55%,transparent)] focus:border-[var(--color-coral)]'
            : 'border-line focus:border-[var(--color-teal)]',
    );

const selectCls = (hasError: boolean) =>
    cn(inputCls(hasError), 'appearance-none bg-no-repeat pr-10', 'bg-white');

function SuccessState({ onReset }: { onReset: () => void }) {
    return (
        <div className="rounded-3xl border border-line bg-white p-8 md:p-12">
            <div className="flex size-12 items-center justify-center rounded-full bg-mint text-teal">
                <Check aria-hidden className="size-5 stroke-[2.5]" />
            </div>
            <h3 className="mt-6 font-display text-[28px] leading-[1.15] text-ink md:text-[36px]">
                Terima kasih. Detail awal project sudah terkirim.
            </h3>
            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-muted-ink">
                Kami akan meninjau scope-nya dulu sebelum memberi estimasi.
                Biasanya respons keluar dalam 24 jam kerja. Jika perlu cepat,
                bisa juga kontak via{' '}
                <a
                    href="mailto:hello@solvarastudio.com"
                    className="text-ink underline-offset-2 hover:underline"
                >
                    hello@solvarastudio.com
                </a>
                .
            </p>
            <button
                type="button"
                onClick={onReset}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[13px] text-ink transition hover:border-[var(--color-teal)] hover:text-[var(--color-teal)]"
            >
                Kirim project lain
            </button>
        </div>
    );
}

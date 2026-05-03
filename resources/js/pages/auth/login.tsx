import { Form, Head } from '@inertiajs/react';
import {
    ArrowRight,
    FolderKanban,
    ShieldCheck,
    UploadCloud,
} from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

const loginHighlights = [
    ['Project', FolderKanban],
    ['Upload', UploadCloud],
    ['Aman', ShieldCheck],
] as const;

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <>
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_28px_90px_-52px_rgba(11,17,16,0.45)] dark:border-white/10 dark:bg-[#0d100f]"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="border-b border-black/10 bg-[#0b1110] p-6 text-white dark:border-white/10">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-[#a7e33d] uppercase">
                                <ShieldCheck className="size-3.5" />
                                Akses admin
                            </div>
                            <h2 className="mt-5 text-3xl leading-tight font-semibold tracking-tight">
                                Masuk ke Solvara Console
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-white/55">
                                Kelola project, media, kategori, dan status
                                portfolio.
                            </p>
                            <div className="mt-5 grid grid-cols-3 gap-2">
                                {loginHighlights.map(([label, Icon]) => (
                                    <div
                                        key={label}
                                        className="rounded-2xl border border-white/10 bg-white/6 p-3 text-xs font-semibold text-white/72"
                                    >
                                        <Icon className="mb-3 size-4 text-[#a7e33d]" />
                                        {label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-5 p-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email admin</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="admin@solvarastudio.com"
                                    className="h-12 rounded-xl"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm"
                                            tabIndex={5}
                                        >
                                            Reset
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    className="h-12 rounded-xl"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                    />
                                    <Label htmlFor="remember">Ingat sesi</Label>
                                </div>
                                <span className="text-xs font-medium text-muted-foreground">
                                    Area internal
                                </span>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 h-12 w-full rounded-xl bg-[#101511] text-white hover:bg-[#202920] dark:bg-[#a7e33d] dark:text-black dark:hover:bg-[#b6ee4d]"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Masuk admin
                                {!processing && (
                                    <ArrowRight className="size-4" />
                                )}
                            </Button>

                            {canRegister && (
                                <div className="text-center text-sm text-muted-foreground">
                                    Butuh akun?{' '}
                                    <TextLink href={register()} tabIndex={5}>
                                        Daftar
                                    </TextLink>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mt-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Admin Console',
    description: 'Akses internal untuk mengelola konten Solvara Studio.',
};

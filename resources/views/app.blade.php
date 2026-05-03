<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <link rel="icon" href="/apple-touch-icon.png" type="image/png">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        @if (($page['component'] ?? null) === 'welcome')
            <link
                rel="preload"
                as="image"
                href="/landing/optimized/solvara-hero-texture-1280.webp"
                imagesrcset="/landing/optimized/solvara-hero-texture-768.webp 768w, /landing/optimized/solvara-hero-texture-1280.webp 1280w, /landing/optimized/solvara-hero-texture-1600.webp 1600w"
                imagesizes="100vw"
                fetchpriority="high"
            >
        @endif

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>

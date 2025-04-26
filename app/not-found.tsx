// not-found.tsx
import Link from 'next/link';
import { Metadata, Viewport } from 'next';
import LottieAnimation from '@/components/LottieAnimation';

export const metadata: Metadata = {
  title: 'Not Found | Otaku.Realm',
  description: 'The page you are looking for does not exist.'
};

export const viewport: Viewport = {
  themeColor: '#1f2937'
};

export default function NotFound() {
  return (
    <div className="container-custom flex min-h-[70vh] flex-col items-center justify-center py-10 text-center">
      <div className="w-full max-w-md mb-4">
        <LottieAnimation />
      </div>
      <p className="mb-8 max-w-md text-slate-600 dark:text-slate-400">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-sky-600 px-6 py-3 text-white transition-colors hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:bg-sky-500 dark:hover:bg-sky-600"
      >
        Return Home
      </Link>
    </div>
  );
}
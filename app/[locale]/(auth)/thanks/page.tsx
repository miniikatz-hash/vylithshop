import Link from 'next/link';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }, { locale: 'fr' }];
}

export default function ThanksPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-6xl mb-6">🙏</div>
        <h1 className="text-3xl font-serif font-bold text-vylith-white mb-4">Thank You!</h1>
        <p className="text-vylith-white/70 mb-8 max-w-md">
          We've received your message and will get back to you within 24 hours.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-full bg-vylith-purple text-vylith-white hover:bg-vylith-purple-glow transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

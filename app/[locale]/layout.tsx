import { notFound } from 'next/navigation';

const locales = ['en', 'ar', 'fr'];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  return <>{children}</>;
}

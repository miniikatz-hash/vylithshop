import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vylith — Hard to find. Impossible to replace.',
  description: 'Vylith is a web development agency that builds world-class digital products for founders, startups, and enterprise teams.',
  keywords: ['web development', 'web design', 'startup', 'agency', 'Next.js', 'React'],
  authors: [{ name: 'Vylith' }],
  creator: 'Vylith',
  openGraph: {
    title: 'Vylith — Hard to find. Impossible to replace.',
    description: 'Vylith is a web development agency that builds world-class digital products.',
    url: 'https://vylith.shop',
    siteName: 'Vylith',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vylith — Hard to find. Impossible to replace.',
    description: 'Vylith is a web development agency that builds world-class digital products.',
    creator: '@vylith',
  },
  alternates: {
    canonical: 'https://vylith.shop',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

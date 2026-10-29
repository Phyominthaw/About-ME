import type { Metadata, Viewport } from 'next';
import './globals.css';

// Set NEXT_PUBLIC_SITE_URL to your real deployed domain (e.g. https://your-domain.com).
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Phyo Min Thaw (Kura) | Junior Developer', template: '%s | Kura' },
  description: 'Explore the personal portfolio of Phyo Min Thaw (Kura), a junior developer passionate about web development, software engineering, design, and modern technology.',
  applicationName: 'Kura Portfolio',
  keywords: ['Phyo Min Thaw', 'Kura', 'Junior Developer', 'Frontend Developer', 'Web Development', 'React', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Phyo Min Thaw (Kura)' }],
  creator: 'Phyo Min Thaw (Kura)',
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', locale: 'en_US', url: '/', siteName: 'Kura Portfolio',
    title: 'Phyo Min Thaw (Kura) | Junior Developer',
    description: 'Turning ideas into meaningful digital experiences, one project at a time.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Phyo Min Thaw (Kura) Portfolio' }],
  },
  twitter: { card: 'summary_large_image', title: 'Phyo Min Thaw (Kura) | Junior Developer', description: 'Explore my work, skills and projects.', images: ['/og-image.jpg'] },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#101114' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
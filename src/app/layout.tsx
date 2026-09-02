import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import './globals.css';

const serif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const description =
  'Machine learning scientist working on neuroimaging: processing pipelines, deep learning for medical images, and the tools that get them into clinical use.';

export const metadata: Metadata = {
  metadataBase: new URL('https://nononsense.me'),
  title: {
    default: 'Andrew Van',
    template: '%s — Andrew Van',
  },
  description,
  openGraph: {
    title: 'Andrew Van',
    description,
    url: 'https://nononsense.me',
    siteName: 'Andrew Van',
    type: 'website',
    images: [{ url: '/images/profile.jpeg', width: 450, height: 450, alt: 'Andrew Van' }],
  },
  twitter: {
    card: 'summary',
    title: 'Andrew Van',
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f2ed' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0e0d' },
  ],
};

// Blur the hero name before first paint so the k-space instrument can bring
// it into focus. Skipped when the visitor prefers reduced motion; the
// instrument clears the variable once it has acquired k-space.
const preBlur = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.style.setProperty('--name-blur','10px')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: preBlur }} />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

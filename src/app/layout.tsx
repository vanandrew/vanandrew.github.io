import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Andrew Van Portfolio',
  description: 'Personal portfolio website for Andrew Van',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

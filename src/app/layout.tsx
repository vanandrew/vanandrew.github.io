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
    <html lang="en" className="light">
      <body className="antialiased font-light">
        {/* Empty background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0"></div>
        
        <main className="min-h-screen relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}

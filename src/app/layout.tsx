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
      <body className="antialiased font-light">
        {/* Abstract geometric patterns */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Large circle in top-right */}
          <div className="geometric-pattern geometric-circle w-96 h-96 -right-20 -top-20 border-apple-blue/20"></div>
          
          {/* Medium square in bottom-left */}
          <div className="geometric-pattern geometric-square w-64 h-64 left-20 bottom-40"></div>
          
          {/* Small triangle in middle-right */}
          <div className="geometric-pattern geometric-triangle w-32 h-32 right-40 top-1/3 bg-apple-accent/5"></div>
          
          {/* Extra small circles scattered */}
          <div className="geometric-pattern geometric-circle w-16 h-16 left-1/4 top-1/4"></div>
          <div className="geometric-pattern geometric-circle w-8 h-8 right-1/3 bottom-1/4 border-apple-secondary/20"></div>
          <div className="geometric-pattern geometric-circle w-24 h-24 left-1/3 bottom-1/3 border-apple-tertiary/20"></div>
        </div>
        
        <main className="min-h-screen relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}

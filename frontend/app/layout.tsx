import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'AgriDirect | Farm to Business',
  description: 'SIH 2026 - Problem Statement 26033',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground flex min-h-screen relative`}>
        <Sidebar />
        <main className="flex-1 w-full min-w-0">
          <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

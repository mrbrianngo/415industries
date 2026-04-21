import './globals.css';
import { GeistMono } from 'geist/font/mono';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: '415 Industries',
  description: '415 Industries Season 1: Legacy.',
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${GeistMono.className}`}>
        <div className="flex flex-col min-h-[100svh] h-[100svh] mx-5 overflow-y-scroll">
          {children}
        </div>
      </body>
    </html>
  );
}

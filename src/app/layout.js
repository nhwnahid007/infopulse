import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '../components/shared/Navbar';
import AuthProvider from './providers';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'InfoPulse',
  description:
    'Stay informed with the latest news and updates from around the world.',
  metadataBase: new URL(
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  openGraph: {
    title: 'InfoPulse',
    description:
      'Stay informed with the latest news and updates from around the world.',
    siteName: 'InfoPulse',
    url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'InfoPulse',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="max-w-full mx-auto text-white">
            <Navbar />
            <div className="min-h-screen h-full w-full bg-gradient-to-t from-[#12243c] to-[#0f1721]">
              {children}
            </div>
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}

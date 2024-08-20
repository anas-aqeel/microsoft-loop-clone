import { Outfit } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
const outfit = Outfit({ subsets: ['latin'] });
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: 'Microsoft Loop',
  description: 'Real-time Collaboration Platform',
  icons: {
    icon: '/images/loop.png',
  },
  icon: '/images/loop.png',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/images/loop.png" />
        </head>
        <body className={`${outfit.className}`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

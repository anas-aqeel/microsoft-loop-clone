import { Outfit } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
const outfit = Outfit({ subsets: ['latin'] })
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: 'Screw Sync',
  description: 'Real-time Collaboration Platform',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className}`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}

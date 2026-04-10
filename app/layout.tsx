import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from './components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Arun C',
  description: 'Arun - cookin in NYC',
  icons: {
    icon: '/images/memoji.png',
    apple: '/images/memoji.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-mono">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from "./providers";
import  { NavigationBar } from "@/app/components/navigation/NavigationBar";
import { ThemeProvider } from '@/components/ui/theme-provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider 
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
      >
        <NavigationBar></NavigationBar>
        <Providers>
          {children}
        </Providers>
      </ThemeProvider>
      </body>
    </html>
  )
}

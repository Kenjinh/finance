import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/lib/NextUIProvider'
import Header from "@/components/header/Header"
import { getServerSession } from 'next-auth'
import { nextAuthOption } from '@/lib/auth'
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Finance',
  description: 'Para gerenciar seus gastos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = getServerSession(nextAuthOption)
  if(!session){
    redirect('/auth/login')
  }
  return (
    <html lang="pt-Br">
      <body className={inter.className}>
        <Providers>
          <Header/>
          {children}
        </Providers>
        </body>
    </html>
  )
}

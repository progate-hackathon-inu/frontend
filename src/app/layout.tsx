'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useSidebarStore } from '@/store/sidebarStore'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isOpen = useSidebarStore((state) => state.isOpen)
  const toggleSidebar = useSidebarStore((state) => state.toggle)

  return (
    <html lang='ja'>
      <body className={inter.className}>
        <Header />
        <div className='flex'>
          <Sidebar />
          <main className='flex-1 p-6 bg-gray-900' onClick={() => isOpen && toggleSidebar()}>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

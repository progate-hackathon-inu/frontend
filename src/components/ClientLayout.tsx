'use client'

import Sidebar from '@/components/Sidebar'
import { useSidebarStore } from '@/store/sidebarStore'

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isOpen = useSidebarStore((state) => state.isOpen)
  const toggleSidebar = useSidebarStore((state) => state.toggle)

  return (
    <div className='flex'>
      <Sidebar />
      <main className='flex-1 p-6 bg-gray-900' onClick={() => isOpen && toggleSidebar()}>
        {children}
      </main>
    </div>
  )
}

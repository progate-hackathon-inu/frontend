'use client'
import { useSidebarStore } from '@/store/sidebarStore'
import { Button } from '@/components/ui/button'
import { Home, Compass, Upload, Heart } from 'lucide-react'

export default function Sidebar() {
  const isOpen = useSidebarStore((state) => state.isOpen)

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 p-4 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}
    >
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-white'>VideoApp</h1>
      </div>
      <nav className='space-y-2'>
        <Button
          variant='ghost'
          className='w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700'
        >
          <Home className='mr-2 h-5 w-5' />
          ホーム
        </Button>
        <Button
          variant='ghost'
          className='w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700'
        >
          <Compass className='mr-2 h-5 w-5' />
          探索
        </Button>
        <Button
          variant='ghost'
          className='w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700'
        >
          <Upload className='mr-2 h-5 w-5' />
          アップロード
        </Button>
        <Button
          variant='ghost'
          className='w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700'
        >
          <Heart className='mr-2 h-5 w-5' />
          お気に入り
        </Button>
      </nav>
    </aside>
  )
}

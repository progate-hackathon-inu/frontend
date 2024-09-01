'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSidebarStore } from '@/store/sidebarStore'
import { Button } from '@/components/ui/button'
import { Home, Compass, Upload, Heart, Menu, BookOpen } from 'lucide-react'

export default function Sidebar() {
  const isOpen = useSidebarStore((state) => state.isOpen)
  const toggleSidebar = useSidebarStore((state) => state.toggle)
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleNavigation = (path: string) => {
    if (isMounted) {
      router.push(path)
    }
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 p-4 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}
    >
      <div className='mb-8 flex items-center'>
        <button
          className='p-2 mr-2 text-white hover:bg-gray-700 rounded-md'
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>
        <h1
          className='text-2xl font-bold text-white cursor-pointer'
          onClick={() => handleNavigation('/')}
        >
          ManimTube
        </h1>
      </div>
      <nav className='space-y-2'>
        <Button
          variant='ghost'
          className='w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700'
          onClick={() => handleNavigation('/')}
        >
          <Home className='mr-2 h-5 w-5' />
          <span>ホーム</span>
        </Button>
        <Button
          variant='ghost'
          className='w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700'
          onClick={() => handleNavigation('/explore')}
        >
          <Compass className='mr-2 h-5 w-5' />
          <span>探索</span>
        </Button>
        <Button
          variant='ghost'
          className='w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700'
          onClick={() => handleNavigation('/protected/upload')}
        >
          <Upload className='mr-2 h-5 w-5' />
          <span>アップロード</span>
        </Button>
        <Button
          variant='ghost'
          className='w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700'
          onClick={() => handleNavigation('/protected/favorites')}
        >
          <Heart className='mr-2 h-5 w-5' />
          <span>お気に入り</span>
        </Button>
        {/* Manim解説ページのリンクを追加 */}
        <Button
          variant='ghost'
          className='w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700'
          onClick={() => handleNavigation('/manim_about')}
        >
          <BookOpen className='mr-2 h-5 w-5' />
          <span>Manim解説</span>
        </Button>
      </nav>
    </aside>
  )
}

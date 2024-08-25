'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Home, Compass, Upload, Heart } from 'lucide-react'

export default function Sidebar() {
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
    <aside className='w-64 bg-gray-800 p-4 hidden md:block'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-white'>VideoApp</h1>
      </div>
      <nav className='space-y-2'>
        <Button
          variant='ghost'
          className='w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700'
          onClick={() => handleNavigation('/')}
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
          onClick={() => handleNavigation('/upload')}
        >
          <Upload className='mr-2 h-5 w-5' />
          アップロード
        </Button>
        <Button
          variant='ghost'
          className='w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700'
          onClick={() => handleNavigation('/favorites')}
        >
          <Heart className='mr-2 h-5 w-5' />
          お気に入り
        </Button>
      </nav>
    </aside>
  )
}

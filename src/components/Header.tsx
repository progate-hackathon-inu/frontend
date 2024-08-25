'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Search } from 'lucide-react'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className='flex items-center justify-between p-4 bg-gray-800'>
      <Link href='/' className='text-white text-2xl font-bold hover:text-gray-300'>
        ManimTube
      </Link>
      <div className='flex items-center space-x-4'>
        <form onSubmit={handleSearch} className='relative'>
          <Input
            type='search'
            placeholder='Search videos...'
            className='w-64 pl-10 pr-4 py-2 bg-gray-700 border-gray-700 text-white placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type='submit' className='absolute right-0 top-0 h-full bg-transparent'>
            <Search className='text-gray-400' size={20} />
          </Button>
        </form>
        <Link href='/auth/login'>
          <Button variant='default' className='bg-gray-700 text-white'>
            Login
          </Button>
        </Link>
      </div>
    </header>
  )
}

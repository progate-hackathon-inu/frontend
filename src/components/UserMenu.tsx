'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { User as UserIcon, LogOut } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

type UserMetadata = {
  avatar_url?: string
}

function UserMenu(): React.ReactElement {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    fetchUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase.auth])

  const handleLogout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div>
  }

  return (
    <div className='flex items-center space-x-2'>
      {!user ? (
        <>
          <Link href='/login'>
            <Button variant='default' size="responsive" className='bg-gray-700 text-white'>
              Login
            </Button>
          </Link>
          <Link href='/profile'>
            <Button variant='ghost' size="icon" className='p-2'>
              <UserIcon className='text-white' size={24} />
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Link href='/profile'>
            <div className='relative w-8 h-8 sm:w-10 sm:h-10'>
              <Image
                src={(user.user_metadata as UserMetadata).avatar_url || '/default.png'}
                alt='User Avatar'
                layout="fill"
                objectFit="cover"
                className='rounded-full'
              />
            </div>
          </Link>
          <Button 
            variant='default' 
            size="responsive" 
            className='bg-gray-700 text-white hidden sm:inline-flex' 
            onClick={handleLogout}
          >
            Logout
          </Button>
          <Button
            variant='ghost'
            size="icon"
            className='p-2 sm:hidden'
            onClick={handleLogout}
          >
            <LogOut className='text-white' size={24} />
          </Button>
        </>
      )}
    </div>
  )
}

export default UserMenu
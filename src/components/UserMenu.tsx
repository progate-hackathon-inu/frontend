'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { User as UserIcon } from 'lucide-react'
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
    return <div>Loading...</div>
  }

  return (
    <div className='hidden sm:flex items-center space-x-4'>
      {!user ? (
        <>
          <Link href='/login'>
            <Button variant='default' className='bg-gray-700 text-white'>
              Login
            </Button>
          </Link>
          <Link href='/profile'>
            <Button variant='ghost' className='p-2'>
              <UserIcon className='text-white' size={24} />
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Link href='/profile'>
            <div className='relative w-10 h-10'>
              <Image
                src={(user.user_metadata as UserMetadata).avatar_url || '/default.png'}
                alt='User Avatar'
                width={40}
                height={40}
                className='rounded-full'
              />
            </div>
          </Link>
          <Button variant='default' className='bg-gray-700 text-white' onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
    </div>
  )
}

export default UserMenu

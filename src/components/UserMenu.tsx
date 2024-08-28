'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User as UserIcon } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { User, Session, SupabaseClient } from '@supabase/supabase-js'

type UserMetadata = {
  avatar_url?: string;
}

function UserMenu(): React.ReactElement {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const supabase: SupabaseClient = createClient()

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        
      } catch (error) {
        console.error('Error fetching user:', error)
        
      }
    }

    fetchUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event: string, session: Session | null) => {
      setUser(session?.user || null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      router.push('/')
      
    } catch (error) {
      console.error('Error signing out:', error)
    }
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
                src={(user.user_metadata as UserMetadata).avatar_url || '/default-avatar.png'}
                alt='User Avatar'
                layout='fill'
                objectFit='cover'
                className='rounded-full'
              />
            </div>
          </Link>
          <Button
            variant='default'
            className='bg-gray-700 text-white'
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      )}
    </div>
  )
}

export default UserMenu



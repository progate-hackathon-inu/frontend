'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { User as SupabaseUser } from '@supabase/supabase-js'

function UserMenu(): React.ReactElement {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    fetchUser()
  }, [])

  if (!user) {
    return (
      <div className='hidden sm:flex items-center space-x-4'>
        <Link href='/login'>
          <Button variant='default' className='bg-gray-700 text-white'>
            Login
          </Button>
        </Link>
        <Link href='/profile'>
          <Button variant='ghost' className='p-2'>
            <User className='text-white' size={24} />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className='hidden sm:flex items-center space-x-4'>
      <Link href='/profile'>
        <div className='relative w-10 h-10'>
          <Image
            src={user.user_metadata.avatar_url || '/default-avatar.png'}
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
        onClick={async () => {
          await supabase.auth.signOut()
          setUser(null)
        }}
      >
        Logout
      </Button>
    </div>
  )
}

export default UserMenu



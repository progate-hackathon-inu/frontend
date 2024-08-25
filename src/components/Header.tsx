import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='flex items-center justify-between p-4 bg-gray-800'>
      <Link href='/' className='text-white text-2xl font-bold hover:text-gray-300'>
        ManimTube
      </Link>
      <div className='flex items-center space-x-4'>
        <Input
          type='search'
          placeholder='Search...'
          className='w-64 p-2 rounded-md bg-gray-700 text-white'
        />
        <Link href='/auth/login'>
          <Button variant='default' className='bg-gray-700 text-white'>
            Login
          </Button>
        </Link>
      </div>
    </header>
  )
}

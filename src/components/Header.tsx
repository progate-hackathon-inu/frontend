import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className='flex items-center justify-between p-4 bg-gray-800'>
      <div className='text-white text-2xl font-bold'>ManimTube</div>
      <div className='flex items-center space-x-4'>
        <Input
          type='search'
          placeholder='Search...'
          className='w-64 p-2 rounded-md bg-gray-700 text-white'
        />
        <Button variant='default' className='bg-gray-700 text-white'>
          Login
        </Button>
      </div>
    </header>
  )
}

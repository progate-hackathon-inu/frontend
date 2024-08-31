import { useFormStatus } from 'react-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { searchVideos } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      variant='ghost'
      size='icon'
      className='absolute right-0 top-0 h-full bg-transparent hover:bg-transparent'
      disabled={pending}
    >
      <Search className='text-gray-400' size={20} />
    </Button>
  )
}

export default function SearchForm() {
  return (
    <form action={searchVideos} className='relative flex-grow max-w-md mx-4'>
      <div className='relative'>
        <Input
          type='search'
          name='query'
          placeholder='Search videos...'
          className='w-full pl-10 pr-12 py-2 bg-gray-700 border-gray-700 text-white placeholder-gray-400 focus-visible:ring-gray-500 focus-visible:border-gray-500'
        />
        <SubmitButton />
      </div>
    </form>
  )
}

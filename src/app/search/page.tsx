'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'

export default function Component() {
  return (
    <div className='min-h-screen bg-gray-900 text-gray-200'>
      <main className='container mx-auto px-4 py-8'>
        <section className='space-y-6'>
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className='bg-gray-800 p-4 rounded-lg shadow-md flex'>
              <div className='flex-shrink-0 mr-4'>
                <Image
                  src={`/placeholder.svg`}
                  alt={`Video thumbnail ${item}`}
                  width={320}
                  height={180}
                  className='w-40 h-24 object-cover rounded'
                />
              </div>
              <div className='flex-1'>
                <h3 className='text-lg font-semibold mb-1 text-white'>Video Title {item}</h3>
                <p className='text-sm text-gray-400 mb-2'>1M views • 3 days ago</p>
                <div className='flex items-center mb-2'>
                  <Avatar className='h-6 w-6 mr-2'>
                    <AvatarImage src='/placeholder-avatar.jpg' alt='Channel' />
                    <AvatarFallback>CH</AvatarFallback>
                  </Avatar>
                  <span className='text-sm text-gray-400'>Channel Name</span>
                </div>
                <p className='text-sm text-gray-300'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'

export default function Component() {
  return (
    <div className='min-h-screen bg-gray-900 text-gray-200'>
      <main className='container mx-auto px-4 py-8'>
        <section className='space-y-6'>
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className='bg-gray-800 p-6 rounded-lg shadow-md flex hover:bg-gray-750 transition-colors duration-200'
            >
              <div className='flex-shrink-0 mr-6'>
                <Image
                  src={`/placeholder.svg`}
                  alt={`Video thumbnail ${item}`}
                  width={320}
                  height={180}
                  className='w-48 h-28 object-cover rounded-md'
                />
              </div>
              <div className='flex-1'>
                <h3 className='text-xl font-semibold mb-2 text-gray-100'>Video Title {item}</h3>
                <p className='text-sm text-gray-400 mb-3'>1M views • 3 days ago</p>
                <div className='flex items-center mb-3'>
                  <Avatar className='h-8 w-8 mr-3'>
                    <AvatarImage src='/placeholder-avatar.jpg' alt='Channel' />
                    <AvatarFallback>CH</AvatarFallback>
                  </Avatar>
                  <span className='text-sm text-gray-300'>Channel Name</span>
                </div>
                <p className='text-sm text-gray-400 line-clamp-2'>
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

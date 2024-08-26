'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, Play } from 'lucide-react'
import Image from 'next/image'

export default function Component() {
  return (
    <div className='min-h-screen bg-gray-900 text-gray-200 flex'>
      {/* Main content */}
      <div className='flex-1 flex flex-col'>
        {/* Main content */}
        <main className='flex-1 overflow-y-auto p-6'>
          <h2 className='text-3xl font-bold mb-6 flex items-center'>
            <Heart className='mr-2 text-red-500' /> お気に入り動画
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className='bg-gray-800 rounded-lg overflow-hidden shadow-lg'>
                <div className='relative'>
                  <Image
                    src={`/placeholder.svg`}
                    alt={`動画サムネイル ${item}`}
                    width={320}
                    height={180}
                    className='w-full h-48 object-cover'
                  />
                  <div className='absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded'>
                    12:34
                  </div>
                </div>
                <div className='p-4'>
                  <h3 className='text-lg font-semibold mb-2 line-clamp-2'>
                    お気に入り動画タイトル {item}
                  </h3>
                  <div className='flex items-center mb-2'>
                    <Avatar className='h-6 w-6 mr-2'>
                      <AvatarImage src='/placeholder-avatar.jpg' alt='チャンネル' />
                      <AvatarFallback>CH</AvatarFallback>
                    </Avatar>
                    <span className='text-sm text-gray-400'>チャンネル名</span>
                  </div>
                  <div className='flex items-center text-sm text-gray-400'>
                    <Play className='mr-1 h-4 w-4' />
                    <span>100万回視聴</span>
                    <span className='mx-2'>•</span>
                    <span>1週間前</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

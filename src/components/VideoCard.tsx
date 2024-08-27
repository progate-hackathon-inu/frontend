'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

type Video = {
  id: number
  title: string
  author: string
  views: number
  likes: number
  imageUrl: string
  tags: string[]
}

const VideoCard = ({ video }: { video: Video }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <Link href={`/video/${video.id}`} className='block'>
      <Card className='bg-gray-800 text-white hover:bg-gray-700 transition-colors h-[400px]'>
        <CardContent className='p-0'>
          <div className='relative w-full h-40'>
            <Image
              src={video.imageUrl}
              alt={video.title}
              fill
              className='object-cover rounded-t-md'
            />
          </div>
          <div className='p-3'>
            <h2 className='text-base font-semibold line-clamp-2 mb-1'>{video.title}</h2>
            <p className='text-xs text-gray-400'>{video.author}</p>
            <p className='text-xs text-gray-400 mb-2'>
              {video.views.toLocaleString()} 回視聴 • {video.likes.toLocaleString()} いいね
            </p>
            <div className='flex flex-wrap gap-1'>
              {video.tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/search?tag=${encodeURIComponent(tag)}`}
                  className='text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded hover:bg-gray-600 transition-colors'
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default VideoCard

import Image from 'next/image'
import Link from 'next/link'

interface RelatedVideo {
  id: number
  title: string
  creator: string
  views: string
  age: string
  thumbnail: string
}

interface RelatedVideosProps {
  videos: RelatedVideo[]
}

export default function RelatedVideos({ videos }: RelatedVideosProps) {
  return (
    <aside className='md:w-1/4'>
      <h3 className='text-xl font-semibold mb-4'>関連動画</h3>
      {videos.map((video) => (
        <Link href={`/video/${video.id}`} key={video.id} className='flex gap-2 mb-4'>
          <div className='w-40 h-24 bg-gray-800 overflow-hidden'>
            <Image
              src={video.thumbnail}
              alt={video.title}
              width={160}
              height={96}
              className='w-full h-full object-cover'
            />
          </div>
          <div>
            <h4 className='font-semibold'>{video.title}</h4>
            <p className='text-sm text-gray-400'>{video.creator}</p>
            <p className='text-sm text-gray-400'>
              {video.views}回視聴 • {video.age}
            </p>
          </div>
        </Link>
      ))}
    </aside>
  )
}

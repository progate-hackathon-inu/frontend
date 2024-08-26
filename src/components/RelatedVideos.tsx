import Image from 'next/image'

type RelatedVideo = {
  id: number
  title: string
  creator: string
  views: string
  age: string
  thumbnail: string
}

type RelatedVideosProps = {
  videos: RelatedVideo[]
}

export default function RelatedVideos({ videos }: RelatedVideosProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {videos.map((video) => (
        <div key={video.id} className='flex flex-col'>
          <div className='w-full aspect-video relative mb-2'>
            <Image
              src={video.thumbnail}
              alt={video.title}
              layout='fill'
              objectFit='cover'
              className='rounded'
            />
          </div>
          <div>
            <h4 className='text-sm font-semibold line-clamp-2'>{video.title}</h4>
            <p className='text-xs text-gray-400'>{video.creator}</p>
            <p className='text-xs text-gray-400'>
              {video.views} 視聴 • {video.age}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

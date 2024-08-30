import VideoCard from '@/components/VideoCard'
import { fetchVideos } from '@/utils/supabase/actions/fetch'

export default async function Component() {
  const featuredVideos = await fetchVideos()

  return (
    <>
      <h1 className='text-2xl font-bold mb-6 text-white'>おすすめ動画</h1>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {featuredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { VideoItem } from '@/components/SearchVideos'
import { searchVideos } from './actions' // サーバーアクションをインポート
import { Input } from '@/components/form/input'
export default function SearchResults() {
  const router = useRouter()
  const [videoData, setVideoData] = useState([])

  const handleSearch = async (formData: FormData) => {
    const results = await searchVideos(formData)
    setVideoData(results)
  }

  return (
    <div className='min-h-screen bg-gray-900 text-gray-200'>
      <main className='container mx-auto px-4 py-8'>
        <form action={handleSearch} className='mb-8'>
          <Input
            type='text'
            name='query'
            placeholder='検索キーワード'
            className='px-4 py-2 rounded-l-md bg-gray-800 text-white'
            required
          />
          <button type='submit' className='px-4 py-2 rounded-r-md bg-blue-600 text-white'>
            検索
          </button>
        </form>

        <section className='space-y-6'>
          {videoData.map((video) => (
            <VideoItem key={video.id} video={video} router={router} />
          ))}
        </section>
      </main>
    </div>
  )
}

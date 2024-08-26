'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThumbsUp, ChevronDown, ChevronUp } from 'lucide-react'
import RelatedVideos from '@/components/RelatedVideos'
import Article from '@/components/Article'
import { useState } from 'react'

const videoData = {
  className: 'w-full h-full',
  controls: true,
  src: '/OK5vzIvi86336Fel.mp4',
  title: '動画タイトル',
  description:
    'この動画の説明文です。動画の内容の簡単な概要が記載されています。さらに詳細な情報として、この動画では特定のトピックについて深く掘り下げています。視聴者の皆様には、この分野における新しい知見や興味深い事実を発見していただけると思います。また、この動画の制作過程や背景についても触れており、コンテンツの奥深さを理解する助けとなるでしょう。',
  creator: {
    name: '作成者名',
    avatar: '/placeholder-avatar.jpg',
  },
  stats: {
    likes: '1.5K',
    views: '10万',
    uploadDate: '2023年4月1日',
  },
}

const relatedVideos = [
  {
    id: 1,
    title: '関連動画 1',
    creator: '作成者 1',
    views: '100万',
    age: '1日前',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrreCfcSDMBZgSsNvhxgTpwlqxNIvR2OP08g&s',
  },
  {
    id: 2,
    title: '関連動画 2',
    creator: '作成者 2',
    views: '50万',
    age: '2日前',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGO5PRqFiCPW9vP67pmd1_EHPqM5N4CXroww&s',
  },
  {
    id: 3,
    title: '関連動画 3',
    creator: '作成者 3',
    views: '200万',
    age: '3日前',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLFjSOsaXEnBI-iko6k9ma8FIEmlNki5RBg&s',
  },
  {
    id: 4,
    title: '関連動画 4',
    creator: '作成者 4',
    views: '80万',
    age: '4日前',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDmU3M_3otC9tyg-3uUIzYMVtNPPOjpggRJg&s',
  },
  {
    id: 5,
    title: '関連動画 5',
    creator: '作成者 5',
    views: '80万',
    age: '4日前',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9C3cLQFPX1O0WL5AuUC4EaV3J0mk9co06Q&s',
  },
  {
    id: 6,
    title: '関連動画 6',
    creator: '作成者 6',
    views: '80万',
    age: '4日前',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDmU3M_3otC9tyg-3uUIzYMVtNPPOjpggRJg&s',
  },
  {
    id: 7,
    title: '関連動画 7',
    creator: '作成者 7',
    views: '80万',
    age: '4日前',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDmU3M_3otC9tyg-3uUIzYMVtNPPOjpggRJg&s',
  },
]

export default function WatchPage() {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleDescription = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className='min-h-screen bg-gray-900 text-gray-100'>
      <main className='container mx-auto p-4'>
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='lg:w-2/3'>
            <div className='aspect-video mb-4'>
              <video className={videoData.className} controls src={videoData.src}>
                お使いのブラウザは動画タグをサポートしていません。
              </video>
            </div>
            <h2 className='text-2xl font-bold mb-2'>{videoData.title}</h2>
            <div className='flex items-center mb-4'>
              <div className='flex items-center gap-2'>
                <Avatar>
                  <AvatarImage src={videoData.creator.avatar} alt={videoData.creator.name} />
                  <AvatarFallback>{videoData.creator.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className='font-semibold'>{videoData.creator.name}</span>
              </div>
            </div>
            <div className='flex gap-4 mb-4'>
              <Button
                variant='outline'
                className='flex items-center gap-2 bg-gray-800 text-gray-300 hover:bg-gray-700'
              >
                <ThumbsUp className='h-4 w-4' />
                {videoData.stats.likes}
              </Button>
            </div>
            <div className='mb-4 bg-gray-800 p-4 rounded-lg'>
              <p className={`${isExpanded ? '' : 'line-clamp-2'}`}>{videoData.description}</p>
              <Button
                variant='ghost'
                className='mt-2 text-blue-400 hover:text-blue-300'
                onClick={toggleDescription}
              >
                {isExpanded ? (
                  <>
                    折りたたむ <ChevronUp className='ml-1 h-4 w-4' />
                  </>
                ) : (
                  <>
                    もっと見る <ChevronDown className='ml-1 h-4 w-4' />
                  </>
                )}
              </Button>
            </div>
            <div className='mb-4'>
              <h3 className='text-xl font-semibold mb-2'>Comments</h3>
              <Input
                placeholder='Add a comment...'
                className='mb-2 bg-gray-800 text-gray-100 border-gray-700'
              />
              <Button className='bg-blue-600 hover:bg-blue-700'>Comment</Button>
            </div>
          </div>
          <div className='lg:w-1/3'>
            <Article />
          </div>
        </div>
        <RelatedVideos videos={relatedVideos} />
      </main>
    </div>
  )
}

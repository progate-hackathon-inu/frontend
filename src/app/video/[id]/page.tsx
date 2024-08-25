import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThumbsUp, ThumbsDown, Share2 } from 'lucide-react'
import RelatedVideos from '@/components/RelatedVideos'

const videoData = {
  className: 'w-full h-full',
  controls: true,
  src: '/OK5vzIvi86336Fel.mp4',
  title: '動画タイトル',
  description: 'この動画の説明文です。動画の内容の簡単な概要が記載されています。',
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
  return (
    <div className='min-h-screen bg-gray-900 text-gray-100'>
      <main className='container mx-auto p-4 flex flex-col md:flex-row gap-4'>
        <div className='md:w-3/4'>
          <div className='aspect-video mb-4'>
            <video className={videoData.className} controls src={videoData.src}>
              お使いのブラウザは動画タグをサポートしていません。
            </video>
          </div>
          <h2 className='text-2xl font-bold mb-2'>{videoData.title}</h2>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <Avatar>
                <AvatarImage src={videoData.creator.avatar} alt={videoData.creator.name} />
                <AvatarFallback>{videoData.creator.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className='font-semibold'>{videoData.creator.name}</span>
            </div>
            <Button>Subscribe</Button>
          </div>
          <div className='flex gap-4 mb-4'>
            <Button
              variant='outline'
              className='flex items-center gap-2 bg-gray-800 text-gray-300 hover:bg-gray-700'
            >
              <ThumbsUp className='h-4 w-4' />
              {videoData.stats.likes}
            </Button>
            <Button
              variant='outline'
              className='flex items-center gap-2 bg-gray-800 text-gray-300 hover:bg-gray-700'
            >
              <ThumbsDown className='h-4 w-4' />
              Dislike
            </Button>
            <Button
              variant='outline'
              className='flex items-center gap-2 bg-gray-800 text-gray-300 hover:bg-gray-700'
            >
              <Share2 className='h-4 w-4' />
              Share
            </Button>
          </div>
          <p className='mb-4'>{videoData.description}</p>
          <div className='mb-4'>
            <h3 className='text-xl font-semibold mb-2'>Comments</h3>
            <Input
              placeholder='Add a comment...'
              className='mb-2 bg-gray-800 text-gray-100 border-gray-700'
            />
            <Button className='bg-blue-600 hover:bg-blue-700'>Comment</Button>
          </div>
        </div>
        <RelatedVideos videos={relatedVideos} />
      </main>
    </div>
  )
}

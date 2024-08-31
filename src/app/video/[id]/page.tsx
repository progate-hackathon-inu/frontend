import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ThumbsUp } from 'lucide-react'
import LikeButton from '@/components/LikesButton/LikesButton'
import RelatedVideos from '@/components/video/RelatedVideos'
import Article from '@/components/video/Article'
import Comments from '@/components/video/Comments'
import VideoDescriptions from '@/components/video/VideoDescription'
import { fetchMarkdownFile } from './action'
import Link from 'next/link'

const videoData = {
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
    uploadTime: '14:30', // 投稿時刻を追加
  },
  tags: ['アルゴリズム', '可視化', 'プログラミング', 'コンピューターサイエンス'],
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

const references = [
  'https://zenn.dev/ryple/articles/49881fdb2fef51',
  'https://zenn.dev/osasasasa/articles/20b67f4481107c',
  'https://zenn.dev/moko_poi/articles/8a2dece3a7b9c9',
]

const sampleComments = [
  {
    id: 1,
    user: {
      name: '山田太郎',
      avatar: '/avatars/user1.jpg',
    },
    content: 'とても興味深い動画でした！もっと詳しく知りたいです。',
    likes: 15,
    timestamp: '2日前',
  },
  {
    id: 2,
    user: {
      name: '佐藤花子',
      avatar: '/avatars/user2.jpg',
    },
    content: '説明が分かりやすくて助かりました。ありがとうございます！',
    likes: 8,
    timestamp: '1日前',
  },
  {
    id: 3,
    user: {
      name: '鈴木一郎',
      avatar: '/avatars/user3.jpg',
    },
    content: 'この内容について、さらに深掘りした動画も見てみたいです。',
    likes: 5,
    timestamp: '3時間前',
  },
]

function VideoTags({ tags }: { tags: string[] }) {
  return (
    <div className='flex flex-wrap gap-1 mb-4'>
      {tags.map((tag, index) => (
        <Link
          key={index}
          href={`/search?tag=${encodeURIComponent(tag)}`}
          className='text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded hover:bg-gray-600 transition-colors'
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}

export default async function WatchPage({ params }: { params: { id: string } }) {
  async function fetchAlgorithmData() {
    try {
      const text = await fetchMarkdownFile()
      return text
    } catch (error) {
      console.error('Error fetching algorithm data:', error)
    }
  }

  const text = await fetchAlgorithmData()

  return (
    <div className='min-h-screen bg-gray-900 text-gray-100'>
      <main className='container mx-auto p-4'>
        <div className='flex flex-col lg:flex-row gap-8 mb-5'>
          <div className='w-full lg:w-2/3 xl:w-3/4'>
            <div className='aspect-video mb-4'>
              <video className='w-full h-full' controls src={videoData.src}>
                お使いのブラウザは動画タグをサポートしていません。
              </video>
            </div>
            <h2 className='text-xl sm:text-2xl font-bold mb-2'>{videoData.title}</h2>
            <VideoTags tags={videoData.tags} />
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4'>
              <div className='flex items-center gap-2'>
                <Avatar>
                  <AvatarImage src={videoData.creator.avatar} alt={videoData.creator.name} />
                  <AvatarFallback>{videoData.creator.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className='font-semibold'>{videoData.creator.name}</span>
              </div>
              <div className='flex items-center gap-4'>
                <span className='text-sm text-gray-400'>
                  {videoData.stats.uploadDate} {videoData.stats.uploadTime}
                </span>
                <LikeButton videoId={parseInt(params.id)} />
              </div>
            </div>
            <VideoDescriptions description={videoData?.description} />
            <Comments comments={sampleComments} />
          </div>
          <div className='w-full lg:w-1/3 xl:w-1/4'>
            {text && <Article algorithmData={text} />}
            <References references={references} />
          </div>
        </div>
        <RelatedVideos videos={relatedVideos} />
      </main>
    </div>
  )
}

function References({ references }: { references: string[] }) {
  return (
    <div className='mt-8 bg-gray-800 p-4 rounded-lg'>
      <h3 className='text-lg sm:text-xl font-semibold mb-4'>参考文献</h3>
      <ul className='space-y-2'>
        {references.map((ref, index) => (
          <li key={index}>
            <a
              href={ref}
              className='text-blue-400 hover:text-blue-300 break-all text-sm sm:text-base'
            >
              {ref}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

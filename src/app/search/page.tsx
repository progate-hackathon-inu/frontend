'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// アルゴリズム関連のサンプルデータを7個用意
const videoData = [
  {
    id: 1,
    title: '初心者向けソートアルゴリズム入門',
    views: '50万',
    postedAgo: '2週間前',
    channelName: 'アルゴマスター',
    description:
      'バブルソート、クイックソート、マージソートなど、基本的なソートアルゴリズムについて解説します。',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrreCfcSDMBZgSsNvhxgTpwlqxNIvR2OP08g&s',
    channelAvatar: '/avatars/algo-master.png',
    tags: ['ソートアルゴリズム', '初心者向け', 'バブルソート', 'クイックソート', 'マージソート'],
  },
  {
    id: 2,
    title: 'グラフ理論とダイクストラ法',
    views: '30万',
    postedAgo: '3日前',
    channelName: 'コーディング道場',
    description:
      'グラフ理論の基礎からダイクストラ法による最短経路探索アルゴリズムまで、詳しく解説します。',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGO5PRqFiCPW9vP67pmd1_EHPqM5N4CXroww&s',
    channelAvatar: '/avatars/coding-dojo.png',
    tags: ['グラフ理論', 'ダイクストラ法', '最短経路探索', 'アルゴリズム'],
  },
  {
    id: 3,
    title: '動的計画法で解く最適化問題',
    views: '40万',
    postedAgo: '1週間前',
    channelName: 'アルゴリズム探求者',
    description:
      '動的計画法の考え方と実装方法を解説。ナップサック問題や最長共通部分列問題を例に挙げて説明します。',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLFjSOsaXEnBI-iko6k9ma8FIEmlNki5RBg&s',
    channelAvatar: '/avatars/algo-explorer.png',
    tags: ['動的計画法', '最適化問題', 'ナップサック問題', '最長共通部分列問題'],
  },
  {
    id: 4,
    title: 'ビッグOと時間計算量の理解',
    views: '60万',
    postedAgo: '5日前',
    channelName: '計算複雑性チャンネル',
    description:
      'アルゴリズムの効率を評価するためのビッグO記法と時間計算量について、わかりやすく解説します。',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDmU3M_3otC9tyg-3uUIzYMVtNPPOjpggRJg&s',
    channelAvatar: '/avatars/complexity-channel.png',
    tags: ['ビッグO', '時間計算量', 'アルゴリズムの効率'],
  },
  {
    id: 5,
    title: '再帰アルゴリズムのマスター方法',
    views: '35万',
    postedAgo: '1ヶ月前',
    channelName: 'プログラミング講座',
    description:
      '再帰の考え方と実装のコ���を解説。フィボナッチ数列や木構造の探索を例に、再帰の威力を体感しましょう。',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9C3cLQFPX1O0WL5AuUC4EaV3J0mk9co06Q&s',
    channelAvatar: '/avatars/programming-lecture.png',
    tags: ['再帰', 'フィボナッチ数列', '木構造の探索'],
  },
  {
    id: 6,
    title: 'グリーディアルゴリズムの応用例',
    views: '25万',
    postedAgo: '2週間前',
    channelName: 'アルゴリズム実践塾',
    description:
      'グリーディアルゴリズムの基本概念と、実際の問題への応用方法を紹介。ハフマン符号化なども取り上げます。',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTahPlO0dH-nIRvDSfr7TawBUX4wUq4En9sjg&s',
    channelAvatar: '/avatars/algo-practice.png',
    tags: ['グリーディアルゴリズム', 'ハフマン符号化', '問題の応用'],
  },
  {
    id: 7,
    title: '機械学習アルゴリズム入門',
    views: '70万',
    postedAgo: '4日前',
    channelName: 'AI研究所',
    description:
      '機械学習の基本的なアルゴリズムを解説。線形回帰、決定木、k-近傍法などについて、初心者にもわかりやすく説明します。',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbxpyHfjuffZLL2sKYjXSOzCFNugEjerTVEw&s',
    channelAvatar: '/avatars/ai-lab.png',
    tags: ['機械学習', 'AI', '線形回帰', '決定木', 'k-近傍法', '初心者向け'],
  },
]

// ビデオの型定義
type Video = {
  id: number
  title: string
  views: string
  postedAgo: string
  channelName: string
  description: string
  thumbnail: string
  channelAvatar: string
  tags: string[]
}

// ビデオアイテムコンポーネント
const VideoItem = ({ video }: { video: Video }) => {
  const router = useRouter()

  const handleTagClick = (e: React.MouseEvent<HTMLSpanElement>, tag: string) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/search?tag=${encodeURIComponent(tag)}`)
  }

  return (
    <Link
      href={`/video/${video.id}`}
      className='block bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-750 transition-colors duration-200'
    >
      <div className='flex'>
        <div className='flex-shrink-0 mr-6'>
          <Image
            src={video.thumbnail}
            alt={`${video.title}のサムネイル`}
            width={320}
            height={180}
            className='w-48 h-28 object-cover rounded-md'
          />
        </div>
        <div className='flex-1'>
          <h3 className='text-xl font-semibold mb-2 text-gray-100'>{video.title}</h3>
          <p className='text-sm text-gray-400 mb-3'>
            {video.views}回視聴 • {video.postedAgo}
          </p>
          <div className='flex items-center mb-3'>
            <Avatar className='h-8 w-8 mr-3'>
              <AvatarImage src={video.channelAvatar} alt={video.channelName} />
              <AvatarFallback>{video.channelName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className='text-sm text-gray-300'>{video.channelName}</span>
          </div>
          <p className='text-sm text-gray-400 line-clamp-2 mb-3'>{video.description}</p>
          <div className='flex flex-wrap gap-2'>
            {video.tags.map((tag, index) => (
              <span
                key={index}
                className='text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded cursor-pointer hover:bg-gray-600'
                onClick={(e) => handleTagClick(e, tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function SearchResults() {
  return (
    <div className='min-h-screen bg-gray-900 text-gray-200'>
      <main className='container mx-auto px-4 py-8'>
        <section className='space-y-6'>
          {videoData.map((video) => (
            <VideoItem key={video.id} video={video} />
          ))}
        </section>
      </main>
    </div>
  )
}

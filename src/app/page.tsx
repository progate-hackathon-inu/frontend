import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'

// データを別のオブジェクトとして定義
const featuredVideos = [
  {
    id: 1,
    title: 'Sorting Algorithm Visualization',
    author: 'AlgoMaster',
    views: 10000,
    likes: 500,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrreCfcSDMBZgSsNvhxgTpwlqxNIvR2OP08g&s',
  },
  {
    id: 2,
    title: 'グラフ走査の解説',
    author: 'コードニンジャ',
    views: 8000,
    likes: 400,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLFjSOsaXEnBI-iko6k9ma8FIEmlNki5RBg&s',
  },
  {
    id: 3,
    title: '動的計画法の基礎',
    author: 'DPエキスパート',
    views: 7500,
    likes: 350,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLFjSOsaXEnBI-iko6k9ma8FIEmlNki5RBg&s',
  },
  {
    id: 4,
    title: '二分探索木の実装',
    author: 'ツリーマスター',
    views: 9000,
    likes: 450,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDmU3M_3otC9tyg-3uUIzYMVtNPPOjpggRJg&s',
  },
  {
    id: 5,
    title: 'ダイクストラのアルゴリズムのウォークスルー',
    author: 'グラフガルー',
    views: 8500,
    likes: 420,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9C3cLQFPX1O0WL5AuUC4EaV3J0mk9co06Q&s',
  },
  {
    id: 6,
    title: 'クイックソート vs マージソート',
    author: 'SortingPro',
    views: 7800,
    likes: 380,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTahPlO0dH-nIRvDSfr7TawBUX4wUq4En9sjg&s',
  },
  {
    id: 8,
    title: '複素数と複素平面',
    author: 'ComplexMathWizard',
    views: 13000,
    likes: 950,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbxpyHfjuffZLL2sKYjXSOzCFNugEjerTVEw&s',
  },
  {
    id: 9,
    title: '統計学の基礎',
    author: 'StatisticsGuru',
    views: 16000,
    likes: 1300,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGO5PRqFiCPW9vP67pmd1_EHPqM5N4CXroww&s',
  },
  {
    id: 10,
    title: 'ネットワーク理論入門',
    author: 'NetworkTheoryPro',
    views: 9800,
    likes: 750,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3zOkABWMXRVVoWonlyVXLn2ZHAcgiCKci_A&s',
  },
  {
    id: 11,
    title: '三角関数入門',
    author: 'NetworkTheoryPro',
    views: 9800,
    likes: 750,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjWjaYk-smRMeVBEoQr5oRzfB4xkHw_N0-3Q&s',
  },
  {
    id: 12,
    title: 'アルゴリズム入門',
    author: 'NetworkTheoryPro',
    views: 9800,
    likes: 750,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVhrNLresww-TYkb7XfWfQmlQD-DA_OHMiOA&s',
  },
  {
    id: 13,
    title: 'manim入門',
    author: 'NetworkTheoryPro',
    views: 9800,
    likes: 750,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGO5PRqFiCPW9vP67pmd1_EHPqM5N4CXroww&s',
  },
]
type Video = {
  id: number
  title: string
  author: string
  views: number
  likes: number
  imageUrl: string
}

// ビデオカードコンポーネントを作成
function VideoCard({ video }: { video: Video }) {
  return (
    <Link href={`/video`} className='block'>
      <Card className='bg-gray-800 text-white hover:bg-gray-700 transition-colors'>
        <CardContent>
          <Image
            src={video.imageUrl}
            alt={video.title}
            width={320}
            height={180}
            className='w-full h-40 object-cover rounded-md'
          />
          <h2 className='mt-4 text-lg font-semibold'>{video.title}</h2>
          <p className='text-sm text-gray-400'>{video.author}</p>
          <p className='text-sm text-gray-400'>
            {video.views.toLocaleString()} 回視聴 • {video.likes.toLocaleString()} いいね
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function Component() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex-1 p-8 bg-gray-900'>
          <h1 className='text-3xl font-bold mb-8 text-white'>Featured Videos</h1>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {featuredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

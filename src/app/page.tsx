import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export default function Component() {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='flex items-center justify-between p-4 bg-gray-800'>
        <div className='text-white text-2xl font-bold'>ManimTube</div>
        <div className='flex items-center space-x-4'>
          <Input
            type='search'
            placeholder='Search...'
            className='w-64 p-2 rounded-md bg-gray-700 text-white'
          />
          <Button variant='default' className='bg-gray-700 text-white'>
            Login
          </Button>
        </div>
      </header>
      <div className='flex flex-1'>
        <aside className='w-64 p-4 bg-gray-900'>
          <nav className='space-y-4'>
            <Link href='#' className='block text-lg font-medium text-gray-300' prefetch={false}>
              Home
            </Link>
            <Link href='#' className='block text-lg font-medium text-gray-300' prefetch={false}>
              Upload Video
            </Link>
            <Link href='#' className='block text-lg font-medium text-gray-300' prefetch={false}>
              Favorites
            </Link>
          </nav>
        </aside>
        <main className='flex-1 p-8 bg-gray-900'>
          <h1 className='text-3xl font-bold mb-8 text-white'>Featured Videos</h1>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            <Card className='bg-gray-800 text-white'>
              <CardContent>
                <Image
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrreCfcSDMBZgSsNvhxgTpwlqxNIvR2OP08g&s'
                  alt='Sorting Algorithm Visualization'
                  width={320}
                  height={180}
                  className='w-full h-40 object-cover rounded-md'
                />
                <h2 className='mt-4 text-lg font-semibold'>Sorting Algorithm Visualization</h2>
                <p className='text-sm text-gray-400'>AlgoMaster</p>
                <p className='text-sm text-gray-400'>10,000 views • 500 likes</p>
              </CardContent>
            </Card>
            <Card className='bg-gray-800 text-white'>
              <CardContent>
                <Image
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLFjSOsaXEnBI-iko6k9ma8FIEmlNki5RBg&s'
                  alt='グラフ走査の解説'
                  width={320}
                  height={180}
                  className='w-full h-40 object-cover rounded-md'
                />
                <h2 className='mt-4 text-lg font-semibold'>グラフ走査の解説</h2>
                <p className='text-sm text-gray-400'>コードニンジャ</p>
                <p className='text-sm text-gray-400'>8,000 回視聴 • 400 いいね</p>
              </CardContent>
            </Card>
            <Card className='bg-gray-800 text-white'>
              <CardContent>
                <Image
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLFjSOsaXEnBI-iko6k9ma8FIEmlNki5RBg&s'
                  alt='動的計画法の基礎'
                  width={320}
                  height={180}
                  className='w-full h-40 object-cover rounded-md'
                />
                <h2 className='mt-4 text-lg font-semibold'>動的計画法の基礎</h2>
                <p className='text-sm text-gray-400'>DPエキスパート</p>
                <p className='text-sm text-gray-400'>7,500 回視聴 • 350 いいね</p>
              </CardContent>
            </Card>
            <Card className='bg-gray-800 text-white'>
              <CardContent>
                <Image
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDmU3M_3otC9tyg-3uUIzYMVtNPPOjpggRJg&s'
                  alt='二分探索木の実装'
                  width={320}
                  height={180}
                  className='w-full h-40 object-cover rounded-md'
                />
                <h2 className='mt-4 text-lg font-semibold'>二分探索木の実装</h2>
                <p className='text-sm text-gray-400'>ツリーマスター</p>
                <p className='text-sm text-gray-400'>9,000 回視聴 • 450 いいね</p>
              </CardContent>
            </Card>
            <Card className='bg-gray-800 text-white'>
              <CardContent>
                <Image
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9C3cLQFPX1O0WL5AuUC4EaV3J0mk9co06Q&s'
                  alt='ダイクストラのアルゴリズムのウォークスルー'
                  width={320}
                  height={180}
                  className='w-full h-40 object-cover rounded-md'
                />
                <h2 className='mt-4 text-lg font-semibold'>ダイクストラのアルゴリズム</h2>
                <p className='text-sm text-gray-400'>グラフガルー</p>
                <p className='text-sm text-gray-400'>8,500 回視聴 • 420 いいね</p>
              </CardContent>
            </Card>
            <Card className='bg-gray-800 text-white'>
              <CardContent>
                <Image
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTahPlO0dH-nIRvDSfr7TawBUX4wUq4En9sjg&s'
                  alt='クイックソート vs マージソート'
                  width={320}
                  height={180}
                  className='w-full h-40 object-cover rounded-md'
                />
                <h2 className='mt-4 text-lg font-semibold'>Quick Sort vs Merge Sort</h2>
                <p className='text-sm text-gray-400'>SortingPro</p>
                <p className='text-sm text-gray-400'>7,800 views • 380 likes</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

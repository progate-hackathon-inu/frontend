import VideoCard from '@/components/VideoCard'

// データを別のオブジェクトとして定義
const featuredVideos = [
  {
    id: 1,
    title:
      'Sorting Algorithm Visualization aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    username: 'AlgoMaster',
    views: 10000,
    likes: 500,
    thumbnail_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrreCfcSDMBZgSsNvhxgTpwlqxNIvR2OP08g&s', // imageUrlをthumbnail_urlに変更
    video_tags: ['アルゴリズム', 'ソート', '可視化', 'プログラミング', 'コンピューターサイエンス'],
  },
  {
    id: 2,
    title: 'グラフ走査の解説',
    username: 'コードニンジャ',
    views: 8000,
    likes: 400,
    thumbnail_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLFjSOsaXEnBI-iko6k9ma8FIEmlNki5RBg&s', // imageUrlをthumbnail_urlに変更
    video_tags: ['グラフ理論', 'アルゴリズム', 'データ構造', '探索', '最適化'],
  },
  {
    id: 3,
    title: '動的計画法の基礎',
    username: 'DPエキスパート',
    views: 7500,
    likes: 350,
    thumbnail_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLFjSOsaXEnBI-iko6k9ma8FIEmlNki5RBg&s', // imageUrlをthumbnail_urlに変更
    video_tags: ['動的計画法', 'アルゴリズム', '最適化', '数学'],
  },
  {
    id: 4,
    title: '二分探索木の実装',
    username: 'ツリーマスター',
    views: 9000,
    likes: 450,
    thumbnail_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDmU3M_3otC9tyg-3uUIzYMVtNPPOjpggRJg&s', // imageUrlをthumbnail_urlに変更
    video_tags: ['データ構造', 'アルゴリズム', '探索', '木構造'],
  },
  {
    id: 5,
    title: 'ダイクストラのアルゴリズムのウォークスルー',
    username: 'グラフガルー',
    views: 8500,
    likes: 420,
    thumbnail_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9C3cLQFPX1O0WL5AuUC4EaV3J0mk9co06Q&s', // imageUrlをthumbnail_urlに変更
    video_tags: ['グラフ理論', '最短経路', 'アルゴリズム', '探索'],
  },
  {
    id: 6,
    title: 'クイックソート vs マージソート',
    username: 'SortingPro',
    views: 7800,
    likes: 380,
    thumbnail_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTahPlO0dH-nIRvDSfr7TawBUX4wUq4En9sjg&s', // imageUrlをthumbnail_urlに変更
    video_tags: ['ソート', 'アルゴリズム', 'データ構造', 'プロラミング'],
  },
  {
    id: 8,
    title: '複素数と複素平面',
    username: 'ComplexMathWizard',
    views: 13000,
    likes: 950,
    thumbnail_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbxpyHfjuffZLL2sKYjXSOzCFNugEjerTVEw&s', // imageUrlをthumbnail_urlに変更
    video_tags: ['数学', '複素数', '代数', '幾何学'],
  },
  {
    id: 9,
    title: '統計学の基礎',
    username: 'StatisticsGuru',
    views: 16000,
    likes: 1300,
    thumbnail_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGO5PRqFiCPW9vP67pmd1_EHPqM5N4CXroww&s', // imageUrlをthumbnail_urlに変更
    video_tags: ['統計学', 'データ解析', '機械学習', '数学'],
  },
  {
    id: 10,
    title: 'ネットワーク理論入門',
    username: 'NetworkTheoryPro',
    views: 9800,
    likes: 750,
    thumbnail_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3zOkABWMXRVVoWonlyVXLn2ZHAcgiCKci_A&s', // imageUrlをthumbnail_urlに変更
    video_tags: ['ネットワーク理論', 'グラフ理論', 'アルゴリズム', '通信理論'],
  },
  {
    id: 11,
    title: '三角関数入門',
    username: 'NetworkTheoryPro',
    views: 9800,
    likes: 750,
    thumbnail_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjWjaYk-smRMeVBEoQr5oRzfB4xkHw_N0-3Q&s', // imageUrlをthumbnail_urlに変更
    video_tags: ['数学', '三角関数', '幾何学', '解析学'],
  },
  {
    id: 12,
    title: 'アルゴリズム入門',
    author: 'NetworkTheoryPro',
    views: 9800,
    likes: 750,
    thumbnail_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVhrNLresww-TYkb7XfWfQmlQD-DA_OHMiOA&s', // imageUrlをthumbnail_urlに変更
    video_tags: ['アルゴリズム', 'プログラミング', 'データ構造', '数学'],
  },
  {
    id: 13,
    title: 'manim入門',
    author: 'NetworkTheoryPro',
    views: 9800,
    likes: 750,
    thumbnail_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGO5PRqFiCPW9vP67pmd1_EHPqM5N4CXroww&s', // imageUrlをthumbnail_urlに変更
    video_tags: ['アニメーション', 'manim', '数学', 'プログラミング'],
  },
]

export default function Component() {
  return (
    <>
      <h1 className='text-2xl font-bold mb-6 text-white'>Featured Videos</h1>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {featuredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </>
  )
}

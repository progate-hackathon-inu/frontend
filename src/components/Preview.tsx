import { Badge } from '@/components/ui/badge'
import { Play } from 'lucide-react'

interface PreviewProps {
  title: string
  tags: string[]
  description: string
  previewUrl: string | null
  manimCode: string
  manimFile: File | null
  videoFile: File | null
}

export default function Preview({
  title,
  tags,
  description,
  previewUrl,
  manimCode,
  manimFile,
  videoFile,
}: PreviewProps) {
  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-semibold mb-4'>プレビュー</h2>
      <div className='aspect-video bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden'>
        {previewUrl ? (
          <video src={previewUrl} controls className='w-full h-full'>
            お使いのブラウザは動画タグをサポートしていません。
          </video>
        ) : (
          <div className='text-center'>
            <Play className='mx-auto h-16 w-16 text-gray-600' />
            <p className='mt-4 text-gray-400'>プレビューはここに表示されます</p>
          </div>
        )}
      </div>
      <div className='space-y-4'>
        <div className='bg-gray-800 p-4 rounded-lg'>
          <h3 className='text-lg font-semibold mb-2'>タイトル</h3>
          <p className='text-gray-300'>{title || '（未入力）'}</p>
        </div>
        <div className='bg-gray-800 p-4 rounded-lg'>
          <h3 className='text-lg font-semibold mb-2'>タグ</h3>
          <div className='flex flex-wrap gap-2'>
            {tags.length > 0 ? (
              tags.map((tag) => (
                <Badge key={tag} variant='secondary' className='bg-gray-700 text-white'>
                  {tag}
                </Badge>
              ))
            ) : (
              <p className='text-sm text-gray-400'>タグ: なし</p>
            )}
          </div>
        </div>
        <div className='bg-gray-800 p-4 rounded-lg'>
          <h3 className='text-lg font-semibold mb-2'>動画説明</h3>
          {description ? (
            <p className='text-gray-300 whitespace-pre-wrap'>{description}</p>
          ) : (
            <p className='text-sm text-gray-400'>（未入力）</p>
          )}
        </div>
      </div>
      {manimCode && <p className='text-sm text-gray-400'>Manimコード長: {manimCode.length} 文字</p>}
      {manimFile && <p className='text-sm text-gray-400'>Manimファイル: {manimFile.name}</p>}
      {videoFile && <p className='text-sm text-gray-400'>動画ファイル: {videoFile.name}</p>}
    </div>
  )
}

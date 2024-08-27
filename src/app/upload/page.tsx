'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const UploadForm = dynamic(() => import('@/components/UploadForm'), { ssr: false })
const Preview = dynamic(() => import('@/components/Preview'), { ssr: false })
const Article = dynamic(() => import('@/components/Article'), { ssr: false })

export default function Component() {
  const [formData, setFormData] = useState({
    title: '',
    manimCode: '',
    tags: [] as string[],
    videoFile: null as File | null,
    manimFile: null as File | null,
    description: '',
    algorithmExplanation: '',
    activeTab: 'code',
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFormChange = (data: Partial<typeof formData>) => {
    setFormData((prevData) => {
      const newData = { ...prevData, ...data }
      if (newData.videoFile && newData.videoFile !== prevData.videoFile) {
        // 新しい動画ファイルが選択された場合、プレビューURLを更新
        setPreviewUrl(URL.createObjectURL(newData.videoFile))
      }
      return newData
    })
  }

  useEffect(() => {
    // コンポーネントのクリーンアップ時にオブジェクトURLを解放
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleFormSubmit = (data: typeof formData) => {
    setFormData(data)
    console.log('Form submitted:', data)
    // ここで実際のアップロードまたは変換処理を行います
  }

  return (
    <div className='min-h-screen bg-gray-900 text-gray-200 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
        <UploadForm onSubmit={handleFormSubmit} onChange={handleFormChange} />
        <div className='space-y-4'>
          <Preview
            title={formData.title}
            tags={formData.tags}
            description={formData.description}
            previewUrl={previewUrl}
            manimCode={formData.manimCode}
            manimFile={formData.manimFile}
            videoFile={formData.videoFile}
          />
          <div className='bg-gray-800 p-4 rounded-lg'>
            <h3 className='text-lg font-semibold mb-2'>アルゴリズム解説</h3>
            <Article algorithmData={formData.algorithmExplanation} />
          </div>
        </div>
      </div>
    </div>
  )
}

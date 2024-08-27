import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, Code, Film, File, Video, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface UploadFormProps {
  onSubmit: (formData: {
    title: string
    manimCode: string
    tags: string[]
    videoFile: File | null
    manimFile: File | null
    description: string
    algorithmExplanation: string
    activeTab: string
  }) => void
  onChange: (
    formData: Partial<{
      title: string
      manimCode: string
      tags: string[]
      videoFile: File | null
      manimFile: File | null
      description: string
      algorithmExplanation: string
      activeTab: string
    }>
  ) => void
}

export default function UploadForm({ onSubmit, onChange }: UploadFormProps) {
  const [title, setTitle] = useState('')
  const [manimCode, setManimCode] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [manimFile, setManimFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState('code')
  const [description, setDescription] = useState('')
  const [algorithmExplanation, setAlgorithmExplanation] = useState('')

  const handleChange = (field: string, value: string | File | string[] | null) => {
    if (field === 'tags') {
      // tagsの場合は、現在の配列を更新する
      onChange({ tags: [...tags, value as string] })
    } else {
      onChange({ [field]: value })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      manimCode,
      tags,
      videoFile,
      manimFile,
      description,
      algorithmExplanation,
      activeTab,
    })
  }

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoFile(file)
      onChange({ videoFile: file }) // 親コンポーネントに変更を通知
    }
  }

  const handleManimFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setManimFile(file)
    }
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault()
      const newTags = [...tags, currentTag.trim()]
      setTags(newTags)
      setCurrentTag('')
      onChange({ tags: newTags }) // 親コンポーネントに新しいタグ配列を通知
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(newTags)
    onChange({ tags: newTags }) // 親コンポーネントに更新されたタグ配列を通知
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-8'>
      <Tabs defaultValue='code' className='w-full' onValueChange={setActiveTab}>
        <TabsList className='grid w-full grid-cols-3 bg-gray-800 p-1 rounded-md'>
          <TabsTrigger
            value='code'
            className='flex items-center py-2 px-3 rounded-md data-[state=active]:bg-gray-700 data-[state=active]:text-white hover:bg-gray-700 transition-colors'
          >
            <Code className='mr-2 h-4 w-4' /> Manimコード
          </TabsTrigger>
          <TabsTrigger
            value='manim-file'
            className='flex items-center py-2 px-3 rounded-md data-[state=active]:bg-gray-700 data-[state=active]:text-white hover:bg-gray-700 transition-colors'
          >
            <File className='mr-2 h-4 w-4' /> Manimファイル
          </TabsTrigger>
          <TabsTrigger
            value='video'
            className='flex items-center py-2 px-3 rounded-md data-[state=active]:bg-gray-700 data-[state=active]:text-white hover:bg-gray-700 transition-colors'
          >
            <Film className='mr-2 h-4 w-4' /> 動画ファイル
          </TabsTrigger>
        </TabsList>
        <TabsContent value='code' className='space-y-2 mt-4'>
          <Label htmlFor='manim-code' className='text-lg font-semibold'>
            Manimコード
          </Label>
          <Textarea
            id='manim-code'
            value={manimCode}
            onChange={(e) => {
              setManimCode(e.target.value)
              handleChange('manimCode', e.target.value)
            }}
            className='w-full h-40 bg-gray-800 border-gray-700 text-white'
            placeholder='Manimコードを入力'
          />
        </TabsContent>
        <TabsContent value='manim-file' className='space-y-2 mt-4'>
          <Label htmlFor='manim-file' className='text-lg'>
            Manimファイル
          </Label>
          <Input
            id='manim-file'
            type='file'
            accept='.py'
            onChange={handleManimFileChange}
            className='w-full bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 hover:file:bg-gray-600'
          />
        </TabsContent>
        <TabsContent value='video' className='space-y-2 mt-4'>
          <Label htmlFor='video-file' className='text-lg'>
            動画ファイル
          </Label>
          <Input
            id='video-file'
            type='file'
            accept='video/*'
            onChange={handleVideoFileChange}
            className='w-full bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 hover:file:bg-gray-600'
          />
        </TabsContent>
      </Tabs>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>タイトル</h3>
        <Input
          id='title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            handleChange('title', e.target.value)
          }}
          className='w-full bg-gray-800 border-gray-700 text-white'
          placeholder='タイトルを入力してください'
        />
      </div>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>タグ</h3>
        <div className='flex flex-wrap gap-2 mb-2 bg-gray-800 p-2 rounded min-h-[40px]'>
          {tags.map((tag) => (
            <Badge key={tag} variant='secondary' className='bg-gray-700 text-white'>
              {tag}
              <button
                type='button' // フォームの送信を防ぐ
                onClick={() => handleRemoveTag(tag)}
                className='ml-1 text-gray-400 hover:text-white'
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
        <Input
          id='tags'
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={handleAddTag}
          className='w-full bg-gray-800 border-gray-700 text-white'
          placeholder='タグを入力してEnterを押す'
        />
      </div>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>動画説明</h3>
        <Textarea
          id='description'
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
            handleChange('description', e.target.value)
          }}
          className='w-full bg-gray-800 border-gray-700 text-white'
          placeholder='動画の説明を入力してください'
          rows={10}
        />
      </div>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>アルゴリズム解説</h3>
        <Textarea
          id='algorithm-explanation'
          value={algorithmExplanation}
          onChange={(e) => {
            setAlgorithmExplanation(e.target.value)
            handleChange('algorithmExplanation', e.target.value)
          }}
          className='w-full h-96 bg-gray-800 border-gray-700 text-white'
          placeholder='アルゴリズムの解説をマークダウン形式で入力してください'
          rows={10}
        />
      </div>
      <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white'>
        {activeTab === 'video' ? (
          <>
            <Upload className='mr-2 h-4 w-4' /> 投稿する
          </>
        ) : (
          <>
            <Video className='mr-2 h-4 w-4' /> 動画に変換
          </>
        )}
      </Button>
    </form>
  )
}

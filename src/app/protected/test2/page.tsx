'use client'

import { useEffect, useState } from 'react'
import { createClient, Session } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Test2() {
  const [data, setData] = useState<object[]>([])
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<object | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [videos, setVideos] = useState<object[]>([])
  const [videoTags, setVideoTags] = useState<object[]>([])
  const [tags, setTags] = useState<object[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('users').select('*')

      if (error) {
        setError(error.message)
      } else {
        setData(data)
      }
    }

    const fetchSession = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

      if (sessionError) {
        setError(sessionError.message)
      } else {
        setSession(sessionData.session)
        if (sessionData.session) {
          setUser(sessionData.session.user)
        }
      }
    }

    const fetchVideos = async () => {
      const { data, error } = await supabase.from('videos').select('*')

      if (error) {
        setError(error.message)
      } else {
        setVideos(data)
      }
    }

    const fetchVideoTags = async () => {
      const { data, error } = await supabase.from('video_tags').select('*')

      if (error) {
        setError(error.message)
      } else {
        setVideoTags(data)
      }
    }

    const fetchTags = async () => {
      const { data, error } = await supabase.from('tags').select('*')

      if (error) {
        setError(error.message)
      } else {
        setTags(data)
      }
    }

    fetchData()
    fetchSession()
    fetchVideos()
    fetchVideoTags()
    fetchTags()

    // セッション変更のリスナーを設定
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    // クリーンアップ関数
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <div className='min-h-screen bg-gray-900 text-gray-200 p-4 md:p-8'>
      <h1 className='text-2xl font-bold mb-4'>ユーザー情報</h1>
      {error && <p className='text-red-500 mb-4'>エラー: {error}</p>}
      <div className='mb-8'>
        <h2 className='text-xl font-semibold mb-2'>セッション状態</h2>
        {session ? (
          <p className='text-green-500'>ログイン中</p>
        ) : (
          <p className='text-yellow-500'>未ログイン</p>
        )}
      </div>

      {user ? (
        <div className='mb-8'>
          <h2 className='text-xl font-semibold mb-2'>ログインユーザー</h2>
          <pre className='bg-gray-800 p-4 rounded'>{JSON.stringify(user, null, 2)}</pre>
        </div>
      ) : (
        <p className='mb-8'>ユーザー情報がありません</p>
      )}

      <h2 className='text-xl font-semibold mb-2'>ユーザー一覧</h2>
      {data.length > 0 ? (
        <pre className='bg-gray-800 p-4 rounded'>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>ユーザーデータを読み込み中...</p>
      )}

      <h2 className='text-xl font-semibold mb-2'>ビデオ一覧</h2>
      {videos.length > 0 ? (
        <pre className='bg-gray-800 p-4 rounded'>{JSON.stringify(videos, null, 2)}</pre>
      ) : (
        <p>ビデオデータを読み込み中...</p>
      )}

      <h2 className='text-xl font-semibold mb-2'>ビデオタグ一覧</h2>
      {videoTags.length > 0 ? (
        <pre className='bg-gray-800 p-4 rounded'>{JSON.stringify(videoTags, null, 2)}</pre>
      ) : (
        <p>ビデオタグデータを読み込み中...</p>
      )}

      <h2 className='text-xl font-semibold mb-2'>タグ一覧</h2>
      {tags.length > 0 ? (
        <pre className='bg-gray-800 p-4 rounded'>{JSON.stringify(tags, null, 2)}</pre>
      ) : (
        <p>タグデータを読み込み中...</p>
      )}
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { createClient, Session } from '@supabase/supabase-js'
import { fetchVideosWithTags, fetchVideosWithLikesAndComments } from './action'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function Test2() {
  const [error, setError] = useState<string | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<object | null>(null)
  const [videosWithTags, setVideosWithTags] = useState<object[]>([])
  const [videosWithLikesAndComments, setVideosWithLikesAndComments] = useState<object[]>([])

  useEffect(() => {
    const fetchSession = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) {
        setError(sessionError.message)
      } else {
        setSession(sessionData.session)
        setUser(sessionData.session?.user ?? null)
      }
    }

    const fetchVideosData = async () => {
      try {
        const tagsData = await fetchVideosWithTags()
        setVideosWithTags(tagsData)
        const likesCommentsData = await fetchVideosWithLikesAndComments()
        setVideosWithLikesAndComments(likesCommentsData)
      } catch (error) {
        setError((error as Error).message)
      }
    }

    fetchSession()
    fetchVideosData()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

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

      <h2 className='text-xl font-semibold mb-2'>動画一覧画面で使用するデータをフ��ッチ</h2>
      {videosWithTags.length > 0 ? (
        <pre className='bg-gray-800 p-4 rounded'>{JSON.stringify(videosWithTags, null, 2)}</pre>
      ) : (
        <p>ビデオとタグデータを読み込み中...</p>
      )}

      <h2 className='text-xl font-semibold mb-2'>動画視聴画面で使用するデータをフェッチ</h2>
      {videosWithLikesAndComments.length > 0 ? (
        <pre className='bg-gray-800 p-4 rounded'>
          {JSON.stringify(videosWithLikesAndComments, null, 2)}
        </pre>
      ) : (
        <p>ビデオ、いいね、コメントデータを読み込み中...</p>
      )}
    </div>
  )
}

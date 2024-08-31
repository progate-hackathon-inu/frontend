'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export async function fetchVideosWithTags() {
  const { data, error } = await supabase.from('videos').select(`
    *,
    users!user_id (
      username,
      avatar
    ),
    video_tags (
      tags (
        name
      )
    ),
    likes (
      user_id
    )
  `)

  if (error) {
    throw new Error(error.message)
  }

  const formattedData = data.map((video) => ({
    ...video,
    username: video.users.username,
    avatar: video.users.avatar,
    video_tags: video.video_tags.map((tag: { tags: { name: string } }) => tag.tags.name),
    likes_count: video.likes.length,
  }))

  return formattedData
}

export async function fetchVideosWithLikesAndComments() {
  const { data, error } = await supabase.from('videos').select(`
    *,
    users!user_id (
      username,
      avatar
    ),
    likes (
      user_id
    ),
    comments (
      content,
      users (
        username,
        avatar
      )
    ),
    video_tags (
      tags (
        name
      )
    ),
    video_references (
      reference_items (
        url
      )
    )
  `)

  if (error) {
    throw new Error(error.message)
  }

  const formattedData = data.map((video) => ({
    ...video,
    username: video.users.username,
    avatar: video.users.avatar,
    users: undefined,
    likes_count: video.likes.length,
    comments_count: video.comments.length,
    comments: video.comments
      .map((comment) => ({
        content: comment.content,
        username: comment.users.username,
        avatar: comment.users.avatar,
      }))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    tags: video.video_tags.map((tag: { tags: { name: string } }) => tag.tags.name),
    references: video.video_references.map(
      (vr: { reference_items: { url: string } }) => vr.reference_items.url
    ),
    likes: undefined,
    video_tags: undefined,
    video_references: undefined,
  }))

  return formattedData
}

export async function uploadVideo(videoPath: string, thumbnailPath: string, authUserId: string) {
  // まず、authUserIdを使用してusersテーブルからユーザーのidを取得
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('auth_id', authUserId)
    .single()

  if (userError) {
    throw new Error(userError.message)
  }

  if (!userData) {
    throw new Error('ユーザーが見つかりません')
  }

  // 取得したidを使用してvideosテーブルに挿入
  const { data, error } = await supabase.from('videos').insert({
    video_url: videoPath,
    thumbnail_url: thumbnailPath,
    user_id: userData.id,
    title: 'デフォルトタイトル',
    description: 'デフォルト説明',
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

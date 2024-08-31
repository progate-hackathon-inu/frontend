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

export async function fetchVideoWithLikesAndComments(videoId: number) {
  const { data, error } = await supabase
    .from('videos')
    .select(
      `
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
    `
    )
    .eq('id', videoId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error('動画が見つかりません')
  }

  const formattedData = {
    controls: true,
    src: data.video_url,
    title: data.title,
    description: data.description,
    creator: {
      name: data.users.username,
      avatar: data.users.avatar,
    },
    stats: {
      likes: `${data.likes.length}`,
      views: `${data.views}`,
      uploadDate: new Date(data.created_at).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      uploadTime: new Date(data.created_at).toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
    tags: data.video_tags.map((tag: { tags: { name: string } }) => tag.tags.name),
    comments: data.comments.map((comment) => ({
      id: comment.id,
      user: {
        name: comment.users.username,
        avatar: comment.users.avatar,
      },
      content: comment.content,
      likes: 0, // コメントのいいね数が必要な場合は、別途取得する必要があります
      timestamp: new Date(comment.created_at).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    })),
    references: data.video_references.map(
      (vr: { reference_items: { url: string } }) => vr.reference_items.url
    ),
  }

  return formattedData
}

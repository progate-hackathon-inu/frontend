'use server'

import { createClient } from '@/utils/supabase/server'
const supabase = createClient()

export async function searchVideos(formData: FormData) {
  const query = formData.get('query') as string
  const { data, error } = await supabase
    .from('videos')
    .select(
      `
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
    `
    )
    .ilike('title', `%${query}%`)

  if (error) {
    console.error('動画の取得中にエラーが発生しました:', error)
    throw new Error(error.message)
  }

  const formattedData = data.map((video) => ({
    id: video.id,
    title: video.title,
    description: video.description,
    video_url: video.video_url,
    thumbnail: video.thumbnail_url || '/placeholder-thumbnail.jpg',
    views: video.views ? `${video.views}回視聴` : '0回視聴',
    postedAgo: calculatePostedAgo(video.created_at),
    channelName: video.users.username,
    channelAvatar: video.users.avatar || '/placeholder-avatar.jpg',
    tags: video.video_tags.map((tag: { tags: { name: string } }) => tag.tags.name),
    likes_count: video.likes.length,
  }))
  console.log(formattedData)
  return formattedData
}

function calculatePostedAgo(createdAt: string): string {
  const now = new Date()
  const postedDate = new Date(createdAt)
  const diffInSeconds = Math.floor((now.getTime() - postedDate.getTime()) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds}秒前`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}分前`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}時間前`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}日前`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}ヶ月前`
  return `${Math.floor(diffInSeconds / 31536000)}年前`
}

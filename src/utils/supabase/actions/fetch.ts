'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export async function fetchVideos() {
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

'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export async function fetchVideosWithTags() {
  const { data, error } = await supabase.from('videos').select(`
    *,
    video_tags (
      tags (
        name
      )
    )
  `)

  if (error) {
    throw new Error(error.message)
  }

  const formattedData = data.map((video) => ({
    ...video,
    video_tags: video.video_tags.map((tag: { tags: { name: string } }) => tag.tags.name),
  }))

  return formattedData
}

export async function fetchVideosWithLikesAndComments() {
  const { data, error } = await supabase.from('videos').select(`
      *,
      likes (
        user_id
      ),
      comments (
        id,
        user_id,
        content,
        created_at
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
    likes_count: video.likes.length,
    comments_count: video.comments.length,
    comments: video.comments.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ),
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

'use server'

import { createClient } from '@/utils/supabase/server'
import { SupabaseClient } from '@supabase/supabase-js'

interface VideoData {
  id: number
  video_url: string
  // 他の必要なフィールドを追加
}

export async function videoData(id: number) {
  const allVideoData = await getVideosData(id)
  if (!allVideoData) {
    throw new Error('Video data not found')
  }
  const article = await fetchMarkdownFile(allVideoData.video_url)
  const tags = await getVideoTags(id)

  return {
    ...allVideoData,
    article,
    tags,
  }
}

export async function fetchMarkdownFile(url: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.text()
  } catch (error) {
    console.error('Error fetching markdown file:', error)
    throw new Error('Failed to fetch markdown file')
  }
}

export async function getVideosData(id: number): Promise<VideoData | null> {
  const supabase = createClient()
  const { data, error } = await supabase.from('videos').select().eq('id', id).single()

  if (error) {
    console.error('Error fetching video data:', error)
    return null
  }

  return data
}

async function getVideoTags(videoId: number): Promise<string[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('video_tags')
    .select(
      `
      tags (
        name
      )
    `
    )
    .eq('video_id', videoId)

  if (error) {
    console.error('Error fetching video tags:', error)
    return []
  }

  return data?.map((item) => item.tags.name) || []
}

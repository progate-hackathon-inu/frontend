'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

const supabase = createClient()

export async function searchVideos(formData: FormData): Promise<void> {
  const query = formData.get('query') as string

  if (!query) {
    throw new Error('Query is required');
  }
  redirect(`/explore?query=${encodeURIComponent(query)}`)
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

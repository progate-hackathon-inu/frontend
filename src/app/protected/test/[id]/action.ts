'use server'

import { createClient } from '@/utils/supabase/server'

export async function fetchMarkdownFile(fileName: string) {
  const supabase = createClient()

  try {
    // 公開URLを取得
    const { data, error } = supabase.storage.from('icons').getPublicUrl(fileName)

    if (error) {
      throw new Error('Failed to get public URL')
    }

    if (!data) {
      throw new Error('No data returned from getPublicUrl')
    }

    // 公開URLを使用してファイルを取得
    const response = await fetch(data.publicUrl)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const text = await response.text()
    return text
  } catch (error) {
    console.error('Error fetching markdown file:', error)
    throw new Error('Failed to fetch markdown file')
  }
}

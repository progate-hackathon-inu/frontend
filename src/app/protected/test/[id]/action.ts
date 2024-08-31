'use server'

import { createClient } from '@/utils/supabase/server'

interface VideoData {
  id: number
  video_url: string
  user_id: number
  // 他の必要なフィールドを追加
}

// 必要なインターフェースの定義
interface VideoData {
  id: number;
  video_url: string;
  title: string;
  description: string;
  article_url: string;
  views: number;
  created_at: string;
  user_id: number;
}

interface UserInfo {
  username: string;
  avatar: string;
}

interface FormattedVideoData {
  src: string;
  title: string;
  description: string;
  creator: {
    name: string;
    avatar: string;
  };
  stats: {
    likes: string;
    views: string;
    uploadDate: string;
    uploadTime: string;
  };
  tags: string[];
  references: string[];
  article: string;
}

export async function videoDataFunc(id: number): Promise<FormattedVideoData> {
  const allVideoData: VideoData | null = await getVideosData(id);
  if (!allVideoData) {
    throw new Error('Video data not found');
  }
  const article: string = await fetchMarkdownFile(allVideoData.article_url);
  const tags: string[] = await getVideoTags(id);
  const reference: string[] = await getUrlsByVideoId(id);
  const userInfo: UserInfo | null = await getUserInfo(allVideoData.user_id);

  if (!userInfo) {
    throw new Error('User info not found');
  }

  // 日付と時刻のフォーマット
  const createdAt = new Date(allVideoData.created_at);
  const formattedDate = new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }).format(createdAt);
  const formattedTime = createdAt.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });

  // データを指定のJSON形式に整形
  const videoData: FormattedVideoData = {
    src: allVideoData.video_url,
    title: allVideoData.title,
    description: allVideoData.description,
    creator: {
      name: userInfo.username,
      avatar: userInfo.avatar,
    },
    stats: {
      likes: '0', // この情報がデータベースにない場合、デフォルト値を設定
      views: allVideoData.views.toString(),
      uploadDate: formattedDate,
      uploadTime: formattedTime,
    },
    tags: tags,
    references: reference,
    article: article,
  };

  return videoData;
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


async function getUrlsByVideoId(videoId: number) {
  // video_referencesテーブルからreference_idを取得
  const supabase = createClient()
  const { data: videoReferences, error: videoRefError } = await supabase
    .from('video_references')
    .select('reference_id')
    .eq('video_id', videoId)

  if (videoRefError) {
    console.error('Error fetching video references:', videoRefError)
    return []
  }

  // 取得したreference_idの配列を作成
  const referenceIds = videoReferences.map(vr => vr.reference_id)

  // references_itemsテーブルから対応するURLを取得
  const { data: referenceItems, error: refItemError } = await supabase
    .from('reference_items')
    .select('url')
    .in('id', referenceIds)

  if (refItemError) {
    console.error('Error fetching reference items:', refItemError)
    return []
  }

  // URLの配列を返す
  return referenceItems.map(item => item.url)
}

async function getUserInfo(userId) {
  const supabase = createClient()
  try {
    const { data, error } = await supabase
      .from('users')
      .select('username, avatar')
      .eq('id', userId)
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error('Error fetching user info:', error.message)
    return null
  }
}
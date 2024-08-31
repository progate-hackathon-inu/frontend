'use server'

import { createClient } from '@/utils/supabase/server'

export async function getUserProfile() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('ユーザーが見つかりません')
  }

  const { data: profile, error } = await supabase
    .from('users')
    .select('username, avatar, twitter_url, github_url, description, country')
    .eq('auth_id', user.id)
    .single()

  if (error) {
    console.error('プロフィール取得エラー:', error)
    throw error
  }

  return {
    username: profile?.username,
    avatar: profile?.avatar,
    twitter_url: profile?.twitter_url,
    github_url: profile?.github_url,
    description: profile?.description,
    country: profile?.country,
  }
}

export async function updateUsername(newUsername: string) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('ユーザーが見つかりません')
  }

  const { error } = await supabase
    .from('users')
    .update({ username: newUsername })
    .eq('auth_id', user.id)

  if (error) {
    console.error('ユーザー名更新エラー:', error)
    throw error
  }

  return { success: true }
}

export async function updateUserProfile(profileData: {
  username?: string
  twitter_url?: string
  github_url?: string
  description?: string
  country?: string
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('ユーザーが見つかりません')
  }

  const { error } = await supabase.from('users').update(profileData).eq('auth_id', user.id)

  if (error) {
    console.error('プロフィール更新エラー:', error)
    throw error
  }

  return { success: true }
}

'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js' // SupabaseErrorのインポートを削除

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Test2() {
  const [data, setData] = useState<object[]>([]) // 型をobject[]に変更
  const [error, setError] = useState<string | null>(null) // 型をstring | nullに変更

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('users').select('*')

      if (error) {
        setError(error.message) // SupabaseError型のキャストを削除
      } else {
        setData(data)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='min-h-screen bg-gray-900 text-gray-200 p-4 md:p-8'>
      <h1>Test2</h1>
      {error && <p>Error: {error}</p>}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  )
}

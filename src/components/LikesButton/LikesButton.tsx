// components/LikeButton.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ThumbsUp } from 'lucide-react'
import { toggleLike, getLikeStatus, getVideoLikes } from './action'

interface LikeButtonProps {
  videoId: number
}

export default function LikeButton({ videoId }: LikeButtonProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    async function fetchInitialData() {
      const likeStatus = await getLikeStatus(videoId)
      const initialLikes = await getVideoLikes(videoId)
      if (likeStatus.success) {
        setLiked(likeStatus.liked)
      }
      setLikeCount(initialLikes)
    }
    fetchInitialData()
  }, [videoId])

  const handleLike = async () => {
    const result = await toggleLike(videoId)
    if (result.success) {
      setLiked(result.liked)
      setLikeCount((prev) => (result.liked ? prev + 1 : prev - 1))
    }
  }

  return (
    <Button
      variant='outline'
      className={`flex items-center gap-2 ${
        liked ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
      } hover:bg-gray-700`}
      onClick={handleLike}
    >
      <ThumbsUp className='h-4 w-4' />
      {likeCount}
    </Button>
  )
}

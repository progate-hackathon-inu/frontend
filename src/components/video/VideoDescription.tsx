'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
interface VideoDescriptionProps {
  description: string
}
export default function VideoDescriptions({ description }: VideoDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleDescription = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className='mb-4 bg-gray-800 p-4 rounded-lg'>
      <p className={`${isExpanded ? '' : 'line-clamp-2'}`}>{description}</p>
      <Button
        variant='ghost'
        className='mt-2 text-blue-400 hover:text-blue-300'
        onClick={toggleDescription}
      >
        {isExpanded ? (
          <>
            折りたたむ <ChevronUp className='ml-1 h-4 w-4' />
          </>
        ) : (
          <>
            もっと見る <ChevronDown className='ml-1 h-4 w-4' />
          </>
        )}
      </Button>
    </div>
  )
}

import React from 'react'
import ReactMarkdown from 'react-markdown'

interface ArticleProps {
  algorithmData: string
}

const Article: React.FC<ArticleProps> = ({ algorithmData }) => {
  return (
    <div className='bg-gray-800 p-6 rounded-lg'>
      <div className='prose prose-invert prose-lg max-h-[70vh] overflow-y-auto pr-4'>
        <ReactMarkdown>{algorithmData}</ReactMarkdown>
      </div>
    </div>
  )
}

export default Article

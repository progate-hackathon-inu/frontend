import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface ArticleProps {
  algorithmData: string
}

const Article: React.FC<ArticleProps> = ({ algorithmData }) => {
  return (
    <div className='bg-gray-800 p-6 rounded-lg'>
      <div className='prose prose-invert prose-lg max-h-[70vh] overflow-y-auto pr-4'>
        <ReactMarkdown
          components={{
            code({
              inline,
              className,
              children,
              ...props
            }: {
              inline?: boolean
              className?: string
              children: React.ReactNode
            }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag='div' {...props}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {algorithmData}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default Article

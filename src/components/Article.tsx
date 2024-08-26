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
            } & React.HTMLAttributes<HTMLElement>) {
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
            h1: ({ children }) => (
              <h1 className='text-3xl font-bold mb-4 text-blue-300'>{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className='text-2xl font-semibold mb-3 text-blue-200'>{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className='text-xl font-medium mb-2 text-blue-100'>{children}</h3>
            ),
            p: ({ children }) => <p className='mb-4 leading-relaxed'>{children}</p>,
            ul: ({ children }) => <ul className='list-disc list-inside mb-4 pl-4'>{children}</ul>,
            ol: ({ children }) => (
              <ol className='list-decimal list-inside mb-4 pl-4'>{children}</ol>
            ),
            li: ({ children }) => <li className='mb-2'>{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className='border-l-4 border-blue-500 pl-4 italic my-4'>
                {children}
              </blockquote>
            ),
          }}
        >
          {algorithmData}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default Article

import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className='w-64 p-4 bg-gray-900'>
      <nav className='space-y-4'>
        <Link href='#' className='block text-lg font-medium text-gray-300' prefetch={false}>
          Home
        </Link>
        <Link href='#' className='block text-lg font-medium text-gray-300' prefetch={false}>
          Upload Video
        </Link>
        <Link href='#' className='block text-lg font-medium text-gray-300' prefetch={false}>
          Favorites
        </Link>
      </nav>
    </aside>
  )
}

import {
  Box,
  Link,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { formatRelative } from 'date-fns'
import { Dispatch, SetStateAction, useEffect } from 'react'
import {
  IoChatbubbleOutline,
  IoEyeOutline,
  IoHeartOutline,
} from 'react-icons/io5'

import { Blog } from '@/types'
import { shortenString as s } from '@/utils'

interface PostCardProps {
  post: Blog
  setView: Dispatch<SetStateAction<'list' | 'grid'>>
  view: 'list' | 'grid'
}

function PostCard(props: PostCardProps) {
  const { post, view, setView } = props

  const isMobile = useMediaQuery('(max-width: 640px)')

  useEffect(() => {
    if (isMobile) setView('grid')
  }, [isMobile])

  return (
    <Box className="p-4 rounded-lg dark:bg-theme-dark-900 bg-transparent border-2 border-theme-red-900 shadow-lg transition-all duration-500 hover:shadow-theme-red-900 flex flex-col justify-between">
      <Box className="flex flex-col gap-3">
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-48 object-cover rounded-lg"
        />

        <Typography
          variant="h2"
          className="sm:text-2xl text-xl font-bold text-theme-red-900 break-words">
          {post.title}
        </Typography>

        <Box
          className={`dark:text-gray-400 text-gray-600 text-sm ${
            view === 'grid'
              ? 'flex-col items-center text-center gap-2'
              : 'flex-row justify-between'
          } flex items-center`}>
          <Typography variant="subtitle2" component="span">
            {formatRelative(new Date(post.created_at), new Date())} by{' '}
            <span className="text-theme-red-900">{post.user.name}</span>
          </Typography>

          <Box className="flex gap-4 mt-2 md:mt-0 sm:flex-row flex-col">
            <Tooltip title="Hearts count" disableInteractive>
              <Box className="flex items-center gap-1">
                <IoHeartOutline className="w-4 h-4" />
                <span>{post.hearts_count}</span>
              </Box>
            </Tooltip>
            <Tooltip title="Views count" disableInteractive>
              <Box className="flex items-center gap-1">
                <IoEyeOutline className="w-4 h-4" />
                <span>{post.views_count}</span>
              </Box>
            </Tooltip>

            <Tooltip title="Comments count" disableInteractive>
              <Box className="flex items-center gap-1">
                <IoChatbubbleOutline className="w-4 h-4" />
                <span>{post.comments_count}</span>
              </Box>
            </Tooltip>
          </Box>
        </Box>

        <Typography className="sm:text-lg text-base break-words">
          {s(post.body, 100)}
        </Typography>

        <Box className="mt-4">
          <Box className="flex flex-wrap gap-2 mb-2">
            {post.categories.map((category) => (
              <span
                key={category.id}
                className="px-2 py-1 text-xs rounded-full bg-gray-700 text-white">
                {category.name}
              </span>
            ))}
          </Box>

          <Box className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 text-xs rounded-full bg-theme-red-900 text-white">
                #{tag.name}
              </span>
            ))}
          </Box>
        </Box>
      </Box>

      <Box className="mt-4 flex justify-between items-center">
        <Link
          href={`/blogs/${post.slug}`}
          className="text-theme-red-900 hover:underline">
          Read More →
        </Link>
      </Box>
    </Box>
  )
}

export default PostCard

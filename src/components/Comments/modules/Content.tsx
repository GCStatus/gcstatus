import { ListItemText } from '@mui/material'
import { formatRelative } from 'date-fns'
import { memo, useMemo } from 'react'

import { Comment, User } from '@/types'

const Content = memo(
  ({
    comment,
    currentUser,
    isReply,
  }: {
    comment: Comment
    currentUser: User | null
    isReply?: boolean
  }) => {
    const { comment: text, created_at, by } = comment

    const formattedDate = useMemo(
      () => formatRelative(new Date(created_at), new Date()),
      [created_at],
    )

    return (
      <ListItemText
        primary={text}
        secondary={`by ${by.nickname === currentUser?.nickname ? 'me' : by.nickname}, ${formattedDate}`}
        primaryTypographyProps={{
          className: `dark:text-white text-gray-900 font-semibold break-words ${isReply ? 'text-sm' : ''}`,
          variant: isReply ? 'body2' : 'body1',
        }}
        secondaryTypographyProps={{
          className: 'dark:text-gray-400 text-gray-600 break-words',
          variant: 'body2',
        }}
      />
    )
  },
)

Content.displayName = 'CommentContent'

export default Content

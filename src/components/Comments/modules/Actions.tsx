import { Dispatch, memo, SetStateAction } from 'react'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'

import { Comment, User } from '@/types'
import { ActionDialog, HeartButton, Icon } from '@/components'

const HEARTABLE_TYPE = 'App\\Models\\GCStatus\\Commentable'

const Actions = memo(
  ({
    comment,
    currentUser,
    onReply,
    onDelete,
    onHeartClick,
    parentId,
    setHeartPops,
    isHearted,
  }: {
    comment: Comment
    currentUser: User | null
    onReply: (id: number) => void
    onDelete: (id: number) => void
    onHeartClick: (item: Comment, parentId?: number) => void
    parentId?: number
    setHeartPops: Dispatch<SetStateAction<number[]>>
    isHearted: boolean
  }) => {
    const isAuthor = comment.by.id === currentUser?.id
    const isReply = !!parentId

    return (
      <Box className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
        {!isAuthor ? (
          <Tooltip title="Reply" arrow>
            <IconButton
              onClick={() => onReply(comment.id)}
              size="small"
              className="hover:text-theme-red-700">
              <Icon name="IoChatboxEllipsesOutline" size={20} />
            </IconButton>
          </Tooltip>
        ) : (
          <ActionDialog
            title={`Remove ${isReply ? 'reply' : 'comment'}`}
            description="This action is irreversible. Are you sure?"
            confirmAction={() => onDelete(comment.id)}
            trigger={
              <Tooltip title="Delete" arrow>
                <IconButton size="small">
                  <Icon name="IoTrashOutline" size={20} />
                </IconButton>
              </Tooltip>
            }
          />
        )}

        <Box className="flex items-center gap-1">
          {isAuthor ? (
            <Icon name="IoHeartOutline" size={20} className="opacity-50" />
          ) : (
            <HeartButton
              heartable_id={comment.id}
              heartable_type={HEARTABLE_TYPE}
              setHeartPops={setHeartPops}
              isHearted={isHearted}
              type="icon"
              onHeartToggle={() => onHeartClick(comment, parentId)}
              size={20}
              setHearts={() => {}}
            />
          )}
          <Typography variant="body2" className="text-sm">
            {comment.hearts_count}
          </Typography>
        </Box>
      </Box>
    )
  },
)

export default Actions

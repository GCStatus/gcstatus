import toast from 'react-hot-toast'
import { useMemo, useState } from 'react'
import { enableMapSet, produce } from 'immer'
import { useNavigate } from 'react-router-dom'
import { Avatar, Box, List, ListItem } from '@mui/material'

import { Comment } from '@/types'
import { HeartsUp } from '@/components'
import { useAccount, useSuccess } from '@/hooks'
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from '@/services/api'

import { Actions, Content, Input } from './modules'

interface CommentsProps {
  defaultComments: Comment[]
  commentableId: number
  commentableType: string
}

enableMapSet()

function Comments(props: CommentsProps) {
  const { defaultComments, commentableId, commentableType } = props
  const go = useNavigate()
  const { user } = useAccount()
  const [trigger] = useCreateCommentMutation()
  const [triggerDel, { data, isSuccess }] = useDeleteCommentMutation()
  const [comments, setComments] = useState<Comment[]>(defaultComments)
  const [newMessage, setNewMessage] = useState<string>('')
  const [replyMessage, setReplyMessage] = useState<string>('')
  const [replyTo, setReplyTo] = useState<number | null>(null)
  const [heartPops, setHeartPops] = useState<number[]>([])
  const [likedComments, setLikedComments] = useState<Set<string | number>>(
    () => {
      const initialSet = new Set<string | number>()
      defaultComments.forEach((comment) => {
        if (comment.is_hearted) {
          initialSet.add(comment.id)
        }
        comment.replies.forEach((reply) => {
          if (reply.is_hearted) {
            initialSet.add(`${comment.id}-${reply.id}`)
          }
        })
      })
      return initialSet
    },
  )

  const updateComments = (recipe: (draft: Comment[]) => void) => {
    setComments(produce(recipe))
  }

  const handleDelete = async (id: number) => {
    await triggerDel(id).unwrap()

    updateComments((draft) => {
      const parentIndex = draft.findIndex((c) =>
        c.replies.some((r) => r.id === id),
      )

      if (parentIndex > -1) {
        draft[parentIndex].replies = draft[parentIndex].replies.filter(
          (r) => r.id !== id,
        )
      } else {
        return draft.filter((c) => c.id !== id)
      }
    })
  }

  const handleHeartClick = (item: Comment, parentId?: number) => {
    const isReply = Boolean(parentId)
    const itemId = isReply ? `${parentId}-${item.id}` : item.id

    const wasLiked = likedComments.has(itemId)

    setLikedComments((prev) => {
      const newSet = new Set(prev)
      wasLiked ? newSet.delete(itemId) : newSet.add(itemId)
      return newSet
    })

    updateComments((draft) => {
      if (isReply && parentId) {
        const parent = draft.find((c) => c.id === parentId)
        const reply = parent?.replies.find((r) => r.id === item.id)

        if (reply) {
          reply.hearts_count += wasLiked ? -1 : 1
          reply.is_hearted = !wasLiked
        }
      } else {
        const comment = draft.find((c) => c.id === item.id)

        if (comment) {
          comment.hearts_count += wasLiked ? -1 : 1
          comment.is_hearted = !wasLiked
        }
      }
    })
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      return toast.error('You can not submit an empty message.')
    }

    if (!user) return go('/login')

    const comment = await trigger({
      comment: newMessage,
      commentable_id: commentableId,
      commentable_type: commentableType,
    }).unwrap()

    updateComments((draft) => {
      draft.unshift(comment)
    })

    setNewMessage('')
  }

  const handleReplyMessage = async (id: number) => {
    if (!replyMessage.trim()) {
      toast.error('You can not submit an empty message.')
      return
    }

    if (!user) {
      go('/login')
      return
    }

    const reply = await trigger({
      parent_id: id,
      comment: replyMessage,
      commentable_id: commentableId,
      commentable_type: commentableType,
    }).unwrap()

    updateComments((draft) => {
      const parentComment = draft.find((comment) => comment.id === id)

      if (parentComment) {
        parentComment.replies.unshift(reply)
      }
    })

    setReplyTo(null)
    setReplyMessage('')
  }

  useSuccess(isSuccess, data?.message)

  const heartPopElements = useMemo(
    () =>
      heartPops.map((delay, index) => (
        <HeartsUp key={index} delay={delay} setHeartPops={setHeartPops} />
      )),
    [heartPops],
  )

  return (
    <Box className="flex flex-col w-full">
      <Box className="fixed inset-0 pointer-events-none z-50">
        {heartPopElements}
      </Box>

      <List className="w-full rounded-lg flex flex-col gap-6 p-4 relative">
        {comments.map((comment) => (
          <ListItem
            key={comment.id}
            className="flex flex-col relative pl-10 transition-all border-b border-gray-300 dark:border-gray-700 pb-8 last:border-b-0">
            <div className="absolute left-4 top-6 w-3 h-3 bg-theme-red-900 rounded-full"></div>
            <Box className="w-full flex flex-col sm:flex-row items-start gap-4">
              <Avatar
                src={comment.by.photo}
                alt={comment.by.name}
                className="ring-2 ring-theme-red-900">
                {comment.by.name[0]}
              </Avatar>
              <Box className="flex-1">
                <Content currentUser={user} comment={comment} />
                <Actions
                  comment={comment}
                  currentUser={user}
                  onDelete={handleDelete}
                  setHeartPops={setHeartPops}
                  onHeartClick={() => handleHeartClick(comment)}
                  onReply={() =>
                    setReplyTo(replyTo === comment.id ? null : comment.id)
                  }
                  isHearted={likedComments.has(comment.id)}
                />
              </Box>
            </Box>

            {replyTo === comment.id && (
              <Box className="w-full mt-3">
                <Input
                  value={replyMessage}
                  onChange={setReplyMessage}
                  onSend={() => handleReplyMessage(comment.id)}
                />
              </Box>
            )}

            {comment.replies.length > 0 && (
              <List className="w-full mt-3 flex flex-col gap-3 pl-6 border-l-2 border-gray-300 dark:border-gray-700">
                {comment.replies.map((reply) => (
                  <Box key={reply.id} className="relative flex py-2 pl-10">
                    <div className="absolute left-0 top-6 w-3 h-3 bg-gray-600 dark:bg-gray-400 rounded-full"></div>
                    <Box className="flex-1 flex flex-col sm:flex-row items-start gap-4">
                      <Avatar
                        src={reply.by.photo}
                        alt={reply.by.name}
                        className="ring-2 ring-gray-600 dark:ring-gray-400">
                        {reply.by.name[0]}
                      </Avatar>
                      <Box className="flex-1">
                        <Content
                          currentUser={user}
                          comment={reply}
                          isReply
                        />
                        <Actions
                          comment={reply}
                          currentUser={user}
                          onDelete={handleDelete}
                          setHeartPops={setHeartPops}
                          isHearted={likedComments.has(
                            `${comment.id}-${reply.id}`,
                          )}
                          onHeartClick={() =>
                            handleHeartClick(reply, comment.id)
                          }
                          onReply={() =>
                            setReplyTo(
                              replyTo === reply.id ? null : reply.id,
                            )
                          }
                        />
                      </Box>
                    </Box>
                    {replyTo === reply.id && (
                      <Box className="w-full mt-3">
                        <Input
                          value={replyMessage}
                          onChange={setReplyMessage}
                          onSend={() => handleReplyMessage(comment.id)}
                        />
                      </Box>
                    )}
                  </Box>
                ))}
              </List>
            )}
          </ListItem>
        ))}
      </List>

      <Box className="flex gap-4 mt-2 w-full">
        <Input
          value={newMessage}
          onChange={setNewMessage}
          onSend={handleSendMessage}
        />
      </Box>
    </Box>
  )
}

export default Comments

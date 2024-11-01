import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'
import { formatRelative } from 'date-fns'
import { useEffect, useState } from 'react'
import { IoChatboxEllipsesOutline, IoSendOutline } from 'react-icons/io5'

import { HeartButton, HeartsUp, Input } from '@/components'
import { Comment } from '@/types'

interface CommentsProps {
  defaultComments: Comment[]
}

function Comments(props: CommentsProps) {
  const { defaultComments } = props
  const [comments, setComments] = useState<Comment[]>(defaultComments)
  const [newMessage, setNewMessage] = useState<string>('')
  const [replyMessage, setReplyMessage] = useState<string>('')
  const [replyTo, setReplyTo] = useState<number | null>(null)
  const [heartPops, setHeartPops] = useState<number[]>([])
  const [likedComments, setLikedComments] = useState<Set<string | number>>(
    new Set(),
  )

  const handleHeartClick = (item: Comment, parentId?: number) => {
    const isReply = Boolean(parentId)
    const itemId = isReply ? `${parentId}-${item.id}` : item.id

    setLikedComments((prev) => {
      const updatedLikes = new Set(prev)
      const isLiked = updatedLikes.has(itemId)

      if (isLiked) {
        updatedLikes.delete(itemId)
      } else {
        updatedLikes.add(itemId)
      }

      setComments((prevComments) =>
        prevComments.map((comment) =>
          isReply && parentId && comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === item.id
                    ? {
                        ...reply,
                        hearts_count:
                          reply.hearts_count + (isLiked ? -1 : 1),
                        is_hearted: !isLiked,
                      }
                    : reply,
                ),
              }
            : !isReply && comment.id === item.id
              ? {
                  ...comment,
                  hearts_count: comment.hearts_count + (isLiked ? -1 : 1),
                  is_hearted: !isLiked,
                }
              : comment,
        ),
      )

      return updatedLikes
    })
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          hearts_count: 0,
          is_hearted: false,
          comment: newMessage,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          by: {
            id: 2,
            name: 'Current User',
            email: 'current@user.com',
            nickname: 'currentuser',
            created_at: '2024-01-01T00:00:00.000Z',
            photo: 'https://via.placeholder.com/40',
          },
          replies: [],
        },
      ])
      setNewMessage('')
    }
  }

  const handleReplyMessage = (id: number) => {
    if (replyMessage.trim()) {
      setComments(
        comments.map((comment) =>
          comment.id === id
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: Date.now(),
                    hearts_count: 0,
                    is_hearted: false,
                    comment: replyMessage,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    by: {
                      id: 2,
                      name: 'Current User',
                      email: 'current@user.com',
                      nickname: 'currentuser',
                      created_at: '2024-01-01T00:00:00.000Z',
                      photo: 'https://via.placeholder.com/40',
                    },
                    replies: [],
                  },
                ],
              }
            : comment,
        ),
      )
      setReplyMessage('')
      setReplyTo(null)
    }
  }

  useEffect(() => {
    const initialLikedComments = new Set<string | number>()

    comments.forEach((comment) => {
      if (comment.is_hearted) {
        initialLikedComments.add(comment.id)
      }

      comment.replies.forEach((reply) => {
        if (reply.is_hearted) {
          initialLikedComments.add(`${comment.id}-${reply.id}`)
        }
      })
    })

    setLikedComments(initialLikedComments)
  }, [comments])

  return (
    <Box className="flex flex-col w-full">
      <Box className="fixed inset-0 pointer-events-none z-50">
        {heartPops.map((delay, index) => (
          <HeartsUp
            key={index}
            delay={delay}
            setHeartPops={setHeartPops}
          />
        ))}
      </Box>

      <List className="w-full rounded-lg flex flex-col gap-4">
        {comments.map((comment) => (
          <ListItem
            key={comment.id}
            className="flex-col items-start flex bg-gray-50 dark:bg-zinc-900 rounded-lg p-4 transition-all hover:shadow-xl">
            <Box className="w-full flex sm:flex-row flex-col items-start justify-between">
              <Box className="flex sm:items-center items-start gap-4 sm:flex-row flex-col">
                <Avatar
                  src={comment.by.photo}
                  alt={comment.by.name}
                  className="ring-2 ring-theme-red-900">
                  {Array.from(comment.by.name)[0]}
                </Avatar>
                <ListItemText
                  primary={comment.comment}
                  secondary={`by ${comment.by.nickname}, ${formatRelative(new Date(comment.created_at), new Date())}`}
                  primaryTypographyProps={{
                    className:
                      'dark:text-white text-gray-900 font-semibold break-words',
                    variant: 'body1',
                  }}
                  secondaryTypographyProps={{
                    className:
                      'dark:text-gray-400 text-gray-600 break-words',
                    variant: 'body2',
                  }}
                />
              </Box>

              <Box className="flex items-center">
                <Tooltip title={`Reply to ${comment.by.nickname}`}>
                  <IconButton
                    onClick={() =>
                      setReplyTo(
                        replyTo === comment.id ? null : comment.id,
                      )
                    }
                    className="text-theme-red-900 hover:text-theme-red-700 hover:scale-110 transition-transform duration-300">
                    <IoChatboxEllipsesOutline />
                  </IconButton>
                </Tooltip>

                <Box className="flex items-center gap-2">
                  <HeartButton
                    heartable_id={comment.id}
                    heartable_type="commentables"
                    setHeartPops={setHeartPops}
                    isHearted={
                      likedComments.has(comment.id) || comment.is_hearted
                    }
                    type="icon"
                    setHearts={() => {}}
                    onHeartToggle={() => handleHeartClick(comment)}
                    size={28}
                  />
                  <Typography
                    variant="body2"
                    className="dark:text-white text-gray-800">
                    {comment.hearts_count}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {replyTo === comment.id && (
              <Box className="w-full mt-2">
                <Input
                  isFull
                  value={replyMessage}
                  placeholder="Type your reply..."
                  onChange={(e) => setReplyMessage(e.target.value)}
                  onKeyDown={({ code }) => {
                    if (code === 'Enter' || code === 'NumpadEnter') {
                      handleReplyMessage(comment.id)
                    }
                  }}
                  customClass="min-h-[3.5rem] rounded-lg border border-gray-300 dark:border-gray-700 p-2 focus:ring-2 focus:ring-theme-red-900 transition duration-300 ease-in-out"
                  icon={
                    <IconButton
                      onClick={() => handleReplyMessage(comment.id)}
                      className="text-theme-red-900 hover:text-theme-red-700 hover:scale-110 transition-transform duration-300">
                      <IoSendOutline />
                    </IconButton>
                  }
                />
              </Box>
            )}

            {comment.replies.length > 0 && (
              <List className="w-full mt-1 pl-1 flex flex-col gap-2">
                {comment.replies.map((reply) => (
                  <Box key={reply.id}>
                    <ListItem className="flex sm:flex-row flex-col justify-between sm:items-center items-start gap-2 sm:gap-0">
                      <Box className="flex sm:gap-4 gap-2 sm:items-center items-start">
                        <Avatar
                          src={reply.by.photo}
                          alt={reply.by.name}
                          className="ring-2 ring-gray-600 dark:ring-gray-400">
                          {Array.from(reply.by.name)[0]}
                        </Avatar>
                        <ListItemText
                          primary={reply.comment}
                          secondary={`by ${reply.by.nickname}, ${formatRelative(new Date(reply.created_at), new Date())}`}
                          primaryTypographyProps={{
                            className:
                              'dark:text-gray-400 text-gray-600 break-words',
                            variant: 'body2',
                          }}
                        />
                      </Box>
                      <Box className="flex items-center">
                        <Tooltip title={`Reply to ${reply.by.nickname}`}>
                          <IconButton
                            onClick={() =>
                              setReplyTo(
                                replyTo === reply.id ? null : reply.id,
                              )
                            }
                            className="text-theme-red-900 hover:text-theme-red-700 hover:scale-110 transition-transform duration-300">
                            <IoChatboxEllipsesOutline />
                          </IconButton>
                        </Tooltip>
                        <HeartButton
                          heartable_id={reply.id}
                          heartable_type="commentables"
                          setHeartPops={setHeartPops}
                          isHearted={
                            likedComments.has(
                              `${comment.id}-${reply.id}`,
                            ) || reply.is_hearted
                          }
                          type="icon"
                          setHearts={() => {}}
                          onHeartToggle={() =>
                            handleHeartClick(reply, comment.id)
                          }
                          size={28}
                        />
                        <Typography
                          variant="body2"
                          className="dark:text-white text-gray-800">
                          {reply.hearts_count}
                        </Typography>
                      </Box>
                    </ListItem>

                    {replyTo === reply.id && (
                      <Box className="w-full mt-2">
                        <Input
                          isFull
                          value={replyMessage}
                          placeholder="Type your reply..."
                          onChange={(e) => setReplyMessage(e.target.value)}
                          onKeyDown={({ code }) => {
                            if (
                              code === 'Enter' ||
                              code === 'NumpadEnter'
                            ) {
                              handleReplyMessage(comment.id)
                            }
                          }}
                          customClass="min-h-[3.5rem] rounded-lg border border-gray-300 dark:border-gray-700 p-2 focus:ring-2 focus:ring-theme-red-900 transition duration-300 ease-in-out"
                          icon={
                            <IconButton
                              onClick={() =>
                                handleReplyMessage(comment.id)
                              }
                              className="text-theme-red-900 hover:text-theme-red-700 hover:scale-110 transition-transform duration-300">
                              <IoSendOutline />
                            </IconButton>
                          }
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
          isFull
          value={newMessage}
          placeholder="Type your message..."
          onChange={({ target }) => setNewMessage(target.value)}
          onKeyDown={({ code }) => {
            if (code === 'Enter' || code === 'NumpadEnter') {
              handleSendMessage()
            }
          }}
          customClass="min-h-[3.5rem] rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-theme-red-900 transition-all duration-300 ease-in-out"
          icon={
            <IconButton
              onClick={handleSendMessage}
              className="hover:scale-125 transition-transform duration-300 ease-in-out">
              <IoSendOutline className="text-theme-red-900 dark:text-white" />
            </IconButton>
          }
        />
      </Box>
    </Box>
  )
}

export default Comments

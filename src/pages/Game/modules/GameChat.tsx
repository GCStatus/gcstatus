import { faker } from '@faker-js/faker'
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
import { format } from 'date-fns'
import { useState } from 'react'
import { IoChatboxEllipsesOutline, IoSendOutline } from 'react-icons/io5'

import { Input } from '@/components'
import { GameDetails, Message } from '@/types'

interface GameChatProps {
  game: GameDetails
}

function GameChat(props: GameChatProps) {
  const { game } = props
  const [messages, setMessages] = useState<Message[]>(game.messages)
  const [newMessage, setNewMessage] = useState<string>('')
  const [replyMessage, setReplyMessage] = useState<string>('')
  const [replyTo, setReplyTo] = useState<number | null>(null)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          message: newMessage,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          by: {
            id: 2,
            name: 'Current User',
            email: 'current@user.com',
            nickname: 'currentuser',
            coins: faker.number.int(),
            experience: faker.number.int(),
            level: faker.number.int(),
            birthdate: '1990-01-01',
            created_at: '2024-01-01T00:00:00.000Z',
            updated_at: '2024-01-01T00:00:00.000Z',
            profile: {
              photo: 'https://via.placeholder.com/40',
              share: true,
            },
          },
          replies: [],
        },
      ])
      setNewMessage('')
    }
  }

  const handleReplyMessage = (id: number) => {
    if (replyMessage.trim()) {
      setMessages(
        messages.map((msg) =>
          msg.id === id
            ? {
                ...msg,
                replies: [
                  ...msg.replies,
                  {
                    id: Date.now(),
                    message: replyMessage,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    by: {
                      id: 2,
                      name: 'Current User',
                      email: 'current@user.com',
                      nickname: 'currentuser',
                      birthdate: '1990-01-01',
                      coins: faker.number.int(),
                      experience: faker.number.int(),
                      level: faker.number.int(),
                      created_at: '2024-01-01T00:00:00.000Z',
                      updated_at: '2024-01-01T00:00:00.000Z',
                      profile: {
                        photo: 'https://via.placeholder.com/40',
                        share: true,
                      },
                    },
                    replies: [],
                  },
                ],
              }
            : msg,
        ),
      )
      setReplyMessage('')
      setReplyTo(null)
    }
  }

  const toggleReplyInput = (id: number) => {
    setReplyTo(replyTo === id ? null : id)
    setReplyMessage('')
  }

  return (
    <Box>
      <Typography
        variant="h2"
        className="sm:text-2xl text-xl font-semibold animate-flicker text-theme-red-900 dark:text-white break-words">
        Chat
      </Typography>

      <List
        sx={{
          mt: 2,
          width: '100%',
          bgcolor: 'background.paper',
        }}>
        {messages.map((msg) => (
          <ListItem
            key={msg.id}
            sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Avatar src={msg.by.profile?.photo} alt={msg.by.name}>
                {Array.from(msg.by.name)[0]}
              </Avatar>
              <ListItemText
                primary={msg.message}
                secondary={`by ${msg.by.nickname} at ${format(new Date(msg.created_at), 'LLL, dd yyyy')}`}
                primaryTypographyProps={{
                  className: 'dark:text-white text-gray-800 break-words',
                  variant: 'body1',
                  fontWeight: 'bold',
                }}
                secondaryTypographyProps={{
                  className:
                    'dark:text-gray-400 text-gray-600 break-words',
                  variant: 'body2',
                }}
              />
            </Box>
            <Box width="100%" sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title={`Answer ${msg.by.nickname}`}>
                <IconButton
                  size="large"
                  onClick={() => toggleReplyInput(msg.id)}
                  className="text-theme-red-900">
                  <IoChatboxEllipsesOutline fontSize="small" />
                </IconButton>
              </Tooltip>
              {replyTo === msg.id && (
                <Input
                  isFull
                  value={replyMessage}
                  placeholder="Type your reply..."
                  onChange={(e) => setReplyMessage(e.target.value)}
                  icon={
                    <IconButton onClick={() => handleReplyMessage(msg.id)}>
                      <IoSendOutline className="text-theme-red-900" />
                    </IconButton>
                  }
                />
              )}
            </Box>

            {msg.replies.length > 0 && (
              <List className="w-full sm:pl-4 pl-1">
                {msg.replies.map((reply) => (
                  <ListItem key={reply.id}>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center',
                      }}>
                      <Avatar
                        src={reply.by.profile?.photo}
                        alt={reply.by.name}>
                        {Array.from(reply.by.name)[0]}
                      </Avatar>
                      <ListItemText
                        primary={reply.message}
                        secondary={`by ${reply.by.nickname} - replied to ${msg.by.nickname} at ${format(new Date(reply.created_at), 'LLL, dd yyyy')}`}
                        primaryTypographyProps={{
                          className:
                            'dark:text-gray-400 text-gray-600 break-words',
                          variant: 'body2',
                        }}
                        secondaryTypographyProps={{
                          className: 'break-words',
                        }}
                      />
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Input
          isFull
          value={newMessage}
          placeholder="Type your message..."
          onChange={({ target }) => setNewMessage(target.value)}
          icon={
            <IconButton onClick={handleSendMessage}>
              <IoSendOutline className="text-theme-red-900" />
            </IconButton>
          }
          customClass="min-h-[3.5rem]"
        />
      </Box>
    </Box>
  )
}

export default GameChat

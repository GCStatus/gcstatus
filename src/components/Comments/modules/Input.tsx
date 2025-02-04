import { Box, IconButton } from '@mui/material'

import { Icon, Input } from '@/components'

const CommentInput = ({
  value,
  onChange,
  onSend,
}: {
  value: string
  onChange: (value: string) => void
  onSend: () => void
}) => (
  <Box className="flex gap-4 mt-2 w-full">
    <Input
      isFull
      value={value}
      placeholder="Type your message..."
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={({ code }) =>
        ['Enter', 'NumpadEnter'].includes(code) && onSend()
      }
      customClass="min-h-[3.5rem] rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-theme-red-900 transition-all duration-300 ease-in-out"
      icon={
        <IconButton
          onClick={onSend}
          className="hover:scale-125 transition-transform duration-300 ease-in-out">
          <Icon
            name="IoSendOutline"
            className="text-theme-red-900 dark:text-white"
          />
        </IconButton>
      }
    />
  </Box>
)

export default CommentInput

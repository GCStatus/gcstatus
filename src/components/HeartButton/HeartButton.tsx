import { Button, IconButton } from '@mui/material'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

import { useAccount } from '@/hooks'
import { useHeartItemMutation } from '@/services/api'

export interface HeartButtonProps {
  size?: number
  isHearted: boolean
  heartable_id: number
  type: 'button' | 'icon'
  setHearts: Dispatch<SetStateAction<number>>
  heartable_type: string
  setHeartPops: Dispatch<SetStateAction<number[]>>
  onHeartToggle?: () => void
}

function HeartButton(props: HeartButtonProps) {
  const {
    isHearted,
    type,
    size = 16,
    setHearts,
    setHeartPops,
    heartable_id,
    heartable_type,
    onHeartToggle,
  } = props
  const go = useNavigate()
  const { user, loading } = useAccount()
  const [trigger] = useHeartItemMutation()
  const [hearted, setHearted] = useState<boolean>(isHearted)

  const newHearts = useMemo(
    () => Array.from({ length: 10 }, (_, i) => i * 10),
    [],
  )

  useEffect(() => {
    setHearted(isHearted)
  }, [isHearted])

  const handleHeartClick = useCallback(() => {
    if (loading) return

    if (!user) {
      go('/login')
      return
    }

    setHearted((prev) => !prev)
    setHearts((prev) => prev + (hearted ? -1 : 1))

    if (!hearted) {
      setHeartPops((prev) => [...prev, ...newHearts])
    }

    trigger({
      heartable_id,
      heartable_type,
    })

    onHeartToggle?.()
  }, [hearted, newHearts, user, loading])

  return type === 'icon' ? (
    <IconButton
      aria-label="heart"
      color="primary"
      size="small"
      onClick={handleHeartClick}
      data-qa="heart">
      <IoHeartOutline
        size={size}
        className={
          hearted
            ? 'text-theme-red-900 animate-pulse'
            : 'dark:text-white text-black'
        }
      />
    </IconButton>
  ) : (
    <Button
      variant="outlined"
      className={`mt-8 border-2 px-5 py-2 text-lg font-bold transition-all shadow-lg sm:w-auto w-full ${
        hearted
          ? 'border-red-500 bg-red-500 text-white'
          : 'border-theme-red-900 text-theme-red-900'
      }`}
      startIcon={hearted ? <IoHeart /> : <IoHeartOutline />}
      onClick={handleHeartClick}>
      Love it!
    </Button>
  )
}

export default HeartButton

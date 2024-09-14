import { Box } from '@mui/material'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { IoHeart } from 'react-icons/io5'

export interface HeartsUpProps {
  delay: number
  setHeartPops: Dispatch<SetStateAction<number[]>>
}

function HeartsUp(props: HeartsUpProps) {
  const { delay, setHeartPops } = props

  const randomLeftPosition = Math.random() * 100

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartPops((prev) => prev.filter((_, index) => index < 10))
    }, 10000)

    return () => clearInterval(interval)
  }, [setHeartPops])

  return (
    <Box
      className="absolute animate-heart-float"
      style={{
        bottom: '0',
        animationDelay: `${delay}ms`,
        left: `${randomLeftPosition}%`,
      }}>
      <IoHeart
        role="img"
        className="text-red-500 w-6 h-6 animate-heart-scale"
      />
    </Box>
  )
}

const styles = `
  @keyframes heart-float {
    0% {
      transform: translateY(0) scale(0.5);
      opacity: 1;
    }
    50% {
      transform: translateY(-50vh) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(-50vh) scale(1);
      opacity: 0;
    }
  }

  .animate-heart-float {
    animation: heart-float 2s ease-in-out forwards;
  }

  @keyframes heart-scale {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    50% {
      transform: scale(2);
      opacity: 1;
    }
    100% {
      transform: scale(3);
      opacity: 0;
    }
  }

  .animate-heart-scale {
    animation: heart-scale 1s ease-in-out forwards;
  }
`

document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`)

export default HeartsUp

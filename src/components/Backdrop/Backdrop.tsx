import { Backdrop, BackdropProps } from '@mui/material'
import { useEffect } from 'react'

export interface CustomBackdropProps extends BackdropProps {
  open: boolean
  toggleBackdrop: () => void
}

function CustomBackdrop(props: CustomBackdropProps) {
  const { open, toggleBackdrop, ...rest } = props

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <Backdrop
      open={open}
      onClick={toggleBackdrop}
      className="z-40"
      {...rest}
    />
  )
}

export default CustomBackdrop

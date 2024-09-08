import { Box } from '@mui/material'

interface AuthBgProps {
  cover: string
}

function AuthBg(props: AuthBgProps) {
  const { cover } = props

  return (
    <Box>
      <Box
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${cover})`,
          backgroundAttachment: 'fixed',
        }}
      />

      <Box className="absolute top-0 left-0 w-full h-[5rem] bg-gradient-to-b from-transparent to-black/40 flicker-top" />

      <Box className="absolute bottom-0 left-0 w-full h-[5rem] bg-gradient-to-t from-transparent to-black/40 flicker-bottom" />

      <Box className="absolute inset-0 w-full h-full bg-black bg-opacity-60 z-10" />
    </Box>
  )
}

export default AuthBg

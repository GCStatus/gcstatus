import { Box } from '@mui/material'

export interface AuthBgProps {
  cover: string
}

function AuthBg(props: AuthBgProps) {
  const { cover } = props

  return (
    <Box role="presentation">
      <Box
        data-qa="background-image"
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${cover})`,
          backgroundAttachment: 'fixed',
        }}
      />

      <Box
        data-qa="top-gradient"
        className="absolute top-0 left-0 w-full h-[5rem] bg-gradient-to-b from-transparent to-black/40 flicker-top"
      />

      <Box
        data-qa="bottom-gradient"
        className="absolute bottom-0 left-0 w-full h-[5rem] bg-gradient-to-t from-transparent to-black/40 flicker-bottom"
      />

      <Box
        data-qa="black-overlay"
        className="absolute inset-0 w-full h-full bg-black bg-opacity-60 z-10"
      />
    </Box>
  )
}

export default AuthBg

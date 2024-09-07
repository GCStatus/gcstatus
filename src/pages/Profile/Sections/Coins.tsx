import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'

import { Button } from '@/components'

function Coins() {
  return (
    <Stack className="relative md:p-6 p-2 rounded-lg animate-fade-in min-h-screen">
      <Typography
        variant="h2"
        className="text-3xl font-extrabold mb-8 text-theme-red-900">
        Coins
      </Typography>

      <Stack spacing={4} alignItems="center" className="relative mb-12">
        <Box className="relative w-36 h-36 bg-theme-red-900 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
          <Typography className="text-white text-3xl font-bold">
            298,018
          </Typography>
          <Box className="absolute inset-0 rounded-full border-4 border-yellow-400 blur-md opacity-20" />
        </Box>
        <Box className="w-full sm:max-w-sm border border-theme-red-900 dark:text-white text-black px-4 py-1 rounded-lg shadow-lg flex justify-center items-center text-center">
          You have 298,018 coins!
        </Box>
      </Stack>

      <Stack spacing={6}>
        <Card className="relative bg-transparent p-4 rounded-xl border border-theme-red-900 shadow-lg duration-500 hover:shadow-2xl hover:border-red-700 transition-transform hover:-translate-y-2">
          <CardContent className="text-white text-center group flex flex-col items-center">
            <AiOutlineMinusCircle className="text-theme-red-900 text-5xl mb-4 group-hover:animate-spin" />
            <Typography className="text-xl font-bold mb-4 dark:text-white text-black">
              Spend Coins
            </Typography>
            <Typography className="text-gray-400 mb-6">
              Use your coins to unlock special features, upgrades, and
              more.
            </Typography>
            <Button
              fullWidth
              className="bg-theme-red-900 text-white px-6 py-2 rounded-full shadow-lg">
              Spend Now
            </Button>
          </CardContent>
        </Card>

        <Card className="relative bg-transparent p-4 rounded-xl border border-theme-red-900 shadow-lg duration-500 hover:shadow-2xl hover:border-red-700 transition-transform hover:-translate-y-2">
          <CardContent className="text-white text-center group flex flex-col items-center">
            <AiOutlinePlusCircle className="text-theme-red-900 text-5xl mb-4 group-hover:animate-spin" />
            <Typography className="text-xl font-bold mb-4 dark:text-white text-black">
              Buy Coins
            </Typography>
            <Typography className="text-gray-400 mb-6">
              Purchase more coins to keep the game going and access
              exclusive content.
            </Typography>
            <Button
              fullWidth
              className="bg-theme-red-900 text-white px-6 py-2 rounded-full shadow-lg">
              Buy Now
            </Button>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  )
}

export default Coins

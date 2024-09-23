import { Box, CircularProgress, Stack, Typography } from '@mui/material'

import { LevelCard } from '@/components'
import { useGetLevelsQuery } from '@/services/api'
import { User } from '@/types'

interface LevelsProps {
  user: User
}

function Levels(props: LevelsProps) {
  const { user } = props
  const { levels, isLoading, isFetching } = useGetLevelsQuery(undefined, {
    selectFromResult: ({ data = [], isLoading, isFetching }) => ({
      levels: data,
      isLoading,
      isFetching,
    }),
  })

  const currentLevel = levels.find(({ level }) => level === user.level)
  const nextLevel = levels.find(({ level }) => level === user.level + 1)

  const hasMaxLevel = !nextLevel

  return (
    <Stack className="md:p-6 p-2 rounded-lg animate-fade-in dark:bg-theme-dark-900 bg-transparent min-h-screen">
      <Typography
        variant="h2"
        className="text-3xl font-extrabold mb-8 text-theme-red-900">
        Levels
      </Typography>

      {isLoading || isFetching ? (
        <Box className="flex justify-center items-center mt-[30vh]">
          <CircularProgress color="error" />
        </Box>
      ) : (
        <Stack spacing={4} className="w-full">
          {levels.length === 0 ? (
            <Typography variant="h6" className="text-gray-500 text-center">
              No levels found.
            </Typography>
          ) : (
            <>
              {currentLevel && (
                <LevelCard
                  user={user}
                  level={currentLevel}
                  label="Current Level"
                />
              )}

              {hasMaxLevel ? (
                <Box className="flex flex-col items-center mt-8 p-6 rounded-lg bg-gradient-to-r dark:from-zinc-900 dark:via-transparent dark:to-zinc-800 from-zinc-200 via-zinc-100 to-zinc-300 shadow-lg dark:text-white text-black break-words">
                  <Typography
                    variant="h3"
                    className="font-extrabold mb-4 text-center md:text-4xl sm:text-3xl text-2xl break-all">
                    🎉 Congratulations! 🎉
                  </Typography>
                  <Typography
                    variant="h5"
                    className="font-semibold mb-2 text-center">
                    You've reached the pinnacle,{' '}
                    <span className="text-theme-red-900">
                      {user.nickname}
                    </span>
                    !
                  </Typography>
                  <Typography className="text-lg text-center mb-4">
                    You’ve unlocked every level, earned every coin, and
                    gathered all the experience. There's no grind left—just
                    glory!
                  </Typography>
                  <Typography className="text-md italic text-center">
                    Stay tuned for future updates, rewards, and new
                    challenges. For now, enjoy your legendary status!
                  </Typography>
                </Box>
              ) : (
                nextLevel && (
                  <LevelCard
                    user={user}
                    level={nextLevel}
                    label="Next Level"
                  />
                )
              )}
            </>
          )}
        </Stack>
      )}
    </Stack>
  )
}

export default Levels

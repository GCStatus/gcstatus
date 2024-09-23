import { Box, Pagination, Stack, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'

import { TitleCard } from '@/components'
import { MOCK_TITLES } from '@/mocks'
import { Title, User } from '@/types'

interface TitlesProps {
  user: User
}

function Titles(props: TitlesProps) {
  const { user } = props
  const [titles] = useState<Title[]>(MOCK_TITLES)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const titlesPerPage = 3

  const handleChangePage = (_: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const displayedTitles = titles.slice(
    (currentPage - 1) * titlesPerPage,
    currentPage * titlesPerPage,
  )

  return (
    <Stack className="md:p-6 p-2 rounded-lg animate-fade-in dark:bg-theme-dark-900 bg-transparent min-h-screen">
      <Typography
        variant="h2"
        className="text-3xl font-extrabold mb-8 text-theme-red-900">
        Titles
      </Typography>

      <Stack spacing={4} className="w-full">
        {displayedTitles.map((title) => (
          <TitleCard key={title.id} title={title} user={user} />
        ))}
      </Stack>

      <Box className="flex md:justify-end justify-center mt-8">
        <Pagination
          count={Math.ceil(titles.length / titlesPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#ff4d4d',
              '&:hover': {
                color: '#fff',
                bgcolor: '#ff4d4d',
              },
            },
            '& .Mui-selected': {
              color: '#fff',
              bgcolor: '#ff4d4d !important',
            },
          }}
        />
      </Box>
    </Stack>
  )
}

export default Titles

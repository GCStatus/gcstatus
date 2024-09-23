import { Box, Pagination, Stack, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'

import { MissionCard } from '@/components'
import { MOCK_MISSIONS } from '@/mocks'
import { Mission } from '@/types'

function Missions() {
  const [missions] = useState<Mission[]>(MOCK_MISSIONS)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const missionsPerPage = 3

  const handleChangePage = (_: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const displayedMissions = missions.slice(
    (currentPage - 1) * missionsPerPage,
    currentPage * missionsPerPage,
  )

  return (
    <Stack className="md:p-6 p-2 rounded-lg animate-fade-in dark:bg-theme-dark-900 bg-transparent min-h-screen">
      <Typography
        variant="h2"
        className="text-3xl font-extrabold mb-8 text-theme-red-900">
        Missions
      </Typography>

      <Stack spacing={4} className="w-full">
        {displayedMissions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </Stack>

      <Box className="flex md:justify-end justify-center mt-8">
        <Pagination
          count={Math.ceil(missions.length / missionsPerPage)}
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

export default Missions

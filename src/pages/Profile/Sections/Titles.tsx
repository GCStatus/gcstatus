import {
  Box,
  LinearProgress,
  Pagination,
  Stack,
  Typography,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'

import { Tabs, TitleCard } from '@/components'
import { useGetTitlesQuery } from '@/services/api'
import { User } from '@/types'
import { calculateOverallProgress as c } from '@/utils'

interface TitlesProps {
  user: User
}

function Titles(props: TitlesProps) {
  const { user } = props
  const { titles, isLoading } = useGetTitlesQuery(undefined, {
    selectFromResult: ({ data = [], isLoading, isFetching }) => ({
      titles: data,
      isLoading: isLoading || isFetching,
    }),
  })
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [activeTab, setActiveTab] = useState<string>('All')
  const titlesPerPage = 3

  const handleChangePage = (_: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const ownedTitles = titles.filter(
    ({ requirements }) => c(requirements) === 100,
  )
  const availableTitles = titles.filter(
    ({ requirements }) => c(requirements) < 100,
  )
  const purchasableTitles = titles.filter(({ purchasable }) => purchasable)

  const getTitlesByTab = () => {
    switch (activeTab) {
      case 'Availables':
        return availableTitles
      case 'Owned':
        return ownedTitles
      case 'To buy':
        return purchasableTitles
      default:
        return titles
    }
  }

  const titlesForActiveTab = getTitlesByTab()
    .slice()
    .sort((a) => (c(a.requirements) === 100 ? 1 : -1))

  const displayedTitles = titlesForActiveTab.slice(
    (currentPage - 1) * titlesPerPage,
    currentPage * titlesPerPage,
  )

  const element = displayedTitles.map((title) => (
    <TitleCard key={title.id} title={title} user={user} />
  ))

  const totalPageCount = Math.ceil(
    titlesForActiveTab.length / titlesPerPage,
  )

  return (
    <Stack className="md:p-6 p-2 rounded-lg animate-fade-in dark:bg-theme-dark-900 bg-transparent min-h-screen">
      <Typography
        variant="h2"
        className="text-3xl font-extrabold mb-8 text-theme-red-900">
        Titles
      </Typography>

      {isLoading ? (
        <LinearProgress color="error" />
      ) : (
        <Tabs
          tabs={[
            {
              tab: 'All',
              element,
            },
            {
              tab: 'Availables',
              element,
            },
            {
              tab: 'Owned',
              element,
            },
            {
              tab: 'To buy',
              element,
            },
          ]}
          setAssistantTab={setActiveTab}
          spacing={2.5}
        />
      )}

      <Box className="flex md:justify-end justify-center mt-8">
        <Pagination
          count={totalPageCount}
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

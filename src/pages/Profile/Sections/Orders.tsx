import { Box, Pagination, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import { useState } from 'react'
import { CiClock2 } from 'react-icons/ci'
import { IoCheckmarkOutline, IoCloseOutline } from 'react-icons/io5'

import { Button, Select } from '@/components'
import { MOCK_ORDERS } from '@/mocks'

const PAGE_SIZE_OPTIONS = [5, 10, 15, 20, 30, 50, 100]

function Orders() {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [status, setStatus] = useState<
    'pending' | 'completed' | 'canceled' | 'all'
  >('all')

  const filteredOrders = MOCK_ORDERS.filter(({ status: oStatus }) => {
    if (status === 'all') return true
    if (status === 'pending') return oStatus === 'Pending'
    if (status === 'canceled') return oStatus === 'Canceled'
    return oStatus === 'Completed'
  })

  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

  const renderIcon: { [key: string]: React.ReactNode } = {
    Pending: (
      <CiClock2 className="dark:text-yellow-500 text-white text-2xl" />
    ),
    Canceled: (
      <IoCloseOutline className="dark:text-red-500 text-white text-2xl" />
    ),
    Completed: (
      <IoCheckmarkOutline className="dark:text-green-500 text-white text-2xl" />
    ),
  }

  return (
    <Stack className="md:p-6 p-2 rounded-lg animate-fade-in min-h-screen">
      <Stack
        spacing={1.5}
        direction={{ md: 'row', xs: 'column' }}
        className="mb-6">
        <Select
          isFull
          label="Items per page"
          defaultValue={pageSize}
          onChange={({ target }) => setPageSize(parseInt(target.value))}
          options={PAGE_SIZE_OPTIONS.map((value) => ({
            value,
            label: value.toString(),
          }))}
        />
        <Select
          isFull
          label="Status"
          defaultValue={status}
          onChange={({ target }) =>
            setStatus(
              target.value as 'pending' | 'completed' | 'canceled' | 'all',
            )
          }
          options={[
            { label: 'All', value: 'all' },
            { label: 'Pending', value: 'pending' },
            { label: 'Canceled', value: 'canceled' },
            { label: 'Completed', value: 'completed' },
          ]}
        />
      </Stack>

      <Typography
        variant="h2"
        className="text-3xl font-bold text-theme-red-900 mb-4">
        Orders
      </Typography>
      <Typography className="text-white text-lg mb-6">
        Total: {filteredOrders.length}
      </Typography>

      <Stack spacing={3} className="flex flex-col">
        {paginatedOrders.map((order) => (
          <Box
            key={order.id}
            className="relative group bg-transparent p-6 rounded-xl border border-theme-red-900 shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-theme-red-900 transform hover:-translate-y-2">
            <Box
              component="span"
              className="absolute top-4 right-4 dark:bg-theme-dark-900 bg-theme-red-900 p-2 rounded-full group-hover:rotate-12 transition-transform duration-500">
              {renderIcon[order.status]}
            </Box>

            <Box className="absolute inset-0 rounded-xl border-2 border-theme-red-900 opacity-25 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none" />

            <Box className="text-white">
              <Typography
                variant="h3"
                className="md:text-2xl text-xl font-semibold mb-2 text-theme-red-900 break-words">
                Order #{order.number}
              </Typography>
              <Typography className="text-sm mb-1 dark:text-gray-400 text-gray-500">
                Created at:{' '}
                {format(new Date(order.created_at), 'LLL, dd yyyy')}
              </Typography>
              <Typography className="text-sm mb-1 dark:text-gray-400 text-gray-500">
                Last updated at:{' '}
                {format(new Date(order.updated_at), 'LLL, dd yyyy')}
              </Typography>
              <Typography className="text-lg font-bold mb-4 dark:text-white text-black">
                Total: ${order.total.toFixed(2)}
              </Typography>

              <Box className="flex lg:justify-between justify-center lg:flex-row flex-col lg:gap-0 gap-4 mt-4">
                <Button className="bg-theme-red-900 text-white transform hover:scale-105 hover:bg-red-600 transition-all duration-300 shadow-lg">
                  View Details
                </Button>
                <Button className="bg-gray-700 text-white transform hover:scale-[1.02] hover:bg-transparent hover:border hover:border-zinc-600 transition-all duration-300 shadow-lg">
                  Cancel Order
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Stack>

      <Box className="flex md:justify-end justify-center items-center mt-8">
        <Pagination
          count={Math.ceil(filteredOrders.length / pageSize)}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          siblingCount={1}
          boundaryCount={1}
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
              bgcolor: '#ff4d4d',
            },
          }}
        />
      </Box>
    </Stack>
  )
}

export default Orders

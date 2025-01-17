import {
  Box,
  LinearProgress,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import { useState } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa'

import { Select } from '@/components'
import { useGetTransactionsQuery } from '@/services/api'
import { shortenString as s } from '@/utils'

const PAGE_SIZE_OPTIONS = [5, 10, 15, 20, 30, 50, 100]

function Transactions() {
  const { transactions, isLoading } = useGetTransactionsQuery(undefined, {
    selectFromResult: ({ data = [], isLoading, isFetching }) => ({
      transactions: data,
      isLoading: isLoading || isFetching,
    }),
  })
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [type, setType] = useState<'add' | 'sub' | 'all'>('all')

  const filteredTransactions = transactions.filter(({ type: tType }) => {
    if (type === 'all') return true
    if (type === 'add') return tType.type === 'addition'
    return tType.type === 'subtraction'
  })

  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    endIndex,
  )

  return (
    <Stack className="md:p-6 p-2 rounded-lg animate-fade-in">
      {isLoading ? (
        <LinearProgress color="error" />
      ) : (
        <>
          {transactions.length > 0 && (
            <Stack spacing={1.5} direction={{ md: 'row', xs: 'column' }}>
              <Select
                isFull
                label="Items per page"
                defaultValue={pageSize}
                onChange={({ target }) =>
                  setPageSize(parseInt(target.value))
                }
                options={PAGE_SIZE_OPTIONS.map((value) => ({
                  value,
                  label: value.toString(),
                }))}
              />
              <Select
                isFull
                label="Type"
                defaultValue={type}
                onChange={({ target }) =>
                  setType(target.value as 'add' | 'sub' | 'all')
                }
                options={[
                  {
                    label: 'All',
                    value: 'all',
                  },
                  {
                    label: 'Additions',
                    value: 'add',
                  },
                  {
                    label: 'Subtractions',
                    value: 'sub',
                  },
                ]}
              />
            </Stack>
          )}

          <Typography
            variant="h2"
            className="text-2xl font-bold mb-2 mt-8 text-theme-red-900">
            Transactions
          </Typography>
          {transactions.length > 0 ? (
            <>
              <Box className="overflow-x-auto">
                <Table className="w-full table-auto bg-transparent text-white">
                  <TableHead>
                    <TableRow>
                      <TableCell className="border-b border-gray-700 px-4 py-2">
                        Date
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border-b border-gray-700 px-4 py-2">
                        Amount
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border-b border-gray-700 px-4 py-2">
                        Description
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border-b border-gray-700 px-4 py-2">
                        Type
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedTransactions.map((transaction) => (
                      <TableRow
                        key={transaction.id}
                        className="hover:opacity-40 transition duration-500 animate-fade-in">
                        <TableCell className="border-b border-gray-700 px-4 py-2">
                          {format(
                            new Date(transaction.created_at),
                            'LLL, dd yyyy',
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="border-b border-gray-700 px-4 py-2">
                          {transaction.amount}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="table-cell border-b border-gray-700 px-4 py-2">
                          <Box className="inline-block mr-2">
                            {s(transaction.description, 20)}
                          </Box>
                          <Tooltip title={transaction.description}>
                            <Box className="cursor-pointer inline-block -mb-1">
                              <FaRegQuestionCircle size={18} />
                            </Box>
                          </Tooltip>
                        </TableCell>
                        <TableCell
                          align="center"
                          className="border-b border-gray-700 px-4 py-2">
                          {transaction.type.type}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>

              <Box className="flex md:justify-end justify-center items-center mt-8">
                <Pagination
                  count={Math.ceil(filteredTransactions.length / pageSize)}
                  page={page}
                  onChange={(_, page) => setPage(page)}
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
            </>
          ) : (
            <Typography variant="h6" className="font-bold mt-2">
              No one transaction found.
            </Typography>
          )}
        </>
      )}
    </Stack>
  )
}

export default Transactions

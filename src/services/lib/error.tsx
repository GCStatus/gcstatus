import { Box } from '@mui/material'
import {
  isRejectedWithValue,
  Middleware,
  SerializedError,
} from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { toast } from 'react-hot-toast'
import { IoClose } from 'react-icons/io5'

const getError = (
  error: FetchBaseQueryError | SerializedError,
  defaultMessage = 'Aconteceu um erro desconhecido',
) => {
  if ('status' in error && 'data' in error) {
    const { message, errors } = error.data as {
      message?: string
      errors?: { [key: string]: string[] }
    }

    if (errors) {
      const list = Object.values(errors)
        .flat()
        .map((err) => <li key={err}>{err}</li>)
      return <ul>{list}</ul>
    } else if (message) return message
    else return defaultMessage
  } else return defaultMessage
}

export const rtkQueryErrorLogger: Middleware =
  () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const errorMessage = getError(
        action.payload as FetchBaseQueryError | SerializedError,
      )

      if (errorMessage) {
        toast.error(
          (t) => (
            <Box className="w-full pointer-events-auto flex items-center gap-2">
              <Box className="text-sm font-medium text-gray-900">
                {errorMessage}
              </Box>
              <Box className="flex border-l border-gray-300">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full pl-1 flex items-center justify-center text-sm font-medium text-orange-600 hover:text-orange-400 transition-all">
                  <IoClose />
                </button>
              </Box>
            </Box>
          ),
          {
            duration: 6000,
          },
        )
      }
    }

    return next(action)
  }

export const shouldRefresh = (error: FetchBaseQueryError) => {
  const isError = (code: number) => code === 401
  if (typeof error.status === 'number' && isError(error.status))
    return true
  if (error.status === 'PARSING_ERROR')
    return isError(error.originalStatus)
  return false
}

import { createSlice } from '@reduxjs/toolkit'
import { endOfDay, isAfter } from 'date-fns'

import { LEVELS_EXPIRATION_KEY, LEVELS_KEY } from '@/constants'
import api from '@/services/api'
import { Level } from '@/types'

import { RootState } from '.'

const isExpired = () => {
  const expiration = localStorage.getItem(LEVELS_EXPIRATION_KEY)
  if (!expiration) return true

  const expirationDate = new Date(expiration)
  const now = new Date()

  return isAfter(now, expirationDate)
}

const getLevels = () => {
  if (isExpired()) {
    localStorage.removeItem(LEVELS_KEY)
    localStorage.removeItem(LEVELS_EXPIRATION_KEY)

    return []
  }

  const str = localStorage.getItem(LEVELS_KEY)

  return str ? (JSON.parse(str) as Level[]) : []
}

const initialState: {
  levels: Level[]
  loading: boolean
  error: boolean
} = {
  levels: getLevels(),
  loading: false,
  error: false,
}

const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    clearLevels(state) {
      localStorage.removeItem(LEVELS_KEY)
      state.levels = []
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getLevels.matchPending, (state) => {
      state.loading = true
      state.error = false
    })
    builder.addMatcher(
      api.endpoints.getLevels.matchFulfilled,
      (state, { payload }) => {
        state.levels = payload

        localStorage.setItem(LEVELS_KEY, JSON.stringify(payload))
        localStorage.setItem(
          LEVELS_EXPIRATION_KEY,
          endOfDay(new Date()).toString(),
        )

        state.loading = false
        state.error = false
      },
    )
    builder.addMatcher(api.endpoints.getLevels.matchRejected, (state) => {
      state.loading = false
      state.error = true
    })
  },
})

export const { clearLevels } = levelSlice.actions

export const levelSelector = (state: RootState) => state.level

export default levelSlice.reducer

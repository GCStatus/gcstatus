import { createSlice } from '@reduxjs/toolkit'

import { USER_KEY } from '@/constants'
import auth from '@/services/api'
import { User } from '@/types'

import { RootState } from '.'

const getUser = () => {
  const str = localStorage.getItem(USER_KEY)
  if (!str) return null
  return JSON.parse(str) as User
}

const initialState: {
  user: User | null
  loading: boolean
} = {
  user: getUser(),
  loading: false,
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem(USER_KEY)
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(auth.endpoints.login.matchPending, (state) => {
      state.loading = true
    })
    builder.addMatcher(auth.endpoints.login.matchFulfilled, (state) => {
      state.loading = false
    })
    builder.addMatcher(auth.endpoints.login.matchRejected, (state) => {
      state.loading = false
    })
    builder.addMatcher(auth.endpoints.getUser.matchPending, (state) => {
      state.loading = true
    })
    builder.addMatcher(
      auth.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload
        localStorage.setItem(USER_KEY, JSON.stringify(payload))
        state.loading = false
      },
    )
    builder.addMatcher(auth.endpoints.getUser.matchRejected, (state) => {
      state.loading = false
    })
    builder.addMatcher(auth.endpoints.logout.matchPending, (state) => {
      state.loading = true
    })
    builder.addMatcher(auth.endpoints.logout.matchFulfilled, (state) => {
      state.loading = false
      localStorage.removeItem(USER_KEY)
      state.user = null
    })
    builder.addMatcher(auth.endpoints.logout.matchRejected, (state) => {
      state.loading = false
    })
  },
})

export const { logout } = accountSlice.actions

export const accountSelector = (state: RootState) => state.account

export default accountSlice.reducer

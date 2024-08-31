import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

// Services
import api from '@/services/api'
import { rtkQueryErrorLogger } from '@/services/lib/error'

import account from './accountSlice'
import sidebar from './sidebarSlice'
// Slices
import theme from './themeSlice'

const store = configureStore({
  reducer: {
    theme,
    sidebar,
    account,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)

export default store

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

// Services
import api from '@/services/api'
import { rtkQueryErrorLogger } from '@/services/lib/error'
import { newsApi } from '@/services/news'

// Slices
import account from './accountSlice'
import article from './articleSlice'
import sidebar from './sidebarSlice'
import theme from './themeSlice'

const store = configureStore({
  reducer: {
    theme,
    sidebar,
    account,
    article,
    [api.reducerPath]: api.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(newsApi.middleware)
      .concat(api.middleware, rtkQueryErrorLogger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)

export default store

import { createSlice } from '@reduxjs/toolkit'
import { endOfDay, isAfter } from 'date-fns'

import { ARTICLES_EXPIRATION_KEY, ARTICLES_KEY } from '@/constants'
import { newsApi } from '@/services/news'

import { RootState } from '.'

interface Article {
  id: number
  body: string
  lede: string
  deck: string
  title: string
  authors: string
  update_date: string
  publish_date: string
  site_detail_url: string
  image: {
    original: string
  }
}

const isExpired = () => {
  const expiration = localStorage.getItem(ARTICLES_EXPIRATION_KEY)
  if (!expiration) return true

  const expirationDate = new Date(expiration)
  const now = new Date()

  return isAfter(now, expirationDate)
}

const getArticles = () => {
  if (isExpired()) {
    localStorage.removeItem(ARTICLES_KEY)
    localStorage.removeItem(ARTICLES_EXPIRATION_KEY)

    return []
  }

  const str = localStorage.getItem(ARTICLES_KEY)

  return str ? (JSON.parse(str) as Article[]) : []
}

const initialState: {
  articles: Article[]
  loading: boolean
  error: boolean
} = {
  articles: getArticles(),
  loading: false,
  error: false,
}

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    clearArticles(state) {
      localStorage.removeItem(ARTICLES_KEY)
      state.articles = []
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      newsApi.endpoints.getGamingNews.matchPending,
      (state) => {
        state.loading = true
        state.error = false
      },
    )
    builder.addMatcher(
      newsApi.endpoints.getGamingNews.matchFulfilled,
      (state, { payload }) => {
        state.articles = payload

        localStorage.setItem(ARTICLES_KEY, JSON.stringify(payload))
        localStorage.setItem(
          ARTICLES_EXPIRATION_KEY,
          endOfDay(new Date()).toString(),
        )

        state.loading = false
        state.error = false
      },
    )
    builder.addMatcher(
      newsApi.endpoints.getGamingNews.matchRejected,
      (state) => {
        state.loading = false
        state.error = true
      },
    )
  },
})

export const { clearArticles } = articleSlice.actions

export const articleSelector = (state: RootState) => state.article

export default articleSlice.reducer

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { NEWS_API_KEY, prodEnv } from '@/constants'

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

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: prodEnv
      ? 'https://www.gamespot.com/api/'
      : 'https://cors-anywhere.herokuapp.com/https://www.gamespot.com/api/',
  }),
  endpoints: (builder) => ({
    getGamingNews: builder.query<Article[], void>({
      query: () =>
        `articles/?api_key=${NEWS_API_KEY}&format=json&sort=publish_date:desc&filter=association:news`,
      transformResponse: (res: { results: Article[] }) => res.results,
    }),
  }),
})

export const { useGetGamingNewsQuery } = newsApi

import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

import { baseUrl } from '@/constants'
import { logout } from '@/store/accountSlice'
import { LoginCredentials, Res, ResetPasswordPayload, User } from '@/types'

import { shouldRefresh } from './lib/error'

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Alias', 'sso')

    return headers
  },
})

export const baseQueryFn: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)
  if (result.error && shouldRefresh(result.error)) {
    api.dispatch(logout())
  }
  return result
}

export const tagTypes = ['user'] as const

const api = createApi({
  baseQuery: baseQueryFn,
  tagTypes,
  endpoints: (builder) => ({
    login: builder.mutation<
      { message: string; user: User },
      LoginCredentials
    >({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: tagTypes,
    }),

    forgot: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: 'auth/password/send',
        method: 'POST',
        body,
      }),
    }),

    resetPass: builder.mutation<{ message: string }, ResetPasswordPayload>(
      {
        query: (body) => ({
          url: 'auth/password/reset',
          method: 'POST',
          body,
        }),
      },
    ),

    getUser: builder.query<User, void>({
      query: () => 'me',
      transformResponse: (res: Res<User>) => res.data,
      providesTags: ['user'],
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      invalidatesTags: tagTypes,
    }),
  }),
})

export const {
  useGetUserQuery,
  useLoginMutation,
  useForgotMutation,
  useLogoutMutation,
  useLazyGetUserQuery,
  useResetPassMutation,
} = api

export default api

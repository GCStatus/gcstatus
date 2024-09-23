import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

import { baseUrl } from '@/constants'
import { logout } from '@/store/accountSlice'
import {
  Level,
  LoginCredentials,
  RegisterCredentials,
  Res,
  ResetPasswordPayload,
  User,
} from '@/types'

import { shouldRefresh } from './lib/error'

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
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

export const tagTypes = ['user', 'levels'] as const

const api = createApi({
  baseQuery: baseQueryFn,
  tagTypes,
  endpoints: (builder) => ({
    login: builder.mutation<{ message: string }, LoginCredentials>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: tagTypes,
    }),

    register: builder.mutation<{ message: string }, RegisterCredentials>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),

    forgot: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: 'auth/password/email/send',
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

    getLevels: builder.query<Level[], void>({
      query: () => 'levels',
      transformResponse: (res: Res<Level[]>) => res.data,
      providesTags: ['levels'],
    }),
  }),
})

export const {
  useGetUserQuery,
  useLoginMutation,
  useForgotMutation,
  useLogoutMutation,
  useGetLevelsQuery,
  useLazyGetUserQuery,
  useRegisterMutation,
  useResetPassMutation,
  useLazyGetLevelsQuery,
} = api

export default api

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
  Profile,
  RegisterCredentials,
  Res,
  ResetPasswordPayload,
  Title,
  Transaction,
  UpdatePasswordInterface,
  UpdateUserBasicsInterface,
  UpdateUserNickAndEmailInterface,
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

export const tagTypes = [
  'user',
  'levels',
  'titles',
  'transactions',
] as const

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
      invalidatesTags: (_, error) => (!error ? tagTypes : []),
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
        invalidatesTags: (_, error) => (!error ? ['user'] : []),
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
      invalidatesTags: (_, error) => (!error ? tagTypes : []),
    }),

    getLevels: builder.query<Level[], void>({
      query: () => 'levels',
      transformResponse: (res: Res<Level[]>) => res.data,
      providesTags: ['levels'],
    }),

    updatePassword: builder.mutation<
      { message: string },
      UpdatePasswordInterface
    >({
      query: (body) => ({
        url: 'profile/password',
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, error) => (!error ? ['user'] : []),
    }),

    updatePicture: builder.mutation<{ message: string }, FormData>({
      query: (body) => ({
        url: 'profile/picture',
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, error) => (!error ? ['user'] : []),
    }),

    updateSocials: builder.mutation<{ message: string }, Profile>({
      query: (body) => ({
        url: 'profile/socials',
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, error) => (!error ? ['user'] : []),
    }),

    updateNickAndEmail: builder.mutation<
      { message: string },
      UpdateUserNickAndEmailInterface
    >({
      query: (body) => ({
        url: 'user/update/sensitive',
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, error) => (!error ? ['user'] : []),
    }),

    updateUserBasics: builder.mutation<
      { message: string },
      UpdateUserBasicsInterface
    >({
      query: (body) => ({
        url: 'user/update/basics',
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, error) => (!error ? ['user'] : []),
    }),

    getTitles: builder.query<Title[], void>({
      query: () => 'titles',
      transformResponse: (res: Res<Title[]>) => res.data,
      providesTags: ['titles'],
    }),

    toggleTitle: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `titles/${id}/toggle`,
        method: 'PUT',
      }),
      invalidatesTags: (_, error) => (!error ? ['user', 'titles'] : []),
    }),

    buyTitle: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `titles/${id}/buy`,
        method: 'POST',
      }),
      invalidatesTags: (_, error) => (!error ? ['user', 'titles'] : []),
    }),

    getTransactions: builder.query<Transaction[], void>({
      query: () => 'transactions',
      providesTags: ['transactions'],
      transformResponse: (res: Res<Transaction[]>) => res.data,
    }),
  }),
})

export const {
  useGetUserQuery,
  useLoginMutation,
  useForgotMutation,
  useLogoutMutation,
  useGetLevelsQuery,
  useGetTitlesQuery,
  useBuyTitleMutation,
  useLazyGetUserQuery,
  useRegisterMutation,
  useResetPassMutation,
  useLazyGetLevelsQuery,
  useToggleTitleMutation,
  useGetTransactionsQuery,
  useUpdatePictureMutation,
  useUpdateSocialsMutation,
  useUpdatePasswordMutation,
  useUpdateUserBasicsMutation,
  useUpdateNickAndEmailMutation,
} = api

export default api

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
  GameDetails,
  Level,
  LoginCredentials,
  Mission,
  Notification,
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
  'games',
  'levels',
  'titles',
  'missions',
  'transactions',
  'notifications',
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
      invalidatesTags: (_, error) =>
        !error ? ['user', 'titles', 'notifications'] : [],
    }),

    getTransactions: builder.query<Transaction[], void>({
      query: () => 'transactions',
      providesTags: ['transactions'],
      transformResponse: (res: Res<Transaction[]>) => res.data,
    }),

    getNotifications: builder.query<Notification[], void>({
      query: () => 'notifications',
      providesTags: ['notifications'],
      transformResponse: (res: Res<Notification[]>) => res.data,
    }),

    markNotificationRead: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `notifications/${id}/read`,
        method: 'PUT',
      }),
      invalidatesTags: (_, error) => (!error ? ['notifications'] : []),
    }),

    markNotificationUnread: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `notifications/${id}/unread`,
        method: 'PUT',
      }),
      invalidatesTags: (_, error) => (!error ? ['notifications'] : []),
    }),

    deleteNotification: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `notifications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error) => (!error ? ['notifications'] : []),
    }),

    markAllNotificationsRead: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: 'notifications/all/read',
        method: 'PUT',
      }),
      invalidatesTags: (_, error) => (!error ? ['notifications'] : []),
    }),

    markAllNotificationsUnread: builder.mutation<
      { message: string },
      void
    >({
      query: () => ({
        url: 'notifications/all/unread',
        method: 'PUT',
      }),
      invalidatesTags: (_, error) => (!error ? ['notifications'] : []),
    }),

    deleteAllNotifications: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: 'notifications/all',
        method: 'DELETE',
      }),
      invalidatesTags: (_, error) => (!error ? ['notifications'] : []),
    }),

    getMissions: builder.query<Mission[], void>({
      query: () => 'missions',
      providesTags: ['missions'],
      transformResponse: (res: Res<Mission[]>) => res.data,
    }),

    completeMission: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `missions/${id}/complete`,
        method: 'POST',
      }),
      invalidatesTags: ['user', 'missions'],
    }),

    getGameDetails: builder.query<GameDetails, string>({
      query: (slug) => `games/${slug}`,
      transformResponse: (res: Res<GameDetails>) => res.data,
      providesTags: (_, __, slug) => [{ id: slug, type: 'games' }],
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
  useGetMissionsQuery,
  useResetPassMutation,
  useLazyGetLevelsQuery,
  useToggleTitleMutation,
  useGetGameDetailsQuery,
  useGetTransactionsQuery,
  useUpdatePictureMutation,
  useUpdateSocialsMutation,
  useGetNotificationsQuery,
  useUpdatePasswordMutation,
  useCompleteMissionMutation,
  useUpdateUserBasicsMutation,
  useLazyGetNotificationsQuery,
  useUpdateNickAndEmailMutation,
  useDeleteNotificationMutation,
  useMarkNotificationReadMutation,
  useMarkNotificationUnreadMutation,
  useDeleteAllNotificationsMutation,
  useMarkAllNotificationsReadMutation,
  useMarkAllNotificationsUnreadMutation,
} = api

export default api

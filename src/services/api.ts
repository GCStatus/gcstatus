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
  Comment,
  CommentPayload,
  FiltersClassifications,
  GameDetails,
  GameList,
  HeartablePayload,
  Home,
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
  'home',
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
        url: 'login',
        method: 'POST',
        body,
      }),
      invalidatesTags: (_, error) => (!error ? tagTypes : []),
    }),

    register: builder.mutation<{ message: string }, RegisterCredentials>({
      query: (body) => ({
        url: 'register',
        method: 'POST',
        body,
      }),
    }),

    forgot: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: 'password/reset/notify',
        method: 'POST',
        body,
      }),
    }),

    resetPass: builder.mutation<{ message: string }, ResetPasswordPayload>(
      {
        query: (body) => ({
          url: 'password/reset',
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

    deleteAllNotifications: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: 'notifications/all/remove',
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

    getHome: builder.query<Home, void>({
      query: () => 'home',
      transformResponse: (res: Res<Home>) => res.data,
      providesTags: ['home'],
    }),

    heartItem: builder.mutation<void, HeartablePayload>({
      query: (body) => ({
        url: 'hearts',
        method: 'POST',
        body,
      }),
    }),

    searchGames: builder.query<GameList[], string>({
      query: (search) => ({
        url: 'games/search',
        params: { q: search },
      }),
      transformResponse: (res: Res<GameList[]>) => res.data,
    }),

    createComment: builder.mutation<Comment, CommentPayload>({
      query: (body) => ({
        url: 'comments',
        method: 'POST',
        body,
      }),
      transformResponse: (res: Res<Comment>) => res.data,
    }),

    deleteComment: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `comments/${id}`,
        method: 'DELETE',
      }),
    }),

    findGamesBy: builder.query<
      GameList[],
      {
        attribute: FiltersClassifications
        value: string
      }
    >({
      query: ({ attribute, value }) => ({
        url: 'games/filters',
        params: { attribute, value },
      }),
      transformResponse: (res: Res<GameList[]>) => res.data,
    }),

    findGamesByCondition: builder.query<GameList[], string>({
      query: (condition) => `games/condition/${condition}`,
      transformResponse: (res: Res<GameList[]>) => res.data,
    }),

    calendarGames: builder.query<GameList[], void>({
      query: () => 'games/calendar',
      transformResponse: (res: Res<GameList[]>) => res.data,
    }),
  }),
})

export const {
  useGetUserQuery,
  useGetHomeQuery,
  useLoginMutation,
  useForgotMutation,
  useLogoutMutation,
  useGetLevelsQuery,
  useGetTitlesQuery,
  useLazyGetHomeQuery,
  useBuyTitleMutation,
  useLazyGetUserQuery,
  useRegisterMutation,
  useGetMissionsQuery,
  useResetPassMutation,
  useHeartItemMutation,
  useLazyGetLevelsQuery,
  useCalendarGamesQuery,
  useToggleTitleMutation,
  useGetGameDetailsQuery,
  useLazyFindGamesByQuery,
  useGetTransactionsQuery,
  useLazySearchGamesQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
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
  useLazyFindGamesByConditionQuery,
  useMarkNotificationUnreadMutation,
  useDeleteAllNotificationsMutation,
  useMarkAllNotificationsReadMutation,
} = api

export default api

import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

import { Loadable as L } from './components'
import { DefaultLayout } from './layouts'

export const Routes = () => {
  const Home = L(lazy(() => import('./pages/Home')))
  const Search = L(lazy(() => import('./pages/Search')))
  const Profile = L(lazy(() => import('./pages/Profile')))
  const Calendar = L(lazy(() => import('./pages/Calendar')))
  const GameTags = L(lazy(() => import('./pages/Game/Tags')))
  const GameGenres = L(lazy(() => import('./pages/Game/Genres')))
  const GameDetails = L(lazy(() => import('./pages/Game/Details')))
  const GamePlatforms = L(lazy(() => import('./pages/Game/Platforms')))
  const GameCategories = L(lazy(() => import('./pages/Game/Categories')))

  return useRoutes([
    {
      element: <DefaultLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/releases/calendar',
          element: <Calendar />,
        },
        {
          path: '/profile',
          children: [{ index: true, element: <Profile /> }],
        },
        {
          path: '/search/:query',
          element: <Search />,
        },
        {
          path: '/games',
          children: [
            { index: true, element: <>Games</> },
            { path: ':slug', element: <GameDetails /> },
          ],
        },
        { path: '/tags/:tag', element: <GameTags /> },
        { path: '/genres/:genre', element: <GameGenres /> },
        { path: '/platforms/:platform', element: <GamePlatforms /> },
        { path: '/categories/:category', element: <GameCategories /> },
      ],
    },
  ])
}

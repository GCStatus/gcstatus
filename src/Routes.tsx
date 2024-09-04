import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

import { Loadable as L } from './components'
import { DefaultLayout } from './layouts'

export const Routes = () => {
  const Home = L(lazy(() => import('./pages/Home')))
  const Search = L(lazy(() => import('./pages/Search')))
  const Calendar = L(lazy(() => import('./pages/Calendar')))
  const GameDetails = L(lazy(() => import('./pages/Game/Details')))

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
      ],
    },
  ])
}

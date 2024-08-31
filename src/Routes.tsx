import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

import { Loadable as L } from './components'
import { DefaultLayout } from './layouts'

export const Routes = () => {
  const Home = L(lazy(() => import('./pages/Home')))

  return useRoutes([
    {
      element: <DefaultLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
      ],
    },
  ])
}

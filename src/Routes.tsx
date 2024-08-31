import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

import { DefaultLayout } from './layouts'
import { Loadable as L } from './components'

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

import { useRoutes } from 'react-router-dom'

import { DefaultLayout } from './layouts'

export const Routes = () => {
  return useRoutes([
    {
      element: <DefaultLayout />,
      children: [
        {
          path: '/',
          element: <>Hello World</>,
        },
      ],
    },
  ])
}

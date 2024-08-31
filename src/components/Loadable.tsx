import { LazyExoticComponent, Suspense } from 'react'

import { LoadingScreen } from '@/components'

const Loadable =
  (Component: LazyExoticComponent<() => JSX.Element>) => (props: {}) => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )

export default Loadable

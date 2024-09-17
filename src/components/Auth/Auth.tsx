import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

import { LoadingScreen } from '@/components'
import { useAccount } from '@/hooks'
import { useLazyGetUserQuery } from '@/services/api'
import { logout } from '@/store/accountSlice'
import { getCookie } from '@/utils'

export interface AuthProps {
  shouldRedirect: boolean
}

function Auth(props: AuthProps) {
  const { shouldRedirect } = props
  const go = useNavigate()
  const dispatch = useDispatch()
  const { user, loading } = useAccount()
  const isAuth = Boolean(getCookie('_gc_auth'))
  const [trigger, { error, isError }] = useLazyGetUserQuery()
  const [triggerCalled, setTriggerCalled] = useState<boolean>(false)

  useEffect(() => {
    if (!isAuth) {
      dispatch(logout())

      if (shouldRedirect) go('/login')

      return
    }

    if (!loading && !user && !triggerCalled) {
      trigger()
      setTriggerCalled(true)
    }
  }, [user, loading, triggerCalled, isAuth, shouldRedirect])

  useEffect(() => {
    if (isError) {
      const fetchError = error as FetchBaseQueryError

      if (fetchError.status === 401) {
        dispatch(logout())

        if (shouldRedirect) go('/login')
      }
    }
  }, [error, isError, shouldRedirect])

  if (loading) return <LoadingScreen />

  return <Outlet />
}

export default Auth

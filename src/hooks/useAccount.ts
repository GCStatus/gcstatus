import { useSelector } from 'react-redux'

import { accountSelector } from '@/store/accountSlice'

function useAccount() {
  return useSelector(accountSelector)
}

export default useAccount

import { useSelector } from 'react-redux'

import { articleSelector } from '@/store/articleSlice'

function useAccount() {
  return useSelector(articleSelector)
}

export default useAccount

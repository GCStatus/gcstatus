import { useSelector } from 'react-redux'

import { articleSelector } from '@/store/articleSlice'

function useArticles() {
  return useSelector(articleSelector)
}

export default useArticles

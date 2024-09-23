import { useSelector } from 'react-redux'

import { levelSelector } from '@/store/levelsSlice'

function useLevels() {
  return useSelector(levelSelector)
}

export default useLevels

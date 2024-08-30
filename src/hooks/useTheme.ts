import { useSelector } from 'react-redux'

import { themeSelector } from '@/store/themeSlice'

function useTheme() {
  const { mode } = useSelector(themeSelector)

  return mode
}

export default useTheme

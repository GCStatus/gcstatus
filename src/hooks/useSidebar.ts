import { useSelector } from 'react-redux'

import { sidebarSelector } from '@/store/sidebarSlice'

function useSidebar() {
  const { sidebarEnabled } = useSelector(sidebarSelector)

  return sidebarEnabled
}

export default useSidebar

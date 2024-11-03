import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { LoadingScreen } from '@/components'
import { useGames } from '@/hooks'

import ModuledFilters from './ModuledFilters'

function Categories() {
  const { category = '' } = useParams()
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const {
    games,
    totalGames,
    currentPage,
    pageSize,
    sort,
    isLoading,
    handlePageChange,
    handleSortChange,
    handlePageSizeChange,
  } = useGames({
    category,
  })

  const handleViewChange = (newView: 'grid' | 'list') => {
    setIsAnimating(true)
    setTimeout(() => {
      setView(newView)
      setIsAnimating(false)
    }, 500)
  }

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <ModuledFilters
      games={games}
      totalGames={totalGames}
      currentPage={currentPage}
      pageSize={pageSize}
      sort={sort}
      view={view}
      isAnimating={isAnimating}
      onViewChange={handleViewChange}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      onSortChange={handleSortChange}
    />
  )
}

export default Categories

import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useGames } from '@/hooks'

import ModuledFilters from './ModuledFilters'

function Platforms() {
  const { platform = '' } = useParams()
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [isAnimating, setIsAnimating] = useState(false)

  const {
    games,
    totalGames,
    currentPage,
    pageSize,
    sort,
    handlePageChange,
    handleSortChange,
    handlePageSizeChange,
  } = useGames({
    platform,
  })

  const handleViewChange = (newView: 'grid' | 'list') => {
    setIsAnimating(true)
    setTimeout(() => {
      setView(newView)
      setIsAnimating(false)
    }, 500)
  }

  return (
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

export default Platforms

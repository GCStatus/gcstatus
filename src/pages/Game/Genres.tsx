import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useGames } from '@/hooks'

import ModuledFilters from './ModuledFilters'

function Genres() {
  const { genre = '' } = useParams()
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const {
    games,
    currentPage,
    pageSize,
    sort,
    handlePageChange,
    handleSortChange,
    handlePageSizeChange,
  } = useGames({
    genre,
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

export default Genres

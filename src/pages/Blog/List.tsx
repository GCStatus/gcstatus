import {
  Box,
  Container,
  IconButton,
  Pagination,
  Stack,
  Typography,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { MdViewList, MdViewModule } from 'react-icons/md'

import { MOCK_BLOG_LIST, MOCK_CATEGORIES, MOCK_TAGS } from '@/mocks'
import { Blog } from '@/types'
import { removeDiacritics as rd } from '@/utils'

import { Aside, PostCard } from './modules'

function List() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedTags, setSelectedTags] = useState<number[]>([])
  const [sortBy, setSortBy] = useState<string>('views_count')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [perPage, setPerPage] = useState<number>(6)
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    [],
  )

  const handleViewChange = (newView: 'grid' | 'list') => {
    setIsAnimating(true)
    setTimeout(() => {
      setViewMode(newView)
      setIsAnimating(false)
    }, 500)
  }

  const blogs = MOCK_BLOG_LIST
  const categories = MOCK_CATEGORIES
  const tags = MOCK_TAGS

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  const filteredBlogs = blogs
    .filter(({ title }) => {
      if (searchTerm && searchTerm.trim() !== '') {
        const searchWords = rd(searchTerm).toLowerCase().split(' ')

        const contentName = rd(title).toLowerCase()

        return searchWords.every((word) => contentName.includes(word))
      }

      return true
    })
    .filter(({ categories }) =>
      selectedCategories.length > 0
        ? selectedCategories.every((catId) =>
            categories.some(({ id }) => id === catId),
          )
        : true,
    )
    .filter(({ tags }) =>
      selectedTags.length > 0
        ? selectedTags.every((tagId) =>
            tags.some(({ id }) => id === tagId),
          )
        : true,
    )
    .sort((a, b) =>
      a[sortBy as keyof Blog] > b[sortBy as keyof Blog] ? -1 : 1,
    )

  const indexOfLastPost = currentPage * perPage
  const indexOfFirstPost = indexOfLastPost - perPage
  const currentBlogs = filteredBlogs.slice(
    indexOfFirstPost,
    indexOfLastPost,
  )

  return (
    <Stack className="dark:bg-theme-dark-900 bg-white dark:text-white text-black min-h-screen flex flex-col items-center">
      <Container
        maxWidth="xl"
        className="flex md:flex-row flex-col gap-8 py-8">
        <Aside
          tags={tags}
          categories={categories}
          perPage={perPage}
          setPerPage={setPerPage}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <Box component="section" className="flex-1 space-y-8">
          <div className="flex justify-between items-center mb-4">
            <Box className="sm:flex hidden gap-1">
              <IconButton
                onClick={() => handleViewChange('list')}
                className={`${
                  viewMode === 'list'
                    ? 'text-theme-red-900'
                    : 'dark:text-white text-black'
                } transition-colors duration-300`}>
                <MdViewList />
              </IconButton>
              <IconButton
                onClick={() => handleViewChange('grid')}
                className={`${
                  viewMode === 'grid'
                    ? 'text-theme-red-900'
                    : 'dark:text-white text-black'
                } transition-colors duration-300`}>
                <MdViewModule />
              </IconButton>
            </Box>
            <Pagination
              count={Math.ceil(filteredBlogs.length / perPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              className="dark:bg-theme-dark-900 bg-transparent rounded-xl px-4 py-1 border border-theme-red-900 sm:w-auto w-full"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#ff4d4d',
                  '&:hover': {
                    color: '#fff',
                    backgroundColor: '#ff4d4d',
                  },
                },
                '& .Mui-selected': {
                  color: '#fff',
                  backgroundColor: '#ff4d4d !important',
                },
              }}
            />
          </div>

          <Box
            className={`grid transition-opacity duration-500 ease-in-out ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            } ${
              viewMode === 'grid'
                ? 'lg:grid-cols-3 sm:grid-cols-2 grid-cols-1'
                : 'grid-cols-1'
            } gap-6`}>
            {currentBlogs.length > 0 ? (
              currentBlogs.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  view={viewMode}
                  setView={setViewMode}
                />
              ))
            ) : (
              <Typography className="text-center">
                Ops... No posts found.
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Stack>
  )
}

export default List

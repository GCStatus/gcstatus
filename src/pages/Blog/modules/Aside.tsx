import { Box, SelectChangeEvent, Stack, Typography } from '@mui/material'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

import { Input, Select } from '@/components'
import { Category, Tag } from '@/types'

interface AsideProps {
  tags: Tag[]
  categories: Category[]
  selectedTags: number[]
  setSelectedTags: Dispatch<SetStateAction<number[]>>
  perPage: number
  setPerPage: Dispatch<SetStateAction<number>>
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
  sortBy: string
  setSortBy: Dispatch<SetStateAction<string>>
  selectedCategories: number[]
  setSelectedCategories: Dispatch<SetStateAction<number[]>>
}

const ITEMS_PER_PAGE_OPTIONS = [6, 12, 18, 24, 30]

function Aside(props: AsideProps) {
  const {
    tags,
    categories,
    selectedTags,
    setSelectedTags,
    perPage,
    setPerPage,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    selectedCategories,
    setSelectedCategories,
  } = props

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryChange = (e: SelectChangeEvent<number[]>) => {
    setSelectedCategories(e.target.value as number[])
  }

  const handleTagChange = (tagId: number) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId))
    } else {
      setSelectedTags([...selectedTags, tagId])
    }
  }

  const handleSortChange = (e: SelectChangeEvent<string>) => {
    setSortBy(e.target.value)
  }

  const handlePerPageChange = (e: SelectChangeEvent<string>) => {
    setPerPage(parseInt(e.target.value))
  }

  return (
    <Stack
      component="aside"
      className="md:w-1/4 w-full md:p-4 p-0 dark:bg-zinc-900/35 rounded-md bg-transparent dark:text-white text-black space-y-4 md:sticky block top-0 md:top-[6.5rem] md:h-screen h-full">
      <Typography variant="h2" className="text-2xl font-semibold mb-4">
        Filter Posts
      </Typography>
      <Input
        isFull
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for posts..."
        customClass="rounded-full"
      />

      <Select
        multiple
        label="Categories"
        onChange={handleCategoryChange}
        defaultValue={selectedCategories}
        options={categories.map(({ id, name }) => ({
          value: id,
          label: name,
        }))}
        renderValue={(selected) =>
          selected
            .map(
              (id: any) => categories.find((cat) => cat.id === id)?.name,
            )
            .join(', ')
        }
      />

      <Typography
        variant="h3"
        className="text-lg font-semibold mt-6 mb-2 text-theme-red-900">
        Tags
      </Typography>
      <Box className="flex flex-wrap gap-2">
        {tags.map(({ id, name }) => (
          <button
            key={id}
            className={`px-3 py-1 rounded-full border ${
              selectedTags.includes(id)
                ? 'bg-theme-red-900 text-white'
                : 'dark:hover:bg-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleTagChange(id)}>
            {name}
          </button>
        ))}
      </Box>

      <Select
        isFull
        label="Sort by"
        defaultValue={sortBy}
        onChange={handleSortChange}
        options={[
          {
            label: 'Most Viewed',
            value: 'views_count',
          },
          {
            label: 'Most Liked',
            value: 'hearts_count',
          },
          {
            label: 'Newest',
            value: 'created_at',
          },
        ]}
      />

      <Select
        isFull
        label="Posts per page"
        defaultValue={perPage}
        onChange={handlePerPageChange}
        options={ITEMS_PER_PAGE_OPTIONS.map((value) => ({
          value,
          label: value.toString(),
        }))}
      />
    </Stack>
  )
}

export default Aside

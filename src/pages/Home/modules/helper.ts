import { removeDiacritics as rd } from '@/utils'

export const filteredGamesFn = (games: any[], search: string) => {
  let filtered: any[] = games

  if (search && search.trim() !== '') {
    const searchWords = rd(search).toLowerCase().split(' ')

    filtered = filtered.filter(({ title, description }) => {
      const contentName = rd(title).toLowerCase()
      const contentDesc = rd(description || '').toLowerCase()

      return searchWords.every(
        (word) => contentName.includes(word) || contentDesc.includes(word),
      )
    })
  }

  return filtered
}

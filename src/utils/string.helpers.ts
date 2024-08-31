export const shortenString = (str: string, len = 45) => {
  if (str.length > len) {
    return str.slice(0, len - 1) + '...'
  }

  return str
}

export const removeDiacritics = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

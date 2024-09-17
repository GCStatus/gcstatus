export const getParam = (param: string): any => {
  const urlParams = new URLSearchParams(window.location.search)

  return urlParams.get(param)
}

export const getCookie = (name: string): any => {
  const match = document.cookie.match(
    RegExp('(?:^|;\\s*)' + name + '=([^;]*)'),
  )

  return match ? match[1] : null
}

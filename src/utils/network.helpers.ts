export const getParam = (param: string): any => {
  const urlParams = new URLSearchParams(window.location.search)

  return urlParams.get(param)
}

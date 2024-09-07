import { Area } from 'react-easy-crop'

export const getCroppedImg = async (imageSrc: string, crop: Area) => {
  const image = new Image()
  image.src = imageSrc
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const { width, height } = crop
  canvas.width = width
  canvas.height = height

  if (ctx) {
    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height,
    )
  }

  return new Promise<string>((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      resolve(url)
    }, 'image/jpeg')
  })
}

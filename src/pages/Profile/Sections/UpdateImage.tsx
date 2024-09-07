import { Box, Slider, Stack, Typography } from '@mui/material'
import { useCallback, useRef, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { AiFillCamera } from 'react-icons/ai'

import { Button } from '@/components'
import { getCroppedImg } from '@/utils'

function UpdateImage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [zoom, setZoom] = useState<number>(1)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
    null,
  )
  const [crop, setCrop] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImageSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onCropComplete = useCallback(
    (_: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    [],
  )

  const handleCrop = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [imageSrc, croppedAreaPixels])

  const handleCancel = () => {
    setImageSrc(null)
    setCroppedImage(null)
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const onSubmit = async () => {
    const formData = new FormData()

    if (croppedImage) formData.append('photo', croppedImage)

    console.log(formData, croppedImage)
  }

  return (
    <Box className="md:p-6 p-2 rounded-lg animate-fade-in">
      <Typography
        variant="h2"
        className="text-2xl font-bold mb-6 text-theme-red-900">
        Update Profile Picture
      </Typography>
      <Stack spacing={4}>
        {!imageSrc && (
          <Box className="animate-fade-in">
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <Button
              icon={<AiFillCamera />}
              fullWidth
              onClick={handleButtonClick}>
              Upload Profile Picture
            </Button>
          </Box>
        )}

        {imageSrc && !croppedImage && (
          <Box className="animate-fade-in">
            <Box className="relative w-full h-80 bg-black rounded-md overflow-hidden">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </Box>
            <Stack direction="row" spacing={2} alignItems="center" mt={2}>
              <Box className="text-gray-400" component="span">
                Zoom:
              </Box>
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(_, value) => setZoom(value as number)}
                className="text-theme-red-900"
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              mt={4}>
              <Button
                onClick={handleCrop}
                className="bg-theme-red-900 hover:bg-theme-red-800">
                Continue
              </Button>
              <Button
                onClick={handleCancel}
                className="border-theme-red-900 text-theme-red-900 hover:bg-theme-dark-700">
                Cancel
              </Button>
            </Stack>
          </Box>
        )}

        {croppedImage && (
          <Box className="flex flex-col items-center animate-fade-in">
            <img
              src={croppedImage}
              alt="Cropped"
              className="rounded-full border-4 border-theme-red-900 w-40 h-40 mb-4"
            />
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              mt={4}>
              <Button
                onClick={onSubmit}
                className="bg-theme-red-900 hover:bg-theme-red-800">
                Confirm
              </Button>
              <Button
                onClick={handleCancel}
                className="border-theme-red-900 text-theme-red-900 hover:bg-theme-dark-700">
                Cancel
              </Button>
            </Stack>
          </Box>
        )}
      </Stack>
    </Box>
  )
}

export default UpdateImage

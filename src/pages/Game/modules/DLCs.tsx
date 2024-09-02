import { Box, Link, Typography } from '@mui/material'
import { useState } from 'react'
import { IoPlay } from 'react-icons/io5'

import { DLC } from '@/types'

import { DLCsModal } from '.'

interface DLCsProps {
  dlc: DLC
}

function DLCs(props: DLCsProps) {
  const { dlc } = props
  const [modalPath, setModalPath] = useState<{
    path: string
    type: 'photo' | 'video'
  } | null>(null)

  const openModal = (path: string, type: 'photo' | 'video') => {
    setModalPath({ path, type })
  }

  const closeModal = () => {
    setModalPath(null)
  }

  return (
    <>
      <Box
        component="li"
        className="p-8 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent rounded-lg bg-transparent animate-slide-in transition-all duration-500 relative overflow-hidden flex flex-col gap-10 z-10">
        <Box className="absolute inset-0 z-0 bg-gradient-to-br from-transparent to-theme-red-900 opacity-0 hover:opacity-20 transition-opacity duration-500 pointer-events-none" />

        <Box className="flex flex-col sm:flex-row items-center gap-4 relative">
          <img
            src={dlc.cover}
            alt={`${dlc.name} Cover`}
            className="sm:w-48 w-full rounded-lg border-2 border-theme-red-900 shadow-md hover:shadow-red-500/50 hover:scale-105 transition-transform duration-300"
          />
          <Box className="flex-1">
            <Typography
              variant="h3"
              className="text-xl font-bold text-theme-red-900 dark:text-white dark:neon-text">
              {dlc.name}
            </Typography>
            <Typography
              component="span"
              className="text-gray-600 dark:text-gray-400 block mt-2">
              Release Date: {dlc.release}
            </Typography>

            <Box className="mt-4 flex flex-wrap gap-2 sm:justify-start justify-center text-center">
              {dlc.platforms.map((platform) => (
                <Typography
                  key={platform.id}
                  component="span"
                  className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-600 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-md hover:shadow-theme-red-900/50">
                  {platform.name}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="relative">
          <Typography
            variant="h4"
            className="text-lg font-semibold text-theme-red-900 dark:text-white mb-2 dark:neon-text">
            Gallery
          </Typography>
          <Box className="flex flex-wrap gap-4">
            {dlc.galleries.map(({ id, media_type, thumbnail, path }) => (
              <Box
                key={id}
                className="relative group cursor-pointer p-1 rounded-lg sm:w-auto w-full"
                onClick={() =>
                  openModal(path, media_type.name as 'photo' | 'video')
                }>
                {media_type.name === 'photo' ? (
                  <img
                    src={thumbnail}
                    alt={`Gallery ${id}`}
                    className="sm:w-48 w-full rounded-md shadow-md duration-300 hover:shadow-lg hover:shadow-red-400/50"
                  />
                ) : (
                  <Box className="relative">
                    <img
                      src={thumbnail}
                      alt={`Gallery ${id}`}
                      className="sm:w-48 w-full rounded-md shadow-md duration-300 hover:shadow-lg hover:shadow-red-400/50"
                    />
                    <Box className="absolute inset-0 flex items-center justify-center">
                      <Box className="bg-black bg-opacity-50 p-4 rounded-full flex items-center justify-center">
                        <IoPlay />
                      </Box>
                    </Box>
                  </Box>
                )}

                <Box className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-md" />
              </Box>
            ))}
          </Box>
        </Box>

        <Box className="relative">
          <Typography
            variant="h4"
            className="text-lg font-semibold text-theme-red-900 dark:text-white mb-2 dark:neon-text">
            Available At
          </Typography>
          <Box className="flex flex-wrap gap-4">
            {dlc.companies.map((company) => (
              <Link
                key={company.id}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex sm:flex-row flex-col items-center justify-center gap-3 p-4 border border-gray-600 rounded-lg bg-gradient-to-br from-gray-100 dark:from-gray-800 to-white dark:to-zinc-900 transition-all duration-500 hover:shadow-lg hover:shadow-theme-red-900/50 sm:w-auto w-full">
                <img
                  src={company.logo}
                  alt={`${company.name} Logo`}
                  className="w-12 h-12 object-contain"
                />
                <Box>
                  <Typography
                    variant="h5"
                    className="text-sm font-bold text-gray-800 dark:text-white">
                    {company.name}
                  </Typography>
                  <Typography className="text-gray-600 dark:text-gray-400">
                    {(company.price / 100).toLocaleString('en-US', {
                      currency: 'USD',
                      style: 'currency',
                    })}
                  </Typography>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>

      <DLCsModal closeModal={closeModal} modalPath={modalPath} />
    </>
  )
}

export default DLCs

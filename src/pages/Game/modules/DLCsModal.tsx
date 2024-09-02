import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

function DLCsModal({
  modalPath,
  closeModal,
}: {
  modalPath: { path: string; type: 'photo' | 'video' } | null
  closeModal: () => void
}) {
  const [showModal, setShowModal] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (modalPath) {
      setShowModal(true)
      setTimeout(() => setIsVisible(true), 80)
    } else if (showModal) {
      setIsVisible(false)
      setTimeout(() => setShowModal(false), 500)
    }
  }, [modalPath, showModal])

  if (!showModal || !modalPath) return null

  return (
    <Box
      className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setIsVisible(false)
          setTimeout(closeModal, 400)
        }
      }}
      onClick={() => {
        setIsVisible(false)
        setTimeout(closeModal, 400)
      }}>
      <Box
        className={`relative p-4 max-w-3xl w-full transition-transform transform duration-300 ${
          isVisible ? 'scale-100' : 'scale-90'
        }`}
        onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-2 right-2 text-white text-2xl bg-red-600 rounded-full w-8 h-8 flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation()
            setIsVisible(false)
            setTimeout(closeModal, 400)
          }}>
          &times;
        </button>
        {modalPath.type === 'photo' ? (
          <img
            src={modalPath.path}
            alt={`Gallery ${modalPath.path}`}
            className="w-full h-auto rounded-md shadow-xl"
          />
        ) : (
          <video controls className="w-full h-auto rounded-md shadow-xl">
            <track
              default
              kind="captions"
              srcLang="en"
              src={modalPath.path}
            />
            <source src={modalPath.path} type="video/mp4" />
            Your browser does not support the video.
          </video>
        )}
      </Box>
    </Box>
  )
}

export default DLCsModal

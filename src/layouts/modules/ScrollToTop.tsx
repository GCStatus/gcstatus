import { Fab } from '@mui/material'
import { useEffect, useState } from 'react'
import { MdKeyboardDoubleArrowUp } from 'react-icons/md'

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [topPosition, setTopPosition] = useState<string>('-50px')

  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true)
      setTopPosition('calc(100vh - 4rem)')
      return
    }

    setIsVisible(false)
    setTopPosition('-50px')
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div
      className={`fixed right-4 z-40 transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ top: topPosition }}>
      <Fab
        className="dark:bg-theme-dark-900 bg-gray-300 hover:opacity-70 transition duration-300"
        onClick={scrollToTop}>
        <MdKeyboardDoubleArrowUp
          className="dark:text-white text-gray-800"
          size={28}
        />
      </Fab>
    </div>
  )
}

export default ScrollToTop

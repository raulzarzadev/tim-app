'use client'
import { useEffect, useState } from 'react'

const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState<any>(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowWidth(window.innerWidth)
      }
      setWindowWidth(window.innerWidth)

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return { windowWidth }
}

export default useWindowSize

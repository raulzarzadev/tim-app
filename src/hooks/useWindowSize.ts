'use client'
import { useEffect, useState } from 'react'

const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState<any>()

  useEffect(() => {
    if (globalThis.window === undefined) return
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { windowWidth }
}

export default useWindowSize

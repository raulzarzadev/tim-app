import { useEffect, useState } from 'react'

const useUser = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {}, [])
  return user
}

export default useUser

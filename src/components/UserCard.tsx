'use client'

import { useAuthContext } from '@/context/authContext'

const UserCard = () => {
  const { user } = useAuthContext()
  if (!user) return null
  return <div>{user?.name}</div>
}

export default UserCard

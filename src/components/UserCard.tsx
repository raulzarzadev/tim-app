'use client'

import { useAuthContext } from '@/context/authContext'
import UserForm from './UserForm'
import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import LoginButton from './LoginButton'
import { updateUser } from '@/firebase/users'
import { UserType } from '@/types/user'
import ErrorBoundary from './ErrorBoundary'

const UserCard = () => {
  const { user } = useAuthContext()
  const { userCompanies } = useUserCompaniesContext()
  if (!user)
    return (
      <div>
        {/* <Typography component={'p'} className="text-center w-full text-xl my-4">
          Comienza a rentar
        </Typography> */}
      </div>
    )
  if (user === null) {
    return (
      <div className="my-4 w-full flex justify-center">
        <LoginButton />
      </div>
    )
  }
  const handleSetUser = async (user: Partial<UserType>) => {
    if (!user.id) return console.error(' No user id')
    return await updateUser(user?.id, user)
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }
  return (
    <div>
      <ErrorBoundary>
        <UserForm user={user} setUser={handleSetUser} />

        {userCompanies.length === 0 && (
          <div className="flex w-full justify-center">
            <Button LinkComponent={Link} href="/new-company">
              Crea una nueva empresa!
            </Button>
          </div>
        )}
      </ErrorBoundary>
    </div>
  )
}

export default UserCard

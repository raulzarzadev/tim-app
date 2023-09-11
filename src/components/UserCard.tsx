'use client'

import { useAuthContext } from '@/context/authContext'
import UserForm from './UserForm'
import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import LoginButton from './LoginButton'

const UserCard = () => {
  const { user } = useAuthContext()
  const { companies } = useUserCompaniesContext()
  if (!user)
    return (
      <div>
        <Typography component={'p'} className="text-center w-full text-xl my-4">
          Comienza a rentar
        </Typography>
        <div className="my-4 w-full flex justify-center">
          <LoginButton />
        </div>
      </div>
    )
  return (
    <div>
      <UserForm user={user} />
      {companies.length === 0 && (
        <div className="flex w-full justify-center">
          <Button LinkComponent={Link} href="/new-company">
            ¿Tienes algo que rentar?
          </Button>
        </div>
      )}
    </div>
  )
}

export default UserCard

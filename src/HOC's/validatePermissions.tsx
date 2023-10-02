'use client'
import { useAuthContext } from '@/context/authContext'
import { useUserPermissions } from '@/context/userCompaniesContext'
import { StaffPermission } from '@/types/staff'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

const validatePermissions = (WrappedComponent: any, area: StaffPermission) => {
  const hocComponent = ({ ...props }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useAuthContext()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const permission = useUserPermissions({ area })
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    if (!user && !permission)
      return <div>Estamos evaluando sus permisos. Espera un segundo</div>
    if (user && !permission)
      return (
        <div>
          <p>Parece que no tienes los permisos suficientes.</p>
          <Button onClick={() => router.back()}>Atras</Button>
        </div>
      )

    return <WrappedComponent {...props} />
  }

  return hocComponent
}
export default validatePermissions

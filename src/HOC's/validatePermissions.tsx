'use client'
import { useUserPermissions } from '@/context/userCompaniesContext'
import { StaffPermission } from '@/types/staff'
import React from 'react'

const validatePermissions = (WrappedComponent: any, area: StaffPermission) => {
  const hocComponent = ({ ...props }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const permission = useUserPermissions({ area })
    if (permission === undefined)
      return <div>Estamos evaluando sus permisos. Espera un segundo</div>
    if (permission === false || permission === null)
      return <div>Parece que no tienes los permisos suficientes. </div>

    return <WrappedComponent {...props} />
  }

  return hocComponent
}
export default validatePermissions

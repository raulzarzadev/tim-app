export enum StaffPermissionLabels {
  CASHBOX = 'Caja',
  SALES = 'Ventas',
  MAINTENANCE = 'Mantenimiento',
  DELIVERY = 'Reparto',
  ADMIN = 'Administrador',
  RECEPTION = 'Recepción'
}
export type StaffPermission = keyof typeof StaffPermissionLabels
export type StaffPermissions = {
  [key in StaffPermission]?: boolean
  // reception?: boolean
  // inventory?: boolean
  // accounting?: boolean
  // reports?: boolean
  // settings?: boolean
  // all?: boolean
}

export type StaffType = {
  id: string
  name: string
  email?: string
  image?: string
  permissions: StaffPermissions
}

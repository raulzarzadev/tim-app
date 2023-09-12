export enum StaffPermissionLabels {
  CASHBOX = 'Caja',
  SALES = 'Ventas',
  MAINTENANCE = 'Mantenimiento',
  DELIVERY = 'Reparto',
  ADMIN = 'Administrador',
  RECEPTION = 'Recepción'
}
export type StaffPermissions = {
  [key in keyof typeof StaffPermissionLabels]?: boolean
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

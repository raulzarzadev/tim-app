import { IconName } from '@/components/AppIcon'

export enum StaffPermissionLabels {
  CASHBOX = 'Caja',
  SALES = 'Ventas',
  MAINTENANCE = 'Mantenimiento',
  DELIVERY = 'Reparto',
  ADMIN = 'Administrador',
  RECEPTION = 'Recepción',
  ORDERS = 'Ordenes'
}
export const areaIcon: Record<StaffPermission, IconName> = {
  CASHBOX: 'cashbox',
  SALES: 'sales',
  MAINTENANCE: 'fix',
  DELIVERY: 'delivery',
  ADMIN: 'person',
  RECEPTION: 'store',
  ORDERS: 'order'
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

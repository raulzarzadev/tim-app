import { IconName } from '@/components/AppIcon'

export enum StaffPermissionLabels {
  ADMIN = 'Administrador',
  CASHBOX = 'Caja',
  MAINTENANCE = 'Mantenimiento',
  ORDERS = 'Ordenes',
  MY_ORDERS = 'Mis Ordenes',
  SALES = 'Ventas',
  DELIVERY = 'Reparto',
  RECEPTION = 'Recepción'
}
export const areaIcon: Record<StaffPermission, IconName> = {
  CASHBOX: 'cashbox',
  SALES: 'sales',
  MAINTENANCE: 'fix',
  DELIVERY: 'delivery',
  ADMIN: 'person',
  RECEPTION: 'store',
  ORDERS: 'order',
  MY_ORDERS: 'myOrder'
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

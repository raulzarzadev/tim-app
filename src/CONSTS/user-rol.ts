export enum USER_ROL {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export const USER_ROLES: Record<USER_ROL, { label: string }> = {
  [USER_ROL.CLIENT]: { label: 'Cliente' },
  [USER_ROL.ADMIN]: { label: 'Admin' },
  [USER_ROL.SUPER_ADMIN]: { label: 'Super Admin' }
} as const

export type UserRol = keyof typeof USER_ROL

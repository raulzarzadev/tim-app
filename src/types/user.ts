import { UserRol } from '@/CONSTS/user-rol'
import { BaseType } from './base'

export type UserBase = {
  email: string
  name: string
  image?: string
  rol: UserRol
  phone: string
  super_user?: boolean
}

export type UserType = BaseType & UserBase

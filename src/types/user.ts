import { UserRol } from '@/CONSTS/user-rol'
import { BaseType } from './base'

export type UserBase = {
  email: string
  name: string
  image?: string
  rol: UserRol
}

export type UserType = BaseType & UserBase

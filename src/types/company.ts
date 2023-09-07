import { BaseType } from './base'
import { UserType } from './user'

export type CompanyBase = {
  name: string
  userId: UserType['id']
}

export type CompanyType = BaseType & CompanyBase

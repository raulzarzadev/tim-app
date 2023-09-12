import { BaseType } from './base'
import { CategoryType } from './category'
import { UserType } from './user'

export type CompanyBase = {
  name: string
  userId: UserType['id']
  description: string
  categories?: CategoryType[]
}

export type CompanyType = BaseType & CompanyBase

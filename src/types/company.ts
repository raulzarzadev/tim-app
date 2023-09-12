import { ArticleType } from './article'
import { BaseType } from './base'
import { CategoryType } from './category'
import { UserType } from './user'

export type CompanyBase = {
  name: string
  userId: UserType['id']
  description: string
  categories?: CategoryType[]
  articles?: ArticleType[]
}

export type CompanyType = BaseType & CompanyBase

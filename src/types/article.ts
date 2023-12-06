import { ItemRentStatus } from '@/context/useCompanyCashbox'
import { CategoryType } from './category'

export type ArticleType = {
  id: string
  name: string
  serialNumber: string
  category: CategoryType['name']
  color?: string
  status: 'active' | 'inactive'
  image?: string
  ownPrice?: boolean
  prices?: CategoryType['prices']
  description?: string
  rentStatus?: ItemRentStatus
}

export type CompanyItem = ArticleType

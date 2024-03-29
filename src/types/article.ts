import { ItemRentStatus } from '@/context/useCompanyCashbox'
import { CategoryType } from './category'
import { ItemTagType } from '@/components/TagsInput'

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
  storeVisible?: boolean
  companyId?: string
  tags?: {title:string}[]
}

export type CompanyItem = ArticleType

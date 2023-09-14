import { CategoryType } from './category'

export type ArticleType = {
  id: string
  name: string
  serialNumber: string
  category: CategoryType['name']
  color: string
  status: 'active' | 'inactive'
  image?: string
  ownPrice?: boolean
  prices: CategoryType['prices']
}

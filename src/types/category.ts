import { PriceType } from '@/components/PricesForm'
import { BaseType } from './base'
import { ArticleType } from './article'

export type CategoryBase = {
  name: string
  description?: string
  image?: string
  prices: PriceType[]
  companyId?: string
  items?: Partial<ArticleType>[]
}

export type CategoryType = CategoryBase & Partial<BaseType> & {}

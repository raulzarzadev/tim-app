import { PriceType } from '@/components/PricesForm'
import { BaseType } from './base'

export type CategoryBase = {
  name: string
  description?: string
  image?: string
  prices: PriceType[]
  companyId?: string
}

export type CategoryType = CategoryBase & Partial<BaseType> & {}

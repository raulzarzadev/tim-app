import { PriceType } from '@/components/PricesForm'

export type CategoryType = {
  name: string
  description?: string
  image?: string
  prices: PriceType[]
}

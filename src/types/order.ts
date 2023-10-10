import { Timestamp } from 'firebase/firestore'
import { ArticleType } from './article'
import { CompanyType } from './company'
import { BaseType } from './base'
import { PaymentMethods } from '@/CONSTS/paymentMethods'
import { ItemSelected } from '@/components/CompanyCashbox'
import { Client } from './client'
import { PriceType } from '@/components/PricesForm'
import { UserType } from './user'

export type OrderBase = {
  shipping: Shipping
  client: Client
  items: ItemSelected[]
  payments: Payment[]
  changes: PaymentChange[]
  companyId: CompanyType['id']
}

export type Order = OrderBase & BaseType

export type Shipping = {
  date: Timestamp | Date
  address: string | 'store'
}

export type Payment = {
  isCancelled?: boolean
  date?: Timestamp | Date
  amount: number
  usdPrice: number
  method: PaymentMethods
  discount?: number
  charged?: number
  rest?: number
  created: {
    by: UserType['id']
    at: Date | Timestamp
  }
}

export type PaymentChange = {
  amount: number
  newPrice: PriceType | null
  newItemId: ArticleType['id']
  oldItemId: ArticleType['id']
}

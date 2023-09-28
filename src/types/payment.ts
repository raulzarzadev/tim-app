import { FieldValue, Timestamp } from 'firebase/firestore'
import { ArticleType } from './article'
import { CompanyType } from './company'
import { BaseType } from './base'
import { PaymentMethods } from '@/CONSTS/paymentMethods'
import { ItemSelected } from '@/components/CompanyCashbox'
import { Client } from './client'
import { PriceType } from '@/components/PricesForm'

export type Payment = {
  companyId: CompanyType['id']
  startAt: Timestamp | Date
  items: PaymentItem[]
  payment: PaymentData
  isCancelled?: boolean
  client?: Partial<Client>
  changes: PaymentChange[] | FieldValue
} & BaseType

export type CreatePayment = Pick<
  Payment,
  'companyId' | 'startAt' | 'items' | 'payment' | 'client'
>

export type PaymentChange = {
  amount: number
  newPrice: PriceType | null
  newItemId: ArticleType['id']
  oldItemId: ArticleType['id']
}

export type PaymentData = {
  date?: Timestamp | Date
  amount: number
  usdPrice: number
  method: PaymentMethods
  discount?: number
  charged?: number
  rest?: number
}

export type PaymentItem = ItemSelected

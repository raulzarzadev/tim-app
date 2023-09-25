import { Timestamp } from 'firebase/firestore'
import { ArticleType } from './article'
import { CompanyType } from './company'
import { BaseType } from './base'
import { PaymentMethods } from '@/CONSTS/paymentMethods'
import { ItemSelected } from '@/components/CompanyCashbox'

export type Payment = {
  companyId: CompanyType['id']
  startAt: Timestamp | Date
  items: PaymentItem[]
  payment: PaymentData
  isCancelled?: boolean
} & BaseType

export type CreatePayment = Pick<
  Payment,
  'companyId' | 'startAt' | 'items' | 'payment'
>

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

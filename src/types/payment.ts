import { FieldValue, Timestamp } from 'firebase/firestore'
import { ArticleType } from './article'
import { CompanyType } from './company'
import { BaseType } from './base'
import { PaymentMethods } from '@/CONSTS/paymentMethods'
import { Client } from './client'
import { PriceType } from '@/components/PricesForm'
import { ItemSelected } from '@/context/useCompanyCashbox'

export type Payment = {
  companyId: CompanyType['id']
  startAt: Timestamp | Date
  items: PaymentItem[]
  payment: PaymentData
  isCancelled?: boolean
  client?: Partial<Client>
  changes: PaymentChange[]
  order: {
    pickupStore: boolean
    shippingAddress: string
    shippingPrice: number
    schedule: Date | Timestamp
    pickupNow: boolean
  }
} & BaseType

export type CreatePayment = Pick<
  Payment,
  'companyId' | 'startAt' | 'items' | 'payment' | 'client'
>

export type CreateOrder = Omit<CreatePayment, 'payment'> &
  Pick<Payment, 'order'>

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

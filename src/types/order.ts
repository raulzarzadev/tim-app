import { Timestamp } from 'firebase/firestore'
import { ArticleType } from './article'
import { CompanyType } from './company'
import { BaseType } from './base'
import { PaymentMethods } from '@/CONSTS/paymentMethods'
import { Client } from './client'
import { PriceType } from '@/components/PricesForm'
import { UserType } from './user'
import { ItemSelected } from '@/context/useCompanyCashbox'
import { StaffType } from './staff'
import { Service } from './service'

export type OrderBase = {
  shipping: Shipping
  client: Partial<Client>
  items: ItemSelected[]
  payments: Payment[]
  changes: PaymentChange[]
  companyId: CompanyType['id']
  status?:
    | 'canceled'
    | 'pending'
    | 'finished'
    | 'in-progress'
    | 'reported'
    | 'renewed'
  reports?: Service['id'][]
}

export type Order = OrderBase & BaseType

export type Shipping = {
  assignedToEmail?: StaffType['email']
  date?: Timestamp | Date
  address?: string | 'store'
  amount?: number
}

export type Payment = {
  id?: string
  isCancelled?: boolean
  date?: Timestamp | Date
  usdPrice: number
  method: PaymentMethods
  discount?: number
  charged?: number
  amount?: number //** this should be not necessary */
  // // ** rest this should be not necessary * /
  //** rest now its necessary to calculate balance. and for show the correct value in order details.   */
  rest?: number
  ref?: string
  totalPaid?: number
  created: {
    by: UserType['id']
    at: Date | Timestamp
  }
  // createAt?: Date | Timestamp
  // createdByEmail?: UserType['email']
  orderId?: string
}

export type PaymentChange = {
  amount: number
  newPrice: PriceType | null
  newItemId: ArticleType['id']
  oldItemId: ArticleType['id']
  resolved?: boolean
}

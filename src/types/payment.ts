import { Timestamp } from 'firebase/firestore'
import { ArticleType } from './article'
import { CompanyType } from './company'
import { BaseType } from './base'
import { PaymentMethods } from '@/CONSTS/paymentMethods'

export type Payment = {
  companyId: CompanyType['id']
  items: PaymentItem[]
  amount: number
  discount: number
  dollarPrice: number
  method: PaymentMethods
  date: Timestamp | Date
} & BaseType

export type PaymentItem = {
  itemId: ArticleType['id']
  time: `${number}-mins`
}

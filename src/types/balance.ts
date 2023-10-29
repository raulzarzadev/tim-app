import { Timestamp } from 'firebase/firestore'
import { Order } from './order'
import { ItemOrder } from '@/context/userCompaniesContext2'
import { ItemSelected } from '@/context/useCompanyCashbox'
import { BaseType } from './base'
import { CompanyType } from './company'
import { PaymentMethods } from '@/CONSTS/paymentMethods'

export type Balance = {
  from: Timestamp | Date
  to: Timestamp | Date
  cashier: 'all' | string
}

export type BalanceType = Balance & BaseType & { orders: Partial<Order>[] }
export type SimpleBalance = BalanceType

export type BalanceData = {
  orders?: Partial<Order>[]
} & BalanceDataFromOrders &
  Partial<Balance> &
  Partial<BaseType>

export type BalanceDataFromOrders = {
  changes?: Order['changes'] & {
    order?: Partial<Order>
  }
  payments?: Order['payments'] & { order?: Partial<Order> }
  totalFromPayments?: number

  items: ItemSelected[]
  itemsStats?: BalanceItem[]

  paymentsMethods?: Record<PaymentMethods, number> & { total: number } //{ card: number; mxn: number; usd: number } | undefined
}

export type BalanceFromPayments = {
  methods?: Record<PaymentMethods, number> & { total: number }
}

export type PaymentMethodsTotals = Record<PaymentMethods, number> & {
  total: number
}

export type BalanceItem = Pick<
  ItemOrder,
  'id' | 'name' | 'serialNumber' | 'category'
> & {
  rentTimes: number
  hoursInRent: number
  raised?: number
}

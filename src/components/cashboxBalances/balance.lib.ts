import { isAfter, isBefore } from 'date-fns'
import forceAsDate from '@/lib/forceAsDate'
import { ItemOrder } from '@/context/userCompaniesContext2'
import { Order, Payment } from '@/types/order'
import { ItemSelected } from '@/context/useCompanyCashbox'
import { CompanyItem } from '@/types/article'
import rentTime from '@/lib/rentTime'
import {
  Balance,
  BalanceData,
  BalanceDataFromOrders,
  BalanceItem
} from '@/types/balance'
import { calculateTotal } from '@/lib/calculateTotalItem'

export const getOrdersByBalanceForm = (
  balance: Balance,
  orders?: Partial<Order>[]
): Partial<Order>[] => {
  const filteredByDate = orders?.filter(
    (o) =>
      isAfter(forceAsDate(o?.created?.at), forceAsDate(balance.from)) &&
      isBefore(forceAsDate(o?.created?.at), forceAsDate(balance.to))
  )
  const filteredByUser = filteredByDate?.filter((o) =>
    balance.cashier === 'all' ? true : o.created?.byEmail === balance.cashier
  )
  return filteredByUser || []
}

export const balanceDataFromOrders = (
  orders?: Partial<Order>[]
): BalanceDataFromOrders => {
  const payments = orders
    ?.map((o) => o.payments?.map((p) => ({ ...p, order: o })) || [])
    ?.flat()
  const changes = orders
    ?.map((o) => o?.changes?.map((c) => ({ ...c, order: o })) || [])
    ?.flat()
  const totalFromPayments = payments
    ?.flat()
    ?.map((p) => p?.amount)
    ?.reduce((p, c) => (p || 0) + (c || 0), 0)

  type PaymentsMethods = Record<Payment['method'], number>
  //TODO: test this function
  const methods: PaymentsMethods | undefined = payments?.reduce(
    (p, c) => {
      //*
      if (c.method === 'usd') {
        return {
          ...p,
          [c.method]: p[c?.method] + (c?.charged || 0),
          mxn: p.mxn - (c?.rest || 0)
        }
      }
      return {
        ...p,
        [c.method]: p[c?.method] + (c?.amount || 0)
      }
    },
    { card: 0, mxn: 0, usd: 0 }
  )

  const items: any[] =
    orders?.map((o) => o.items?.map((i) => ({ ...i })) || []).flat() || []

  return {
    changes,
    payments,
    totalFromPayments,
    paymentsMethods: methods,
    items
  }
}

const hoursInRent = (item: ItemSelected): number => {
  const rentInMinutes = rentTime(item.qty, item.unit)
  return rentInMinutes / 60
}

export const balanceItemsData = (
  balanceItems: ItemSelected[],
  companyItems: CompanyItem[]
) => {
  const reduceItems = balanceItems.reduce(
    (prev: BalanceItem[], curr: ItemSelected) => {
      const foundItem = prev.find((i) => i.id === curr.itemId)
      if (foundItem) {
        const removeFound = prev.filter((i) => i.id !== foundItem.id)
        foundItem.rentTimes++
        foundItem.hoursInRent += hoursInRent(curr)
        return [...removeFound, foundItem]
      } else {
        const formatItem: BalanceItem = {
          hoursInRent: hoursInRent(curr),
          rentTimes: 1,
          // TODO: raised: calculateTotal(curr.unit, curr.qty,),
          id: curr.itemId
        }
        return [...prev, formatItem]
      }
    },
    []
  )
  const companyItemInfo = (itemId: ItemOrder['id']) => {
    const item = companyItems?.find((i) => i.id === itemId)

    return {
      category: item?.category,
      name: item?.name,
      serialNumber: item?.serialNumber
    }
  }
  const items: BalanceItem[] = reduceItems.map((i) => ({
    ...i,
    ...companyItemInfo(i.id)
  }))
  return items
}

export const calculateBalance = (
  balance: Balance,
  orders?: Partial<Order>[]
): BalanceData => {
  const matchOrders = getOrdersByBalanceForm(balance, orders)
  const balanceData = balanceDataFromOrders(matchOrders)
  return {
    orders: matchOrders,
    ...balanceData,
    ...balance
  }
}

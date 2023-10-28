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
import { PaymentMethods, paymentMethods } from '@/CONSTS/paymentMethods'

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

  //type PaymentsMethods = Record<Payment['method'], number>
  //TODO: test this function
  const methods: Record<PaymentMethods, number> | undefined = payments?.reduce(
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
    { card: 0, mxn: 0, usd: 0, deposit: 0 }
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

const getPaymentsFromBalanceForm = (
  balance: Balance,
  orders?: Partial<Order>[]
): Partial<Payment[]> => {
  const payments: Partial<Payment[]> =
    orders
      ?.map((o) => o.payments?.map((p) => ({ ...p, orderId: o.id })))
      .flat() || []

  const matchDatePayments =
    payments?.filter((p) => {
      const paymentDate = p?.created?.at || p?.date
      return (
        isAfter(forceAsDate(paymentDate), forceAsDate(balance?.from)) &&
        isBefore(forceAsDate(paymentDate), forceAsDate(balance?.to))
      )
    }) || []

  return matchDatePayments
}

export const calculateBalance = (
  balance: Balance,
  orders?: Partial<Order>[]
): BalanceData => {
  const matchPayments = getPaymentsFromBalanceForm(balance, orders)
  const matchOrders = orders?.filter((o) =>
    matchPayments.find((p) => p?.orderId === o?.id)
  )
  // const matchOrders = getOrdersByBalanceForm(balance, orders)
  const balanceData = balanceDataFromOrders(matchOrders)
  //const balancePaymentsData = balanceDataFromPayments(matchPayments || [])
  //console.log({ balancePaymentsData })

  const itemsUsed: ItemSelected[] = matchOrders
    ?.map((o) => o.items)
    .flat()
    .reduce((acc: ItemSelected[], curr) => {
      //if item already exist add time
      if (acc?.find((i) => i.itemId === curr?.itemId)) {
        return
      }
      // other way add new item
    }, [])
  const paymentsMethods = methodsTotals(matchPayments)
  return {
    orders: matchOrders,
    ...balance,
    items: [],
    changes: [],
    totalFromPayments: 0,
    payments: matchPayments.map((p) => ({
      ...p,
      order: orders?.find((o) => o.id === p?.orderId)
    })) as Payment[],
    paymentsMethods
  }
}

// const balanceDataFromPayments: BalanceDataFromOrders = (
//   payments?: Partial<Payment[]>
// ) => {
//   const paymentsMethods = methodsTotals(payments || [])
//   return {
//     paymentsMethods,
//     totalFromPayments: paymentsMethods.total,
//     payments,
//     items: [],
//     itemsStats: [],
//     changes: []
//   }
// }

const methodsTotals = (payments: Partial<Payment[]>) => {
  const cardAmount =
    payments?.reduce((acc: number, curr) => {
      if (curr?.method === 'card') return acc + (curr?.amount || 0)
      return acc
    }, 0) || 0

  const mxnAmount =
    payments?.reduce((acc: number, curr) => {
      if (curr?.method === 'mxn') return acc + (curr?.amount || 0)
      return acc
    }, 0) || 0

  const usdAmount =
    payments?.reduce((acc: number, curr) => {
      if (curr?.method === 'usd')
        return acc + (curr?.amount || 0) * curr.usdPrice
      return acc
    }, 0) || 0

  const depositAmount =
    payments?.reduce((acc: number, curr) => {
      if (curr?.method === 'deposit') return acc + (curr?.amount || 0)
      return acc
    }, 0) || 0
  return {
    total: cardAmount + mxnAmount + usdAmount + depositAmount,
    card: cardAmount,
    mxn: mxnAmount,
    usd: usdAmount,
    deposit: depositAmount
  }
}

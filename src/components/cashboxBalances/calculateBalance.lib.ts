import { PaymentMethods } from '@/CONSTS/paymentMethods'
import forceAsDate from '@/lib/forceAsDate'
import { Balance, BalanceData } from '@/types/balance'
import { Order, Payment } from '@/types/order'
import { isAfter, isBefore } from 'date-fns'

export const totalCharged = (payments: Partial<Payment>[]) => {
  let total = 0
  payments.forEach(
    ({ method = 'mxn', charged = 0, usdPrice = 1, rest = 0 }) => {
      if (method === 'usd') {
        total += charged * usdPrice
      } else {
        total += charged
      }
    }
  )
  return total
}

export const splitPaymentsByMethods = (
  payments: Partial<Payment>[]
): Record<PaymentMethods & 'total', number> =>
  payments?.reduce(
    (acc, { method = 'mxn', charged = 0, usdPrice = 1, rest = 0 } = {}) => {
      if (method === 'usd') {
        let totalSum = acc.total + charged * usdPrice
        //* should rest from mxn because the rest cant be in dollars

        let mxnTotal = acc['mxn']
        if (rest < 0) {
          totalSum += rest
          mxnTotal += rest
        }
        return {
          ...acc,
          usd: acc[method] + charged,
          total: totalSum,
          mxn: mxnTotal
        }
      }

      let total = acc.total + charged
      let methodSum = acc[method] + charged
      if (rest < 0) {
        total += rest
        methodSum += rest
      }
      const res = {
        ...acc,
        [method]: methodSum,
        total
      }
      return res
    },
    { card: 0, mxn: 0, usd: 0, deposit: 0, total: 0 }
  )

export const calculateOrderBalance = (
  order: Order
): {
  amounts: ReturnType<typeof splitPaymentsByMethods>
} => {
  const amounts = splitPaymentsByMethods(order.payments)
  return {
    amounts
  }
}
export const calculateOrdersBalance = (orders: Order[]) => {
  const payments = orders.map((o) => o.payments).flat()
  const amounts = splitPaymentsByMethods(payments)
  return {
    amounts
  }
}

export const getPaymentsBetweenDates = (
  balanceData: Balance,
  payments: Partial<Payment>[]
) => {
  const filteredByDate = payments?.filter(
    (p) =>
      isAfter(forceAsDate(p?.created?.at), forceAsDate(balanceData.from)) &&
      isBefore(forceAsDate(p?.created?.at), forceAsDate(balanceData.to))
  )
  return filteredByDate
}

/**
 *
 * @param payments a list of payments from orders
 * @param creator should be a email from staff
 * @returns
 */
export const getPaymentsCreatedBy = (
  payments: Partial<Payment>[],
  creator: string
) => {
  const filteredByDate = payments?.filter((p) => p?.created?.by === creator)
  return filteredByDate
}

export const calculateBalance = (
  balance: Balance,
  companyOrders?: Partial<Order>[]
): BalanceData => {
  //* Should take company orders and get the payments whit the order id, if order have not payments should return empty array
  const allPayments = companyOrders
    ?.map((o) => o.payments?.map((p) => ({ ...p, orderId: o.id })) || [])
    .flat()

  const matchDatePayments = getPaymentsBetweenDates(
    balance,
    (allPayments as Payment[]) || []
  )
  const balancePayments = matchDatePayments.filter((p) => {
    if (!balance.cashier) return true
    if (balance.cashier === 'all') return true
    if (balance.cashier === p?.created?.by) return true
    return true
  })

  console.log({ balancePayments })
  let balanceOrders: Order[] = []
  balancePayments.forEach((payment) => {
    if (!payment || !payment?.orderId) return
    if (!balanceOrders?.find((o) => o?.id === payment?.orderId)) {
      balanceOrders.push(
        companyOrders?.find((o) => o?.id === payment?.orderId) as Order
      )
    }
  })
  const items: any[] =
    balanceOrders?.map((o) => o?.items?.map((i) => ({ ...i })) || []).flat() ||
    []

  const paymentsMethods = splitPaymentsByMethods(balancePayments)
  return {
    items,
    ...balance,
    orders: balanceOrders,
    payments: balancePayments as Payment[],
    paymentsMethods: paymentsMethods as BalanceData['paymentsMethods']
  }
}

import { PaymentMethods } from '@/CONSTS/paymentMethods'
import { Payment } from '@/types/order'

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
    (acc, { method = 'mxn', charged = 0, usdPrice = 1, rest = 0 }) => {
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

import { describe, test, expect } from 'vitest'
import { Order } from '@/types/order'
import { basic_order2 } from '../DATA/basic_order2'
import { basic_order } from '../DATA/basic_order'
import { splitPaymentsByMethods } from '../calculateBalance.lib'
import { basic_order3 } from '../DATA/basic_order3'

const calculateOrderBalance = (
  order: Order
): {
  amounts: ReturnType<typeof splitPaymentsByMethods>
} => {
  const amounts = splitPaymentsByMethods(order.payments)
  return {
    amounts
  }
}
const calculateOrdersBalance = (orders: Order[]) => {
  const payments = orders.map((o) => o.payments).flat()
  const amounts = splitPaymentsByMethods(payments)
  return {
    amounts
  }
}
describe('calculate single order balance should return', () => {
  test('card 100, mxn 100, usd 0, deposit 0, total 200 ', () => {
    expect(calculateOrderBalance(basic_order)).toEqual({
      amounts: {
        card: 100,
        mxn: 100,
        usd: 0,
        deposit: 0,
        total: 200
      }
    })
  })
  test('mxn 375   usd 50, deposit 0, total 1200 ', () => {
    expect(calculateOrderBalance(basic_order2)).toEqual({
      amounts: {
        card: 0,
        mxn: 375,
        usd: 50,
        deposit: 0,
        total: 1200
      }
    })
  })
})
describe('calculate multiple orders balance should return', () => {
  test('475mxn,  50usd, 100card, , 0dep , total 1400', () => {
    expect(calculateOrdersBalance([basic_order, basic_order2])).toEqual({
      amounts: {
        card: 100,
        mxn: 475,
        usd: 50,
        deposit: 0,
        total: 1400
      }
    })
  })
  test('20.5mxn , 10usd ,  64.5card, 50dep,  total 300', () => {
    expect(
      calculateOrdersBalance([basic_order, basic_order2, basic_order3])
    ).toEqual({
      amounts: {
        card: 164.5,
        mxn: 495.5,
        usd: 60,
        deposit: 50,
        total: 1700
      }
    })
  })
})

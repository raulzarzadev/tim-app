import { describe, test, expect } from 'vitest'
import { basic_order } from '../DATA/basic_order'
import { basic_order2 } from '../DATA/basic_order2'
import { basic_order3 } from '../DATA/basic_order3'
import {
  calculateOrderBalance,
  calculateOrdersBalance,
  getPaymentsBetweenDates
} from '../calculateBalance.lib'

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

describe('calculate balance based in dates from a single order payments ', () => {
  const payments = basic_order3.payments
  test('between 2 hours  ', () => {
    const p = getPaymentsBetweenDates(
      {
        cashier: 'all',
        from: new Date(2023, 10, 20, 11, 30),
        to: new Date(2023, 10, 20, 13, 30)
      },
      payments
    )
    expect(p).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: '6' }),
        expect.objectContaining({ id: '5' })
      ])
    )
  })
  test('between 2 days  ', () => {
    const p = getPaymentsBetweenDates(
      {
        cashier: 'all',
        from: new Date(2023, 10, 18, 10, 59),
        to: new Date(2023, 10, 20, 12, 59)
      },
      payments
    )
    expect(p).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: '6' }),
        expect.objectContaining({ id: '7' })
      ])
    )
  })
})

describe('calculate balance based in dates  from multiples orders', () => {
  const payments = [
    ...basic_order3.payments,
    ...basic_order2.payments,
    ...basic_order.payments
  ]
  test('between 2 days  ', () => {
    const p = getPaymentsBetweenDates(
      {
        cashier: 'all',
        from: new Date(2023, 10, 18, 10, 59),
        to: new Date(2023, 10, 20, 12, 59)
      },
      payments
    )
    expect(p).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: '6' }),
        expect.objectContaining({ id: '7' }),
        expect.objectContaining({ id: '2' }),
        expect.objectContaining({ id: '3' }),
        expect.objectContaining({ id: '4' })
      ])
    )
  })
  test('between 2 hours same day ', () => {
    const p = getPaymentsBetweenDates(
      {
        cashier: 'all',
        from: new Date(2023, 10, 18, 12, 59),
        to: new Date(2023, 10, 18, 17, 59)
      },
      payments
    )
    expect(p).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: '2' }),
        expect.objectContaining({ id: '3' }),
        expect.objectContaining({ id: '4' })
      ])
    )
  })
})

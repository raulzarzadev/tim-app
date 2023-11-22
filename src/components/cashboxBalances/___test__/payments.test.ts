import { describe, expect, test } from 'vitest'
import {
  multipleOrderPayments,
  multiplePaymentsWithRest,
  multiplePaymentsWithRetried,
  simpleOrderPayments,
  simpleOrderPaymentsWitRest,
  usdMultipleOrderPayments,
  usdSimpleOrderPayments,
  withNegativePayment,
  withNegativePaymentDiffUsdPrice
} from '../DATA/payments'
import { splitPaymentsByMethods, totalCharged } from '../calculateBalance.lib'

describe('payments should be calculated correctly', () => {
  test('simple payment', () => {
    expect(totalCharged(simpleOrderPayments)).toBe(600)
  })

  test('simple payment with rest', () => {
    expect(totalCharged(simpleOrderPaymentsWitRest)).toBe(600)
  })

  test('usd simple payment', () => {
    expect(totalCharged(usdSimpleOrderPayments)).toBe(640)
  })

  test('usd multiple payment', () => {
    //** should be the total of charges in the order */
    expect(totalCharged(usdMultipleOrderPayments)).toBe(829.28)
  })

  test('multiple payment', () => {
    //** should be the total of charges in the order */
    expect(totalCharged(multipleOrderPayments)).toBe(630)
  })

  test('with negative charged payment', () => {
    expect(totalCharged(withNegativePayment)).toBe(236)
  })

  test('with negative charged payment and different usd price', () => {
    expect(totalCharged(withNegativePaymentDiffUsdPrice)).toBe(256)
  })

  test('calculate totals and split it by methods', () => {
    expect(splitPaymentsByMethods(multipleOrderPayments)).toEqual({
      card: 40,
      mxn: 90,
      usd: 10,
      deposit: 500,
      total: 730
    })
  })

  test('calculate totals and split it by methods and rest included', () => {
    expect(splitPaymentsByMethods(multiplePaymentsWithRest)).toEqual({
      card: 0,
      mxn: 200,
      usd: 20,
      deposit: 0,
      total: 600
    })
  })

  test('calculate totals and split it by methods and rest and retried included', () => {
    expect(splitPaymentsByMethods(multiplePaymentsWithRetried)).toEqual({
      card: 0,
      mxn: 500,
      usd: 0,
      deposit: 0,
      total: 500
    })
  })
})

import { describe, expect, test } from 'vitest'
import { itemStatus } from './itemStatus'

describe('itemStatus', () => {
  test('return pending', () => {
    expect(
      itemStatus('1', {
        companyOrders: [
          {
            items: [
              {
                itemId: '1',
                rentStatus: 'pending'
              }
            ]
          },
          {
            items: [
              {
                itemId: '1',
                rentStatus: 'finished'
              }
            ]
          }
        ]
      })
    ).toBe('pending')

    expect(
      itemStatus('1', {
        companyOrders: [
          {
            items: [
              {
                itemId: '1'
              }
            ]
          }
        ]
      })
    ).toBe('pending')
  })

  test('return taken', () => {
    expect(
      itemStatus('1', {
        companyOrders: [
          {
            items: [
              {
                itemId: '1',
                rentStatus: 'taken'
              },
              {
                itemId: '1',
                rentStatus: 'finished'
              }
            ]
          }
        ]
      })
    ).toBe('taken')
  })

  test('return finished', () => {
    expect(
      itemStatus('1', {
        companyOrders: [
          {
            items: [
              {
                itemId: '1',
                rentStatus: 'finished'
              }
            ]
          }
        ]
      })
    ).toBe('finished')
  })
  test('return expired', () => {
    expect(
      itemStatus('1', {
        companyOrders: [
          {
            items: [
              {
                itemId: '1',
                rentStatus: 'expired'
              }
            ]
          }
        ]
      })
    ).toBe('expired')

    expect(
      itemStatus('1', {
        companyOrders: [
          {
            items: [
              {
                itemId: '1',
                rentStatus: 'taken',
                rentStartedAt: new Date(2023, 10, 1),
                qty: 1,
                unit: 'day'
              }
            ]
          },
          {
            items: [
              {
                itemId: '1',
                rentStatus: 'pending',
                qty: 1,
                unit: 'day'
              }
            ]
          }
        ]
      })
    ).toBe('expired')
  })
})

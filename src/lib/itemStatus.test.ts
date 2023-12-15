import { describe, expect, test } from 'vitest'
import { itemStatus } from './itemStatus'

describe('itemStatus', () => {
  test('return pending', () => {
    //* orders with out rent status defined
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
      }).status
    ).toBe('pending')
    //* orders with at least one item  rent status pending

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
      }).status
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
      }).status
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
      }).status
    ).toBe('available')

    expect(
      itemStatus('1', {
        companyOrders: [
          {
            status: 'canceled',
            items: [
              {
                itemId: '1',
                rentStatus: 'pending'
              }
            ]
          }
        ]
      }).status
    ).toBe('available')
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
      }).status
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
      }).status
    ).toBe('expired')

    //* orders canceled with at least one item  rent status taken
    expect(
      itemStatus('1', {
        companyOrders: [
          {
            status: 'canceled',
            items: [
              {
                itemId: '1',
                rentStatus: 'taken'
              }
            ]
          }
        ]
      }).status
    ).toBe('expired')
  })

  test('return available', () => {
    //* if itemsOrders are empty should be available
    expect(itemStatus('1', { companyOrders: [] }).status).toBe('available')
  })
})

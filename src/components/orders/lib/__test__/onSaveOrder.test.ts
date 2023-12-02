import { describe, expect, test } from 'vitest'
import onSaveOrder from '../onSaveOrder'
import { addDays } from 'date-fns'
import { Order } from '@/types/order'
import { ItemSelected } from '@/context/useCompanyCashbox'

describe('onSaveOrder should', () => {
  test('return no client name when client name field is empty', () => {
    onSaveOrder({}, {}).then((res) => {
      expect(res).toEqual('no client name')
    })
  })
  test('return no items when items field is empty', () => {
    onSaveOrder(
      {
        client: {
          name: 'Test 1'
        }
      },
      {}
    ).then((res) => {
      expect(res).toEqual('no items')
    })
  })
  test('return order with items startedAt NOW when shipping field is empty', () => {
    onSaveOrder(
      {
        client: {
          name: 'Test 1'
        },
        items: [
          {
            itemId: '1',
            qty: 1,
            unit: 'hour',
            price: 100
          }
        ]
      },
      {}
    ).then((res) => {
      expect(res).toEqual({
        client: {
          name: 'Test 1'
        },
        items: [
          {
            itemId: '1',
            qty: 1,
            unit: 'hour',
            price: 100,
            rentStartedAt: new Date(),
            rentStatus: 'taken'
          }
        ]
      })
    })
  })

  test('items orders already started with date and status taken when param alreadyStart is true', () => {
    const order: Partial<Order> = {
      client: {
        name: 'Test 1'
      },
      shipping: {}
    }
    const itemsSent: Partial<ItemSelected>[] = [
      {
        itemId: '1',
        qty: 1,
        unit: 'hour',
        price: 100
      }
    ]
    const itemsExpected: Partial<ItemSelected>[] = [
      {
        itemId: '1',
        qty: 1,
        unit: 'hour',
        price: 100,
        rentStartedAt: expect.any(Date),
        rentStatus: 'taken'
      }
    ]
    order.items = itemsSent
    onSaveOrder(order, { alreadyStart: true }).then((res) => {
      expect(res).toEqual({ ...order, items: itemsExpected })
    })
  })

  test('if order with  alreadyStart true prop, even when shipping date is in the future, return order with items started At', () => {
    const order: Partial<Order> = {
      client: {
        name: 'Test 1'
      },
      shipping: {
        date: addDays(new Date(), 10)
      }
    }
    const itemsSent: Partial<ItemSelected>[] = [
      {
        itemId: '1',
        qty: 1,
        unit: 'hour',
        price: 100
      }
    ]
    const itemsExpected: Partial<ItemSelected>[] = [
      {
        itemId: '1',
        qty: 1,
        unit: 'hour',
        price: 100,
        rentStartedAt: expect.any(Date),
        rentStatus: 'taken'
      }
    ]
    order.items = itemsSent
    onSaveOrder(order, { alreadyStart: true }).then((res) => {
      expect(res).toEqual({ ...order, items: itemsExpected })
    })
  })
  test('if order with  alreadyStart false prop, return order whit item rent status as pending', () => {
    const order: Partial<Order> = {
      client: {
        name: 'Test 1'
      },
      shipping: {
        date: addDays(new Date(), 10)
      }
    }
    const itemsSent: Partial<ItemSelected>[] = [
      {
        itemId: '1',
        qty: 1,
        unit: 'hour',
        price: 100
      }
    ]
    const itemsExpected: Partial<ItemSelected>[] = [
      {
        itemId: '1',
        qty: 1,
        unit: 'hour',
        price: 100,
        rentStatus: 'pending'
      }
    ]
    order.items = itemsSent
    onSaveOrder(order, {}).then((res) => {
      expect(res).toEqual({ ...order, items: itemsExpected })
    })
  })
  test('order with  shipping date null, should return already started items', () => {
    const order: Partial<Order> = {
      client: {
        name: 'Test 1'
      },
      shipping: {
        date: null
      }
    }
    const itemsSent: Partial<ItemSelected>[] = [
      {
        itemId: '1',
        qty: 1,
        unit: 'hour',
        price: 100
      }
    ]
    const itemsExpected: Partial<ItemSelected>[] = [
      {
        itemId: '1',
        qty: 1,
        unit: 'hour',
        price: 100,
        rentStatus: 'taken',
        rentStartedAt: new Date()
      }
    ]
    order.items = itemsSent
    onSaveOrder(order, {}).then((res) => {
      expect(res).toEqual({ ...order, items: itemsExpected })
    })
  })
  //** This is disabled because it don't make sense to check shipping date to decide if order is already started */
  //test('if order with  alreadyStart false prop, and shipping date is in the past return "error, you cant assign past date"', () => {
  //   const order: Partial<Order> = {
  //     client: {
  //       name: 'Test 1'
  //     },
  //     shipping: {
  //       date: addDays(new Date(), -10)
  //     }
  //   }
  //   const itemsSent: Partial<ItemSelected>[] = [
  //     {
  //       itemId: '1',
  //       qty: 1,
  //       unit: 'hour',
  //       price: 100
  //     }
  //   ]
  //   const itemsExpected: Partial<ItemSelected>[] = [
  //     {
  //       itemId: '1',
  //       qty: 1,
  //       unit: 'hour',
  //       price: 100,
  //       rentStatus: 'pending'
  //     }
  //   ]
  //   order.items = itemsSent
  //   onSaveOrder(order, {}).then((res) => {
  //     expect(res).toEqual('shipping date in the past')
  //   })
  //})
})

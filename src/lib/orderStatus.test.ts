import { describe, test, expect } from 'vitest'
import { orderStatus } from './orderStatus'
import { Order } from '@/types/order'
import { addHours, subHours } from 'date-fns'

describe('orderStatus', () => {
  test('should return canceled', () => {
    const order: Partial<Order> = {
      status: 'canceled',
      items: [
        {
          itemId: '1'
        }
      ]
    }

    expect(orderStatus(order)).equal('canceled')
  })
  test('should return pending', () => {
    const order: Partial<Order> = {
      items: [
        {
          itemId: '1',
          rentStatus: 'pending'
        }
      ]
    }
    const order2: Partial<Order> = {
      items: [
        {
          itemId: '1',
          rentStatus: 'pending'
        },
        {
          itemId: '2',
          rentStatus: 'taken'
        }
      ]
    }
    const order3: Partial<Order> = {
      items: [
        {
          itemId: '1',
          rentStatus: 'pending'
        },
        {
          itemId: '2',
          rentStatus: 'finished'
        }
      ]
    }
    expect(orderStatus(order)).equal('pending')
    expect(orderStatus(order2)).equal('pending')
    expect(orderStatus(order3)).equal('pending')
  })
  test('should return taken', () => {
    const order: Partial<Order> = {
      items: [
        {
          itemId: '1',
          rentStatus: 'taken'
        }
      ]
    }
    const order2: Partial<Order> = {
      items: [
        {
          itemId: '1',
          rentStatus: 'taken'
        },
        {
          itemId: '2',
          rentStatus: 'taken'
        }
      ]
    }

    expect(orderStatus(order)).equal('taken')
    expect(orderStatus(order2)).equal('taken')
  })
  test('should return pending ', () => {
    const order: Partial<Order> = {
      items: [
        {
          itemId: '1',
          rentStatus: 'pending'
        },
        {
          itemId: '2',
          rentStatus: 'finished'
        },
        {
          itemId: '2',
          rentStatus: 'taken'
        }
      ]
    }
    expect(orderStatus(order)).equal('pending')
  })
  test('should return finished', () => {
    const order: Partial<Order> = {
      items: [
        {
          itemId: '1',
          rentStatus: 'finished'
        }
      ]
    }
    const order2: Partial<Order> = {
      items: [
        {
          itemId: '1',
          rentStatus: 'finished'
        },
        {
          itemId: '2',
          rentStatus: 'finished'
        }
      ]
    }

    expect(orderStatus(order)).equal('finished')
    expect(orderStatus(order2)).equal('finished')
  })
  test('should return correct status ', () => {
    const order: Partial<Order> = {
      items: [
        //* Items start two hours ago, should finish one hour later
        {
          itemId: '1',
          rentStatus: 'taken',
          qty: 1,
          unit: 'hour',
          rentStartedAt: subHours(new Date(), 2)
          // rentFinishedAt: addHours(new Date(), 1)
        },
        {
          itemId: '1',
          rentStatus: 'taken',
          qty: 3,
          unit: 'hour',
          rentStartedAt: subHours(new Date(), 2)
          // rentFinishedAt: addHours(new Date(), 1)
        }
      ]
    }

    expect(orderStatus(order)).equal('expired')
  })
})

import { describe, test } from 'vitest'
import { orderStatus } from './orderStatus'
import { Order } from '@/types/order'

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
})

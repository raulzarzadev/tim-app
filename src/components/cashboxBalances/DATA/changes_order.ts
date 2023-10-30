import { Order } from '@/types/order'

export const basic_order: Order = {
  id: '1',
  companyId: '1',
  status: 'pending',

  client: {
    name: 'test 1',
    email: 'test1@test.com'
  },
  shipping: {
    assignedToEmail: 'staff1@test.com',
    address: '',
    amount: 0,
    date: new Date(2023, 10, 30)
  },
  created: {
    at: new Date(2023, 10, 20),
    by: 'test',
    byEmail: 'test'
  },
  updated: {
    at: new Date(2023, 10, 22),
    by: 'test',
    byEmail: 'test'
  },
  items: [
    {
      itemId: '1',
      qty: 1,
      unit: 'hour',
      rentStartedAt: new Date(2023, 10, 21),
      rentStatus: 'taken'
    }
  ],
  changes: [
    {
      //** here user changes lavadora 1 month => bici 1 hour, the change should be -500 becaouse he already paid 600 */
      oldItemId: '3',
      newPrice: {
        price: 600,
        unit: 'month',
        quantity: 1
      },
      resolved: true,
      amount: -500,
      newItemId: '1'
    }
  ],
  payments: [
    {
      created: {
        at: new Date(2023, 10, 21),
        by: 'test'
      },
      method: 'card',
      charged: 600,
      rest: 0,
      amount: 600,
      usdPrice: 16
    }
  ]
}

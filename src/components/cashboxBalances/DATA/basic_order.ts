import { Order } from '@/types/order'

export const basic_order: Order = {
  id: '1',
  companyId: '1',
  status: 'pending',
  changes: [],
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
      rentStartedAt: new Date(2023, 10, 20),
      rentStatus: 'taken'
    }
  ],
  payments: [
    //* this test payments are 200 mxn two payments 100mxn , 100card
    {
      //* this payment was make it on 2023-10-18 13:10
      id: '3',
      created: {
        at: new Date(2023, 10, 18, 13, 10),
        by: 'test'
      },
      method: 'card',
      charged: 100,
      rest: 0,
      amount: 100,
      usdPrice: 1
    },
    //* this payment was make it on 2023-10-18 13:00
    {
      id: '4',
      created: {
        at: new Date(2023, 10, 18, 13, 0),
        by: 'test'
      },
      method: 'mxn',
      charged: 100,
      rest: 100,
      amount: 200,
      usdPrice: 1
    }
  ]
}

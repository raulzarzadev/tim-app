import { Order } from '@/types/order'

export const basic_order3: Order = {
  id: '123',
  companyId: '1',
  status: 'finished',
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
      itemId: '3',
      qty: 1,
      unit: 'month',
      rentStartedAt: new Date(2023, 10, 20),
      rentStatus: 'taken'
    },
    {
      itemId: '4',
      qty: 1,
      unit: 'month',
      rentStartedAt: new Date(2023, 10, 20),
      rentStatus: 'taken'
    }
  ],
  payments: [
    //* this test payments are 300 mxn two payments 20.5mxn , 10usd , 50deposit,  64.5card should rest 0
    {
      //* this payment was make it on 2023-10-20 13:00
      id: '5',
      created: {
        at: new Date(2023, 10, 20, 13),
        by: 'test-1'
      },
      method: 'card',
      charged: 64.5,
      rest: 0,
      amount: 64.5,
      usdPrice: 16.5
    },
    //* this payment was make it on 2023-10-20 12:00
    {
      id: '6',
      created: {
        at: new Date(2023, 10, 20, 12),
        by: 'test-2'
      },
      method: 'deposit',
      charged: 50,
      rest: -64.5,
      amount: 114.5,
      usdPrice: 16.5
    },
    //* this payment was make it on 2023-10-20 11:00
    {
      id: '7',
      created: {
        at: new Date(2023, 10, 18, 11),
        by: 'test-3'
      },
      method: 'usd',
      charged: 10, //* 165 mxn
      rest: -114.5,
      amount: 279.5,
      usdPrice: 16.5
    },
    //* this payment was make it on 2023-10-17
    {
      id: '8',
      created: {
        at: new Date(2023, 10, 17),
        by: 'test-2'
      },
      method: 'mxn',
      charged: 20.5,
      rest: -279.5,
      amount: 300,
      usdPrice: 16.5
    }
  ]
}

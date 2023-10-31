import { Order } from '@/types/order'

export const basic_order2: Order = {
  id: '12',
  companyId: '1',
  status: 'in-progress',
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
    //* this test payments are 1200 mxn two payments 500mxn , 40usd , should rest 375
    {
      //* this payment was make it on 2023-10-18 18:00
      created: {
        at: new Date(2023, 10, 18, 18),
        by: 'test-2'
      },
      method: 'usd',
      charged: 50, //50*16.5=825
      rest: -125,
      amount: 700,
      usdPrice: 16.5,
      id: '1'
    },
    //* this payment was make it on 2023-10-18 15:00
    {
      id: '2',
      created: {
        at: new Date(2023, 10, 18, 15),
        by: 'test-1'
      },
      method: 'mxn',
      charged: 500,
      rest: 700,
      amount: 1200,
      usdPrice: 1
    }
  ]
}

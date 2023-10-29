import { expect, test } from 'vitest'
import { Payment } from '@/types/order'

const paymentsByAllMethods: Partial<Payment>[] = [
  {
    method: 'card',
    amount: 8,
    charged: 10,
    rest: -2,
    orderId: '1'
  },
  {
    method: 'mxn',
    amount: 10,
    charged: 10,
    rest: 0,
    orderId: '2'
  },
  {
    method: 'usd',
    amount: 200,
    charged: 20,
    rest: 0,
    usdPrice: 10,
    orderId: '3'
  },
  {
    method: 'deposit',
    amount: 200,
    charged: 100,
    rest: -100,
    orderId: '4'
  }
]

const paymentsOneMethod: Partial<Payment>[] = [
  {
    method: 'mxn',
    amount: 8,
    charged: 10,
    rest: -2
  },
  {
    method: 'mxn',
    amount: 10,
    charged: 10,
    rest: 0
  },

  {
    method: 'mxn',
    amount: 15,
    charged: 20,
    rest: -5
  }
]

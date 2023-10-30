import { Payment } from '@/types/order'

export const simpleOrderPayments: Payment[] = [
  {
    created: {
      at: new Date(2023, 10, 21),
      by: 'test'
    },
    method: 'card',
    charged: 600,
    // rest: 0,
    // amount: 600,
    usdPrice: 16
  }
]

export const usdSimpleOrderPayments: Payment[] = [
  {
    created: {
      at: new Date(2023, 10, 21),
      by: 'test'
    },
    method: 'usd',
    charged: 40,
    // rest: 40,
    // amount: 600,
    usdPrice: 16
  }
]

export const usdMultipleOrderPayments: Payment[] = [
  {
    created: {
      at: new Date(2023, 10, 21),
      by: 'test'
    },
    method: 'usd',
    charged: 40,
    // rest: 40,
    // amount: 600,
    usdPrice: 16
  },
  {
    created: {
      at: new Date(2023, 10, 21),
      by: 'test'
    },
    method: 'usd',
    charged: 14,
    // rest: 40,
    // amount: 600,
    usdPrice: 13.52
  }
]

export const multipleOrderPayments: Payment[] = [
  {
    created: {
      at: new Date(2023, 10, 21), // 4 it -30, return -30 rest 0
      by: 'test'
    },
    method: 'usd',
    charged: 10,
    // rest: 500,
    // amount: 600,
    usdPrice: 10
  },
  {
    created: {
      at: new Date(2023, 10, 21), // 3 it 10,  pay 40 rest -30
      by: 'test'
    },
    method: 'card',
    charged: 40,
    // rest: -560,
    // amount: 600,
    usdPrice: 16
  },
  {
    created: {
      at: new Date(2023, 10, 21), // 2 it 100,  pay 90 rest 10
      by: 'test'
    },
    method: 'mxn',
    charged: 90,
    // rest: -510,
    // amount: 600,
    usdPrice: 16
  },
  {
    created: {
      at: new Date(2023, 10, 21), //  1 it 600,  pay 500 rest 100
      by: 'test'
    },
    method: 'deposit',
    charged: 500,
    rest: 100,
    amount: 600,
    usdPrice: 1
  }
]

export const withNegativePayment: Payment[] = [
  {
    created: {
      at: new Date(2023, 10, 21),
      by: 'test'
    },
    method: 'usd',
    charged: 20,
    usdPrice: 16.8
  },
  {
    created: {
      at: new Date(2023, 10, 21),
      by: 'test'
    },
    method: 'mxn',
    charged: -100,
    usdPrice: 16
  }
]

export const withNegativePaymentDiffUsdPrice: Payment[] = [
  {
    created: {
      at: new Date(2023, 10, 21),
      by: 'test'
    },
    method: 'usd',
    charged: 20,
    usdPrice: 16.8
  },
  {
    created: {
      at: new Date(2023, 10, 21),
      by: 'test'
    },
    method: 'usd',
    charged: -5,
    usdPrice: 16
  }
]

export const multiplePaymentsWithRest: Payment[] = [
  //* In this case the amount 600mxn and user pay 20 usd and 500 mxn
  {
    created: {
      at: new Date(2023, 10, 21), // 3
      by: 'test'
    },
    method: 'mxn',
    amount: 200,
    charged: 500,
    rest: -300,
    usdPrice: 16
  },
  {
    created: {
      at: new Date(2023, 10, 21), // 2
      by: 'test'
    },
    method: 'usd',
    amount: 600,
    charged: 20,
    rest: 200,
    usdPrice: 20
  }
]

export const multiplePaymentsWithRetried: Payment[] = [
  //* In this case the amount 600mxn and user pay 200mxn , 500mxn and make return of  -100mxn
  {
    created: {
      at: new Date(2023, 10, 21), // 4
      by: 'test'
    },
    method: 'mxn',
    amount: -100,
    charged: -100,
    rest: 0,
    usdPrice: 10
  },
  {
    created: {
      at: new Date(2023, 10, 21), // 3
      by: 'test'
    },
    method: 'mxn',
    amount: 400,
    charged: 500,
    rest: -100,
    usdPrice: 16
  },
  {
    created: {
      at: new Date(2023, 10, 21), // 2
      by: 'test'
    },
    method: 'mxn',
    amount: 600,
    charged: 200,
    rest: 400,
    usdPrice: 16
  }
]

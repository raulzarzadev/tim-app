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
    //* Pay 10 usd sobran 30 pesos

    method: 'usd',
    charged: 10,
    rest: 30,
    amount: 70,
    usdPrice: 10
  },
  {
    created: {
      at: new Date(2023, 10, 21), // 3 it 10,  pay 40 rest -30
      by: 'test'
    },
    //* Pay 40 faltan 70
    method: 'card',
    charged: 40,
    rest: -70,
    amount: 110,
    usdPrice: 16
  },
  {
    created: {
      at: new Date(2023, 10, 21), // 2 it 100,  pay 90 rest 10
      by: 'test'
    },
    //* Pay 90 faltan 110
    method: 'mxn',
    charged: 90,
    rest: -110,
    amount: 200,
    usdPrice: 16
  },
  {
    created: {
      at: new Date(2023, 10, 21), //  1 it 600,  pay 500 rest 100
      by: 'test'
    },
    //* Pay 400 dep, faltan 200
    method: 'deposit',
    charged: 400,
    rest: -200,
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
    rest: 300,
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
    rest: -200, // negative rest its means that the payment is incomplete, for that rest should not been considerate
    usdPrice: 20
  }
]

export const multiplePaymentsWithRetried: Payment[] = [
  //* In this case the amount 600mxn and user pay 200mxn , 500mxn and after a while make return of  -100mxn
  {
    created: {
      at: new Date(2023, 10, 21), // 4
      by: 'test'
    },
    method: 'mxn',
    amount: 0,
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
    rest: 100,
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
    rest: -400, // negative rest its means that the payment is incomplete, for that rest should not been considerate
    usdPrice: 16
  }
]

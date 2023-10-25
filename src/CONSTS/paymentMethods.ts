export const paymentMethods = [
  { type: 'mxn', label: 'Efectivo' },
  { type: 'card', label: 'Tarjeta' },
  { type: 'usd', label: 'Dolares' },
  { type: 'deposit', label: 'Deposito' }
] as const
export type PaymentMethods = (typeof paymentMethods)[number]['type']

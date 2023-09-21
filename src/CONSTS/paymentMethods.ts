export const paymentMethods = [
  { type: 'mxn', label: 'Efectivo' },
  { type: 'card', label: 'Tarjeta' },
  { type: 'usd', label: 'Dolares' }
] as const
export type PaymentMethods = (typeof paymentMethods)[number]['type']

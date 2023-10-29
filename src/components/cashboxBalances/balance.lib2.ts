import { PaymentMethodsTotals } from '@/types/balance'
import { Payment } from '@/types/order'

export function sum(a: number, b: number) {
  return a + b
}

export const calculateIncomesFromPayments = (
  payments: Partial<Payment>[]
): PaymentMethodsTotals => {
  const card = payments.reduce((p, c) => {
    if (c.method === 'card') return p + (c.charged || 0)
    return p
  }, 0)

  const mxn = payments.reduce((p, c) => {
    if (c.method === 'mxn') return p + (c.charged || 0)
    return p
  }, 0)

  const usd = payments.reduce((p, c) => {
    if (c.method === 'usd') return p + (c.charged || 0) * (c.usdPrice || 1)
    return p
  }, 0)

  const deposit = payments.reduce((p, c) => {
    if (c.method === 'deposit') return p + (c?.charged || 0)
    return p
  }, 0)

  return {
    total: card + mxn + usd + deposit,
    card,
    mxn,
    usd,
    deposit
  }
}

export const calculateOutcomesFromPayments = (payments: Partial<Payment>[]) => {
  const card = payments.reduce((p, c) => {
    if (c.method === 'card') return p - (c.rest || 0)
    return p
  }, 0)

  const mxn = payments.reduce((p, c) => {
    if (c.method === 'mxn') return p - (c.rest || 0)
    return p
  }, 0)

  const usd = payments.reduce((p, c) => {
    if (c.method === 'usd') return p - (c.rest || 0)
    return p
  }, 0)

  const deposit = payments.reduce((p, c) => {
    if (c.method === 'deposit') return p - (c?.rest || 0)
    return p
  }, 0)

  return {
    total: card + mxn + usd + deposit,
    card,
    mxn,
    usd,
    deposit
  }
}
export const calculateBalanceFromPayments = (payments: Partial<Payment>[]) => {
  const incomes = calculateIncomesFromPayments(payments)
  const outcomes = calculateOutcomesFromPayments(payments)
  console.log({ incomes, outcomes })
  return {
    total: incomes.total - outcomes.total,
    card: incomes.card - outcomes.card,
    mxn: incomes.mxn - outcomes.mxn,
    usd: incomes.usd - outcomes.usd,
    deposit: incomes.deposit - outcomes.deposit
  }
}

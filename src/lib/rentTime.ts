import { PriceType } from '@/components/PricesForm'

export type Ops = {
  inSeconds?: boolean
}

/**
 *
 * @param qty number quantity of units to rent
 * @param unit string unit of time to rent PriceType['unit']
 * @param ops.inSeconds boolean if in seconds, default false
 * @returns number count of minutes to rent
 */
const rentTime = (
  qty: number = 0,
  unit: PriceType['unit'] = 'minutes',
  ops?: Ops
): number => {
  if (!unit) {
    return 0
  }
  // @ts-ignore FIXME: t"El tipo 'string | undefined' no cumple la restricción 'string | number | symbol'. El tipo 'undefined' no se puede asignar al tipo 'string | number | symbol'"
  const factor: Record<PriceType['unit'], number> = {
    month: 30 * 24 * 60,
    week: 7 * 24 * 60,
    day: 24 * 60,
    hour: 60,
    minutes: 1
  }

  const seconds = ops?.inSeconds ? 60 : 1
  return qty * factor[unit] * seconds
}
export default rentTime

import { PriceType } from '@/components/PricesForm'
import asDate from '@/lib/asDate'
import asNumber from '@/lib/asNumber'
import rentTime from '@/lib/rentTime'
import { addMinutes } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

export const rentFinishAt = (
  startAt: Date | Timestamp | null,
  qty: number,
  unit: PriceType['unit']
): Date | null => calculateFinishRentDate(startAt, qty, unit) as Date

export const calculateFinishRentDate = (
  rentDate: Date | null | Timestamp,
  qty?: number | string,
  unit?: PriceType['unit']
): Date | null => {
  if (!rentDate) {
    return null
  }
  const date = asDate(rentDate)
  if (!date) return null

  const rentMinutes = rentTime(asNumber(qty), unit)
  return addMinutes(date, rentMinutes)
}

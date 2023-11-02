import { ItemRentStatus } from '@/context/useCompanyCashbox'
import { rentFinishAt } from '@/context/userCompaniesContext2'
import { Order } from '@/types/order'
import { isBefore } from 'date-fns'

export const orderStatus = (order?: Partial<Order>): ItemRentStatus => {
  const someItemAlreadyExpire = order?.items?.some((i) => {
    return (
      i.rentStatus === 'expired' ||
      (i.rentStatus === 'taken' &&
        isBefore(rentFinishAt(i.rentStartedAt, i.qty, i.unit), new Date()))
    )
  })
  if (someItemAlreadyExpire) return 'expired'
  const someItemIsPending = order?.items?.some(
    (i) => i.rentStatus === 'pending' || !i.rentStatus
  )
  if (someItemIsPending) return 'pending'
  const itemsInUse = order?.items?.every((i) => i.rentStatus === 'taken')
  if (itemsInUse) return 'taken'
  const itemsFinished = order?.items?.every((i) => i.rentStatus === 'finished')
  if (itemsFinished) return 'finished'
  return 'pending'
}

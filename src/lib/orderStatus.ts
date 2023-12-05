import { rentFinishAt } from '@/context/lib'
import { ItemRentStatus } from '@/context/useCompanyCashbox'
import { Order } from '@/types/order'
import { isBefore } from 'date-fns'

export const orderStatus = (order?: Partial<Order>): ItemRentStatus => {
  if (order?.status === 'canceled') return 'canceled'

  //* 1. if order is cancel return canceled
  //* 2. If some items already expire should return expired order
  //* 3. If some item is pending should return pending order
  //* 4. If all items are taken should return taken order
  //* 5. If all items are finished should return finished order
  //* 6. If items finishAt is before than now, should return expired
  //* 7. If some item is expired return expired

  const someItemAlreadyExpire = order?.items?.some((i) => {
    const startAt = i.rentStartedAt
    if (!startAt) return false
    const finishAt = rentFinishAt(startAt, i.qty || 0, i.unit)
    if (!finishAt) return false
    if (i.rentStatus === 'expired') return true
    if (isBefore(finishAt, new Date()) && i.rentStatus === 'taken') return true
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

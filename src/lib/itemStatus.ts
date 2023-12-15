import { ItemRentStatus } from '@/context/useCompanyCashbox'
import { Order } from '@/types/order'
import { rentFinishAt } from '@/context/lib'
import { isBefore } from 'date-fns'

export type ItemStatusProps = {
  companyOrders?: Partial<Order>[]
}
export const itemStatus = (
  itemId: string,
  { companyOrders }: ItemStatusProps
): { status: ItemRentStatus; order?: Partial<Order> | null } => {
  //* default item status should be pending
  //* if item is finished should be free
  //* if item is taken and is not expired should be taken
  //* if item is taken and is expired should be expired
  //* if item is expired should be expired
  //* if order is canceled and item is taken should be expired
  //* if order is canceled and item is pending should be free
  //* if itemsOrders are empty should be available

  let status: ItemRentStatus = 'pending'
  const itemOrders = companyOrders
    ?.filter((o) => o.items?.find((i) => i?.itemId === itemId))
    ?.map((o) => {
      return o.items?.map((i) => {
        i.order = o
        return i
      })
    })
    .flat()
  if (!itemOrders?.length) return { status: 'available', order: null }
  // const itemOrders = itemsOrders?.filter((i) => i?.itemId === itemId)

  const itemTaken = itemOrders?.find((i) => i?.rentStatus === 'taken')

  const itemFinished = itemOrders?.find((i) => i?.rentStatus === 'finished')
  //* Ite should show as expired if is expired or if rentFinishAt is before now
  const itemRentFinishAt: Date | null = itemTaken?.rentStartedAt
    ? rentFinishAt(
        itemTaken?.rentStartedAt,
        itemTaken?.qty || 0,
        itemTaken?.unit
      )
    : null

  const itemExpired = itemOrders?.find((i) => i?.rentStatus === 'expired')
  const itemAlreadyExpire =
    itemRentFinishAt && isBefore(itemRentFinishAt, new Date())

  const itemPending = itemOrders?.find((i) => i?.rentStatus === 'pending')

  const takenOrderCanceled = itemTaken?.order?.status === 'canceled'
  const itemPendingIsCanceled = itemPending?.order?.status === 'canceled'

  if (itemExpired || itemAlreadyExpire || takenOrderCanceled)
    return { status: 'expired', order: itemExpired?.order }

  if (itemPending && !itemPendingIsCanceled)
    return { status: 'pending', order: itemPending.order }
  if (itemTaken) return { status: 'taken', order: itemTaken.order }
  if (itemFinished || itemPendingIsCanceled)
    return { status: 'available', order: itemFinished?.order }
  return { status }
}

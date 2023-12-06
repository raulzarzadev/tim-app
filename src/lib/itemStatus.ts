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
): ItemRentStatus => {
  let status: ItemRentStatus = 'pending'
  const itemsOrders = companyOrders
    ?.map((o) => {
      return o.items?.map((i) => {
        //@ts-ignore
        i.order = o
        return i
      })
    })
    .flat()
  const itemOrders = itemsOrders?.filter((i) => i?.itemId === itemId)

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

  const itemAlreadyExpire = itemRentFinishAt
    ? isBefore(itemRentFinishAt, new Date())
    : false

  const itemExpired =
    itemOrders?.find((i) => i?.rentStatus === 'expired') || itemAlreadyExpire

  const itemPending = itemOrders?.find((i) => i?.rentStatus === 'pending')
  if (itemExpired) return 'expired'
  if (itemPending) return 'pending'
  if (itemTaken) return 'taken'
  if (itemFinished) return 'finished'
  return status
}

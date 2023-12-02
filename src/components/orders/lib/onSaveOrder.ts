import { ItemSelected } from '@/context/useCompanyCashbox'
import forceAsDate from '@/lib/forceAsDate'
import { CompanyType } from '@/types/company'
import { Order } from '@/types/order'
import { isBefore } from 'date-fns'

const onSaveOrder = async (
  order: Partial<Order>,

  {
    alreadyStart = false,
    shippingEnabled = false
  }: {
    alreadyStart?: boolean
    shippingEnabled?: boolean
  }
) => {
  try {
    if (!order?.client?.name) return 'no client name'
    if (!order?.items?.length) return 'no items'

    //* send log but don´t stop
    if (order?.shipping?.date && !shippingEnabled) {
      console.log('shipping not enabled')
    }
    //* Update items status and date about some terms

    const _items: Partial<ItemSelected>[] = order.items?.map((i) => {
      //* Order shipping empty, return items startedAt NOW
      // if (!order?.shipping) {
      //   i.rentStartedAt = new Date()
      //   return i
      // }
      //* if order shipping already start return order with items started At and status taken
      //* start rent if
      //* 1. order shipping don't have date
      //* 2. rentAlreadyStart is true
      //* 3. order shipping date is null
      if (!order?.shipping || alreadyStart || order?.shipping?.date === null) {
        i.rentStartedAt = order.shipping?.date || new Date()
        i.rentStatus = 'taken'
        return i
      }

      //* rentAlreadyStart is false  just return items as pending
      if (!alreadyStart) {
        i.rentStatus = 'pending'
        return i
      }
      return i
    })

    order.items = _items || []
    return order
  } catch (error) {
    console.error(error)
  }

  // console.log({ defaultOrder })
  // console.log({ order })
  // // return
  // const rentAlreadyStart =
  //   order.shipping?.date &&
  //   isBefore(forceAsDate(order.shipping?.date), new Date())
  // const updatingOrder = !!defaultOrder?.id

  // const items = order.items?.map((i) => {
  //   const defaultItem = defaultOrder?.items?.find(
  //     (d) => d?.itemId === i?.itemId
  //   )

  //   if (!updatingOrder) {
  //     if (rentAlreadyStart) i.rentStartedAt = forceAsDate(order.shipping?.date)
  //     //default rent status is pending
  //     i.rentStatus = 'pending'
  //     // if rent already start o shipping is enabled rent status is taken
  //     if (rentAlreadyStart || currentCompany?.shippingEnabled) {
  //       i.rentStatus = 'taken'
  //     } else {
  //       i.rentStatus = 'pending'
  //     }
  //   }

  //   if (!currentCompany?.shippingEnabled) {
  //     i.rentStatus = 'taken'
  //     i.rentStartedAt = new Date()
  //   }

  //   if (!order.shipping || rentAlreadyStart) {
  //     i.rentStatus = 'taken'
  //     i.rentStartedAt = new Date()
  //   }

  //   if (!rentAlreadyStart) {
  //     i.rentStatus = 'pending'
  //   }

  //   return {
  //     ...defaultItem,
  //     ...i
  //   }
  // })
  // // console.log({ items })
  // console.log({
  //   ...order,
  //   items
  // })
  //try {
  // setSaving(true)
  //  clientForm.onClose()
  // shippingForm.onClose()
  // itemsForm.onClose()
  // const res = await handleSave?.({ ...order, items })
  //@ts-ignore
  // if (res?.ok) {
  //   //@ts-ignore
  //   const orderId = res?.res?.id || ''
  //   // setOrder({ ...order, items, id: orderId })
  // }
  //  return res
  // } catch (e) {
  //   console.error(e)
  // } finally {
  //   setTimeout(() => {
  //     // setSaving(false)
  //   }, 1000)
  // }
}

export default onSaveOrder

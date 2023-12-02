// import { isBefore } from "date-fns"
// import forceAsDate from "./forceAsDate"
// import { Order } from "@/types/order"

//  const handleSaveOrder = async (order: Partial<Order>) => {
//   // console.log({ defaultOrder })
//   // console.log({ order })
//   // return
//   const rentAlreadyStart =
//     order.shipping?.date &&
//     isBefore(forceAsDate(order.shipping?.date), new Date())
//   const updatingOrder = !!defaultOrder?.id

//   const items = order.items?.map((i) => {
//     const defaultItem = defaultOrder?.items?.find(
//       (d) => d?.itemId === i?.itemId
//     )

//     if (!updatingOrder) {
//       if (rentAlreadyStart)
//         i.rentStartedAt = forceAsDate(order.shipping?.date)
//       //default rent status is pending
//       i.rentStatus = 'pending'
//       // if rent already start o shipping is enabled rent status is taken
//       if (rentAlreadyStart || currentCompany?.shippingEnabled) {
//         i.rentStatus = 'taken'
//       } else {
//         i.rentStatus = 'pending'
//       }
//     }

//     if (!currentCompany?.shippingEnabled) {
//       i.rentStatus = 'taken'
//       i.rentStartedAt = new Date()
//     }

//     if (!order.shipping || rentAlreadyStart) {
//       i.rentStatus = 'taken'
//       i.rentStartedAt = new Date()
//     }

//     if (!rentAlreadyStart) {
//       i.rentStatus = 'pending'
//     }

//     return {
//       ...defaultItem,
//       ...i
//     }
//     return {
//       ...i,
//       rentStatus: rentAlreadyStart
//         ? 'taken'
//         : ('pending' as ItemSelected['rentStatus'])
//     }
//   })
//   console.log({ items })

//   try {
//     setSaving(true)
//     clientForm.onClose()
//     shippingForm.onClose()
//     itemsForm.onClose()
//     const res = await handleSave?.({ ...order, items })
//     //@ts-ignore
//     if (res?.ok) {
//       //@ts-ignore
//       const orderId = res?.res?.id || ''
//       setOrder({ ...order, items, id: orderId })
//     }
//     return res
//   } catch (e) {
//     console.error(e)
//   } finally {
//     setTimeout(() => {
//       setSaving(false)
//     }, 1000)
//   }
// }

// export default handleSaveOrder

import { storage } from './auth'
import { FirebaseCRUD } from './firebase.CRUD'
import { db } from './main'
import { BaseType } from '@/types/base'
import { arrayUnion, where } from 'firebase/firestore'
import { ArticleType } from '@/types/article'
import { Order, OrderBase, Payment } from '@/types/order'
import { v4 as uidGenerator } from 'uuid'
/*
 * You should be able to copy all this file and just replace
 * ItemType
 * NewItemType
 * CollectionName
 * And the name of the functions
 */

const COLLECTION_NAME = 'orders'
type ItemType = Order
type NewItem = Partial<OrderBase>
type CreateItem = Partial<OrderBase>
export type CreateOrder = Partial<OrderBase>
export const itemCRUD = new FirebaseCRUD(COLLECTION_NAME, db, storage)

export const setOrder = async (itemId: ItemType['id'], newItem: NewItem) =>
  await itemCRUD.setItem(itemId || '', { ...newItem, id: itemId })

export const createOrder = async (newItem: CreateItem) =>
  await itemCRUD.createItem({ ...newItem })

export const updateOrder = async (itemId: string, updates: NewItem) =>
  await itemCRUD.updateItem(itemId, updates)

export const deleteOrder = async (itemId: BaseType['id']) =>
  await itemCRUD.deleteItem(itemId)

export const getOrder = async (itemId: BaseType['id']) =>
  await itemCRUD.getItem(itemId)

export const listenCompanyActiveOrders = async (
  companyId: string,
  cb: CallableFunction
) =>
  await itemCRUD.listenItems(
    [where('companyId', '==', companyId), where('active', '==', true)],
    cb
  )
export const listenCompanyOrders = async (
  companyId: string,
  cb: CallableFunction
) => await itemCRUD.listenItems([where('companyId', '==', companyId)], cb)

export const finishItemRent = async (
  OrderId?: Order['id'],
  itemId?: ArticleType['id']
) => {
  if (!OrderId || !itemId) return
  const Order: Order = await itemCRUD.getItem(OrderId)
  const items = Order?.items
  const oldItem = items.find((item) => item.itemId === itemId)
  const removedItem = items.filter((item) => item.itemId !== itemId)
  return await updateOrder(OrderId, {
    items: [...removedItem, { ...oldItem, inUse: false }]
  })
}

export const cancelFinishRent = async (
  OrderId?: Order['id'],
  itemId?: ArticleType['id']
) => {
  if (!OrderId || !itemId) return
  const Order: Order = await itemCRUD.getItem(OrderId)
  const items = Order?.items
  const oldItem = items.find((item) => item.itemId === itemId)
  const removedItem = items.filter((item) => item.itemId !== itemId)
  return await updateOrder(OrderId, {
    items: [...removedItem, { ...oldItem, inUse: true }]
  })
}

export const changeItem = async (
  OrderId: ArticleType['id'],
  newChange: ItemType['changes'][number]
) => {
  const Order: Order = await itemCRUD.getItem(OrderId)
  const items = Order?.items

  const removedItem = items.filter(
    (item) => item.itemId !== newChange.oldItemId
  )
  const newItem = {
    itemId: newChange.newItemId,
    inUse: true,
    qty: newChange.newPrice?.quantity,
    unit: newChange.newPrice?.unit
  }
  return await updateOrder(OrderId, {
    items: [...removedItem, newItem],
    // @ts-ignore FIXME: Typescript error with arrayUnion
    changes: arrayUnion(newChange)
  })
}

export const onPayOrder = async (
  orderId: Order['id'],
  payment: Partial<Payment>
) => {
  return await updateOrder(orderId, {
    // @ts-ignore FIXME: array union error FieldValue
    payments: arrayUnion({ ...payment, id: uidGenerator() })
  })
}

import { CreatePayment, Payment, PaymentChange } from '@/types/payment'
import { storage } from './auth'
import { FirebaseCRUD } from './firebase.CRUD'
import { db } from './main'
import { BaseType } from '@/types/base'
import { arrayUnion, where } from 'firebase/firestore'
import { ArticleType } from '@/types/article'

/*
 * You should be able to copy all this file and just replace
 * ItemType
 * NewItemType
 * CollectionName
 * And the name of the functions
 */

const COLLECTION_NAME = 'payments'
type ItemType = Payment
type NewItem = Partial<ItemType>

export const itemCRUD = new FirebaseCRUD(COLLECTION_NAME, db, storage)

export const setPayment = async (itemId: ItemType['id'], newItem: NewItem) =>
  await itemCRUD.setItem(itemId || '', { ...newItem, id: itemId })

export const createPayment = async (newItem: CreatePayment) =>
  await itemCRUD.createItem({ ...newItem })

export const updatePayment = async (itemId: string, updates: NewItem) =>
  await itemCRUD.updateItem(itemId, updates)

export const deletePayment = async (itemId: BaseType['id']) =>
  await itemCRUD.deleteItem(itemId)

export const getPayment = async (itemId: BaseType['id']) =>
  await itemCRUD.getItem(itemId)

export const listenCompanyActivePayments = async (
  companyId: string,
  cb: CallableFunction
) =>
  await itemCRUD.listenItems(
    [where('companyId', '==', companyId), where('active', '==', true)],
    cb
  )
export const listenCompanyPayments = async (
  companyId: string,
  cb: CallableFunction
) => await itemCRUD.listenItems([where('companyId', '==', companyId)], cb)

export const finishItemRent = async (
  paymentId?: Payment['id'],
  itemId?: ArticleType['id']
) => {
  if (!paymentId || !itemId) return
  const payment: Payment = await itemCRUD.getItem(paymentId)
  const items = payment?.items
  const oldItem = items.find((item) => item.itemId === itemId)
  const removedItem = items.filter((item) => item.itemId !== itemId)
  return await updatePayment(paymentId, {
    items: [...removedItem, { ...oldItem, inUse: false }]
  })
}

export const cancelFinishRent = async (
  paymentId?: Payment['id'],
  itemId?: ArticleType['id']
) => {
  if (!paymentId || !itemId) return
  const payment: Payment = await itemCRUD.getItem(paymentId)
  const items = payment?.items
  const oldItem = items.find((item) => item.itemId === itemId)
  const removedItem = items.filter((item) => item.itemId !== itemId)
  return await updatePayment(paymentId, {
    items: [...removedItem, { ...oldItem, inUse: true }]
  })
}

export const changeItem = async (
  paymentId: ArticleType['id'],
  newChange: PaymentChange
) => {
  const payment: Payment = await itemCRUD.getItem(paymentId)
  const items = payment?.items

  const removedItem = items.filter(
    (item) => item.itemId !== newChange.oldItemId
  )
  const newItem = {
    itemId: newChange.newItemId,
    inUse: true,
    qty: newChange.newPrice?.quantity,
    unit: newChange.newPrice?.unit
  }
  return await updatePayment(paymentId, {
    items: [...removedItem, newItem],
    // @ts-ignore FIXME: Typescript error with arrayUnion
    changes: arrayUnion(newChange)
  })
}

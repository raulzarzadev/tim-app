import { Payment } from '@/types/payment'
import { storage } from './auth'
import { FirebaseCRUD } from './firebase.CRUD'
import { db } from './main'
import { BaseType } from '@/types/base'
import { orderBy, where } from 'firebase/firestore'

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
type CreatePayment_DTO = Pick<
  ItemType,
  'items' | 'companyId' | 'payment' | 'startAt'
>
export const itemCRUD = new FirebaseCRUD(COLLECTION_NAME, db, storage)

export const setPayment = async (itemId: ItemType['id'], newItem: NewItem) =>
  await itemCRUD.setItem(itemId || '', { ...newItem, id: itemId })

export const createPayment = async (newItem: CreatePayment_DTO) =>
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
) => await itemCRUD.listenItems([where('companyId', '==', companyId)], cb)
// export const listenPayment = async (
//   itemId: BaseType['id'],
//   cb: CallableFunction
// ) => await itemCRUD.listenItem(itemId, cb)

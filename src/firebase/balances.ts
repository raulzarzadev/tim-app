import { storage } from './auth'
import { FirebaseCRUD } from './firebase.CRUD'
import { db } from './main'
import { BaseType } from '@/types/base'
import { where } from 'firebase/firestore'
import { BalanceType } from '@/types/balance'
/*
 * You should be able to copy all this file and just replace
 * ItemType
 * NewItemType
 * CollectionName
 * And the name of the functions
 */

const COLLECTION_NAME = 'balances'
type ItemType = BalanceType
type NewItem = Partial<BalanceType>
type CreateItem = Omit<BalanceType, 'id' | 'created' | 'updated'> & {
  companyId: string
}
export type CreateBalance = CreateItem

export const itemCRUD = new FirebaseCRUD(COLLECTION_NAME, db, storage)

export const setBalance = async (itemId: ItemType['id'], newItem: NewItem) =>
  await itemCRUD.setItem(itemId || '', { ...newItem, id: itemId })

export const createBalance = async (newItem: CreateItem) =>
  await itemCRUD.createItem({ ...newItem })

export const updateBalance = async (itemId: string, updates: NewItem) =>
  await itemCRUD.updateItem(itemId, updates)

export const deleteBalance = async (itemId: BaseType['id']) =>
  await itemCRUD.deleteItem(itemId)

export const listenCompanyBalances = async (
  companyId: string,
  cb: CallableFunction
) => await itemCRUD.listenItems([where('companyId', '==', companyId)], cb)

import { where } from 'firebase/firestore'
import { storage } from './auth'
import { FirebaseCRUD } from './firebase.CRUD'
import { db } from './main'
import { BaseType } from '@/types/base'
import { ArticleType } from '@/types/article'

/*
 * You should be able to copy all this file and just replace
 * ItemType
 * NewItemType
 * CollectionName
 * And the name of the functions
 */

const COLLECTION_NAME = 'items'
type ItemType = ArticleType
type NewItem = Partial<ArticleType>

export const itemCRUD = new FirebaseCRUD(COLLECTION_NAME, db, storage)

export const setItem = async (itemId: ItemType['id'], newItem: NewItem) =>
  await itemCRUD.setItem(itemId || '', { ...newItem, id: itemId })

export const createItem = async (newItem: NewItem) =>
  await itemCRUD.createItem(newItem)

export const updateItem = async (
  itemId: string,
  updates: Partial<ItemType> | NewItem
) => await itemCRUD.updateItem(itemId, updates)

export const deleteItem = async (itemId: BaseType['id']) =>
  await itemCRUD.deleteItem(itemId)

export const getItem = async (itemId: BaseType['id']) =>
  await itemCRUD.getItem(itemId)

export const listenItem = async (
  itemId: BaseType['id'],
  cb: CallableFunction
) => await itemCRUD.listenItem(itemId, cb)

export const getVisibleItems = async () => {
  return await itemCRUD.getItems([where('storeVisible', '==', true)])
}
export const listenCompanyItems = async (
  companyId: string,
  cb: CallableFunction
) => await itemCRUD.listenItems([where('companyId', '==', companyId)], cb)

export const getCompanyMarketItems = async (companyId: string) => {
  return await itemCRUD.getItems([
    where('companyId', '==', companyId),
    where('storeVisible', '==', true)
  ])
}

export const getCompanyItems = async (companyId: string) => {
  return await itemCRUD.getItems([where('companyId', '==', companyId)])
}

export const deleteCompanyItems = async (companyId: string) => {
  const companyItems = await getCompanyItems(companyId)
  const promises = companyItems.map(async (item) => await deleteItem(item.id))
  return await Promise.all(promises)
}

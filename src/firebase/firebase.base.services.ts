import { CategoryType } from '@/types/category'
import { storage } from './auth'
import { FirebaseCRUD } from './firebase.CRUD'
import { db } from './main'
/*
 * You should be able to copy all this file and just replace
 * ItemType
 * NewItemType
 * CollectionName
 * And the name of the functions
 */

const COLLECTION_NAME = 'categories' //*<----- Change this to the correct collection
type ItemType = CategoryType //*<----- Change this to the correct type

type CreateItem = Partial<ItemType>
export const itemCRUD = new FirebaseCRUD(COLLECTION_NAME, db, storage)

export const setService = async (itemId: ItemType['id'], newItem: CreateItem) =>
  await itemCRUD.setItem(itemId || '', { ...newItem, id: itemId })

export const createService = async (newItem: CreateItem) =>
  await itemCRUD.createItem({ ...newItem })

export const updateService = async (itemId: string, updates: CreateItem) =>
  await itemCRUD.updateItem(itemId, updates)

export const deleteService = async (itemId: ItemType['id']) =>
  await itemCRUD.deleteItem(itemId || '')

export const getService = async (itemId: ItemType['id']) =>
  await itemCRUD.getItem(itemId || '')

import { where } from 'firebase/firestore'
import { storage } from './auth'
import { FirebaseCRUD } from './firebase.CRUD'
import { db } from './main'
import { BaseType } from '@/types/base'
import { CompanyType } from '@/types/company'

/*
 * You should be able to copy all this file and just replace
 * ItemType
 * NewItemType
 * CollectionName
 * And the name of the functions
 */

const COLLECTION_NAME = 'companies'
type ItemType = CompanyType
type NewItem = Partial<CompanyType>
type CreateCompany_DTO = Pick<CompanyType, 'name' | 'userId' | 'staff'>
export const itemCRUD = new FirebaseCRUD(COLLECTION_NAME, db, storage)

export const setCompany = async (itemId: ItemType['id'], newItem: NewItem) =>
  await itemCRUD.setItem(itemId || '', { ...newItem, id: itemId })

export const createCompany = async (newItem: CreateCompany_DTO) =>
  await itemCRUD.createItem({ ...newItem })

export const updateCompany = async (itemId: string, updates: NewItem) =>
  await itemCRUD.updateItem(itemId, updates)

export const deleteCompany = async (itemId: BaseType['id']) =>
  await itemCRUD.deleteItem(itemId)

export const getCompany = async (itemId: BaseType['id']) =>
  await itemCRUD.getItem(itemId)

export const listenCompany = async (
  itemId: BaseType['id'],
  cb: CallableFunction
) => await itemCRUD.listenItem(itemId, cb)

export const getUserCompanies = async ({ userId }: { userId: string }) => {
  return await itemCRUD.getUserItems([where('userId', '==', userId)])
}

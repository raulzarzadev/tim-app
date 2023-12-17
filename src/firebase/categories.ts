import { arrayRemove, arrayUnion, where } from 'firebase/firestore'
import { getCompany, updateCompany } from './companies'
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

export const setCategoryShop = async (
  itemId: ItemType['id'],
  newItem: CreateItem
) => await itemCRUD.setItem(itemId || '', { ...newItem, id: itemId })

export const createCategoryShop = async (newItem: CreateItem) =>
  await itemCRUD.createItem({ ...newItem })

export const updateCategoryShop = async (itemId: string, updates: CreateItem) =>
  await itemCRUD.updateItem(itemId, updates)

export const deleteCategoryShop = async (itemId: ItemType['id']) =>
  await itemCRUD.deleteItem(itemId || '')

export const getCategoryShop = async (itemId: ItemType['id']) =>
  await itemCRUD.getItem(itemId || '')

export const listenCompanyCategoriesShop = async (
  companyId: string,
  callback: (categories: CategoryType[]) => void
) => {
  return await itemCRUD.listenItems(
    [where('companyId', '==', companyId)],
    callback
  )
}
//** <----- Functions to use in company categories inside company** */

export const addCategory = async (
  companyId: string,
  category: Partial<CategoryType>
) => {
  return await updateCompany(companyId, {
    // @ts-ignore FIXME: Type 'CategoryType' is not assignable to type 'CategoryType'.
    categories: arrayUnion(category)
  })
}

export const removeCategory = async (
  companyId: string,
  categoryName: string
) => {
  const { categories } = await getCompany(companyId)
  const category = categories.find(
    (c: { name: string }) => c.name === categoryName
  )
  return await updateCompany(companyId, {
    // @ts-ignore FIXME: Type 'CategoryType' is not assignable to type 'CategoryType'.

    categories: arrayRemove(category)
  })
}

export const updateCategory = async (
  companyId: string,
  categoryName: string,
  updates: Partial<CategoryType>
) => {
  const { categories } = await getCompany(companyId)
  const category = categories.find(
    (c: { name: string }) => c.name === categoryName
  )
  await updateCompany(companyId, {
    // @ts-ignore FIXME: Type 'CategoryType' is not assignable to type 'CategoryType'.

    categories: arrayRemove(category)
  })
  await updateCompany(companyId, {
    // @ts-ignore FIXME: Type 'CategoryType' is not assignable to type 'CategoryType'.

    categories: arrayUnion(updates)
  })
}

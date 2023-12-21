import { where } from 'firebase/firestore'
import { auth, storage } from './auth'
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
type CreateCompany_DTO = Pick<
  CompanyType,
  'name' | 'userId' | 'staff' | 'staffMails'
>
export const itemCRUD = new FirebaseCRUD(COLLECTION_NAME, db, storage)

export const setCompany = async (itemId: ItemType['id'], newItem: NewItem) =>
  await itemCRUD.setItem(itemId || '', { ...newItem, id: itemId })

export const createCompany = async (newItem: CreateCompany_DTO) =>
  await itemCRUD.createItem({ ...newItem })

export const createShop = async (
  newItem: Pick<CompanyType, 'name' | 'phone'> & {
    principalContact?: string
    phone?: string
    address?: string
    email?: string
  }
) => {
  const userId = auth.currentUser?.uid
  //@ts-ignore
  newItem.userId = userId || ''
  return await itemCRUD.createItem(newItem)
}

export const updateCompany = async (itemId: string, updates: NewItem) =>
  await itemCRUD.updateItem(itemId, updates)

export const deleteCompany = async (itemId: BaseType['id']) => {
  return await itemCRUD.deleteItem(itemId)
}

export const getCompany = async (itemId: BaseType['id']) =>
  await itemCRUD.getItem(itemId)

export const getVisibleCompanies = async () =>
  await itemCRUD.getItems([
    //**
    //where('visible', '==', true)
  ])

export const findCompanyByName = async (companyName: string) =>
  await itemCRUD.getItems([where('name', '==', companyName)])

export const listenCompany = async (
  itemId: BaseType['id'],
  cb: CallableFunction
) => await itemCRUD.listenItem(itemId, cb)

export const getUserCompanies = async ({ userId }: { userId: string }) => {
  return await itemCRUD.getUserItems([where('userId', '==', userId)])
}

export const getCompanyAsStaff = async ({
  userEmail
}: {
  userEmail: string
}) => {
  return await itemCRUD.getUserItems([
    where('staffMails', 'array-contains', userEmail)
  ])
}

export const listenUserCompanies = async (
  userId: string,
  cb: CallableFunction
) => {
  await itemCRUD.listenItems([where('userId', '==', userId)], cb)
}

export const listenStaffCompanies = async (
  email: string,
  cb: CallableFunction
) => {
  await itemCRUD.listenItems([where('staffMails', 'array-contains', email)], cb)
}

export const getCurrentFolioShop = async (companyId: string) => {
  const company = await getCompany(companyId)
  return company?.currentFolio || 0
}

export const listenCompanies = async (cb: CallableFunction) => {
  await itemCRUD.listenItems([], cb)
}

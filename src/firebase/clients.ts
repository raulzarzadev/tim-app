import { where } from 'firebase/firestore'
import { storage } from './auth'
import { FirebaseCRUD } from './firebase.CRUD'
import { db } from './main'
import { BaseType } from '@/types/base'
import { NewClient } from '@/types/user'

/*
 * You should be able to copy all this file and just replace
 * ItemType
 * NewItemType
 * CollectionName
 * And the name of the functions
 */

const COLLECTION_NAME = 'clients'
type ItemType = NewClient
type NewItem = Partial<NewClient>

export const itemCRUD = new FirebaseCRUD(COLLECTION_NAME, db, storage)

export const setClient = async (itemId: ItemType['id'], newItem: NewItem) =>
  await itemCRUD.setItem(itemId || '', { ...newItem, id: itemId })

export const createClient = async (newItem: NewItem) =>
  await itemCRUD.createItem({ ...newItem })

export const updateClient = async (
  itemId: string,
  updates: Partial<ItemType> | NewItem
) => await itemCRUD.updateItem(itemId, updates)

export const deleteClient = async (itemId: BaseType['id']) =>
  await itemCRUD.deleteItem(itemId)

export const getClient = async (itemId: BaseType['id']) =>
  await itemCRUD.getItem(itemId)

export const listenClient = async (
  itemId: BaseType['id'],
  cb: CallableFunction
) => await itemCRUD.listenItem(itemId, cb)

export const listenClients = async (cb: CallableFunction) =>
  await itemCRUD.listenItems([where('rol', '==', 'CLIENT')], cb)

export const cancelClientPayment = async ({ clientId }: { clientId: string }) =>
  await itemCRUD.updateItem(clientId, { 'payment.isCancelled': true })

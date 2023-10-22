import { storage } from './auth'
import { FirebaseCRUD } from './firebase.CRUD'
import { db } from './main'
import { BaseType } from '@/types/base'
import { arrayRemove, arrayUnion, where } from 'firebase/firestore'
import { ArticleType } from '@/types/article'
import { v4 as uidGenerator } from 'uuid'
import { ItemSelected } from '@/context/useCompanyCashbox'
import { Service, ServiceBase, ServiceComment } from '@/types/service'
import { getAuth } from 'firebase/auth'
/*
 * You should be able to copy all this file and just replace
 * ItemType
 * NewItemType
 * CollectionName
 * And the name of the functions
 */

const COLLECTION_NAME = 'services'
type ItemType = Service
type NewItem = Partial<ServiceBase>
type CreateItem = Partial<ServiceBase>
export type CreateService = Partial<ServiceBase>
export const itemCRUD = new FirebaseCRUD(COLLECTION_NAME, db, storage)

export const setService = async (itemId: ItemType['id'], newItem: NewItem) =>
  await itemCRUD.setItem(itemId || '', { ...newItem, id: itemId })

export const createService = async (newItem: CreateItem) =>
  await itemCRUD.createItem({ ...newItem })

export const updateService = async (itemId: string, updates: NewItem) =>
  await itemCRUD.updateItem(itemId, updates)

export const deleteService = async (itemId: BaseType['id']) =>
  await itemCRUD.deleteItem(itemId)

export const getService = async (itemId: BaseType['id']) =>
  await itemCRUD.getItem(itemId)

export const listenCompanyActiveServices = async (
  companyId: string,
  cb: CallableFunction
) =>
  await itemCRUD.listenItems(
    [where('companyId', '==', companyId), where('active', '==', true)],
    cb
  )
export const listenCompanyServices = async (
  companyId: string,
  cb: CallableFunction
) => await itemCRUD.listenItems([where('companyId', '==', companyId)], cb)

export const addServiceComment = async (
  itemId: ItemType['id'],
  comment: ServiceComment
) => {
  const user = getAuth().currentUser

  return await itemCRUD.updateItem(itemId, {
    comments: arrayUnion({
      id: uidGenerator(),
      content: comment.content || '',
      date: new Date(),
      images: comment.images || [],
      createdBy: user?.email
    })
  })
}
// export const removeComment = async (
//   itemId: ItemType['id'],
//   commentId: ServiceComment['id']
// ) => {
//   const service = await getService(itemId)
//   const comment = service.comments?.find(
//     (comment: ServiceComment) => comment.id === commentId
//   )
//   return await itemCRUD.updateItem(itemId, {
//     comments: arrayRemove(comment)
//   })
// }

// export const finishItemRent = async (
//   ServiceId?: Service['id'],
//   itemId?: ArticleType['id']
// ) => {
//   if (!ServiceId || !itemId) return
//   const Service: Service = await itemCRUD.getItem(ServiceId)
//   const items = Service?.items
//   const oldItem = items.find((item) => item.itemId === itemId)
//   const removedItem = items.filter((item) => item.itemId !== itemId)
//   return await updateService(ServiceId, {
//     items: [
//       ...removedItem,
//       {
//         ...oldItem,
//         inUse: false,
//         rentStatus: 'finished',
//         rentFinishedAt: new Date()
//       }
//     ]
//   })
// }

// export const startItemRent = async (
//   ServiceId?: Service['id'],
//   itemId?: ArticleType['id']
// ) => {
//   if (!ServiceId || !itemId) return
//   const Service: Service = await itemCRUD.getItem(ServiceId)
//   const items = Service?.items
//   const oldItem = items.find((item) => item.itemId === itemId)
//   const removedItem = items.filter((item) => item.itemId !== itemId)
//   return await updateService(ServiceId, {
//     shipping: {
//       ...Service.shipping,
//       date: new Date()
//     },
//     items: [...removedItem, { ...oldItem, inUse: true, rentStatus: 'taken' }]
//   })
// }

// export const finishServiceRent = async (ServiceId?: Service['id']) => {
//   if (!ServiceId) return
//   const Service: Service = await itemCRUD.getItem(ServiceId)
//   const items = Service?.items
//   const newItems: Service['items'] = items.map((item) => ({
//     ...item,
//     inUse: false,
//     rentStatus: 'finished'
//   }))
//   return await updateService(ServiceId, {
//     items: newItems
//   })
// }

// export const startServiceRent = async (ServiceId?: Service['id']) => {
//   if (!ServiceId) return
//   const Service: Service = await itemCRUD.getItem(ServiceId)
//   const items = Service?.items
//   const newItems: Service['items'] = items.map((item) => ({
//     ...item,
//     inUse: true,
//     rentStatus: 'taken'
//   }))
//   return await updateService(ServiceId, {
//     shipping: {
//       ...Service.shipping,
//       date: new Date()
//     },
//     items: newItems
//   })
// }

// export const changeItem = async (
//   ServiceId: ArticleType['id'],
//   newChange: ItemType['changes'][number]
// ) => {
//   const Service: Service = await itemCRUD.getItem(ServiceId)
//   const items = Service?.items

//   const removedItem = items.filter(
//     (item) => item.itemId !== newChange.oldItemId
//   )
//   const newItem: ItemSelected = {
//     itemId: newChange.newItemId,
//     inUse: true,
//     qty: newChange.newPrice?.quantity,
//     unit: newChange.newPrice?.unit,
//     rentStatus: 'taken'
//   }
//   return await updateService(ServiceId, {
//     items: [...removedItem, newItem],
//     // @ts-ignore FIXME: Typescript error with arrayUnion
//     changes: arrayUnion(newChange)
//   })
// }

// export const resumeRent = async ({
//   ServiceId,
//   itemId
// }: {
//   ServiceId: string
//   itemId: string
// }) => {
//   if (!ServiceId || !itemId) return
//   const Service: Service = await itemCRUD.getItem(ServiceId)
//   const items = Service?.items
//   const oldItem = items.find((item) => item.itemId === itemId)
//   const removedItem = items.filter((item) => item.itemId !== itemId)
//   return await updateService(ServiceId, {
//     items: [...removedItem, { ...oldItem, inUse: true, rentStatus: 'taken' }]
//   })
// }

// export const onPayService = async (
//   ServiceId: Service['id'],
//   payment: Partial<Payment>
// ) => {
//   return await updateService(ServiceId, {
//     // @ts-ignore FIXME: array union error FieldValue
//     payments: arrayUnion({ ...payment, id: uidGenerator(), date: new Date() })
//   })
// }

import { storage } from './auth'
import { FirebaseCRUD } from './firebase.CRUD'
import { db } from './main'
import { BaseType } from '@/types/base'
import { where } from 'firebase/firestore'
import { Comment, CreateComment } from '@/types/comment'
/*
 * You should be able to copy all this file and just replace
 * ItemType
 * NewItemType
 * CollectionName
 * And the name of the functions
 */

const COLLECTION_NAME = 'comments'
type ItemType = Comment
type CreateItem = CreateComment

export const itemCRUD = new FirebaseCRUD(COLLECTION_NAME, db, storage)

export const setComment = async (
  itemId: ItemType['id'],
  newItem: CreateItem
) => {
  return await itemCRUD.setItem(itemId || '', { ...newItem, id: itemId })
}

export const createComment = async (newItem: CreateItem) =>
  await itemCRUD.createItem(newItem)

export const updateComment = async (itemId: string, updates: CreateComment) =>
  await itemCRUD.updateItem(itemId, updates)

export const deleteComment = async (itemId: BaseType['id']) =>
  await itemCRUD.deleteItem(itemId)

export const getComment = async (itemId: BaseType['id']) =>
  await itemCRUD.getItem(itemId)

export const listenClientComments = async (
  clientId: string,
  cb: CallableFunction
) =>
  await itemCRUD.listenItems(
    [where('clientId', '==', clientId), where('type', '==', 'client')],
    cb
  )

// export const listenCompanyActiveComments = async (
//   companyId: string,
//   cb: CallableFunction
// ) =>
//   await itemCRUD.listenItems(
//     [where('companyId', '==', companyId), where('active', '==', true)],
//     cb
//   )
// export const listenCompanyComments = async (
//   companyId: string,
//   cb: CallableFunction
// ) => await itemCRUD.listenItems([where('companyId', '==', companyId)], cb)

// export const addCommentComment = async (
//   itemId: ItemType['id'],
//   comment: CommentComment
// ) => {
//   const user = getAuth().currentUser

//   return await itemCRUD.updateItem(itemId, {
//     comments: arrayUnion({
//       id: uidGenerator(),
//       content: comment.content || '',
//       date: new Date(),
//       images: comment.images || [],
//       createdBy: user?.email
//     })
//   })
// }

// export const listenItemComments = async (
//   itemId: ItemType['id'],
//   cb: CallableFunction
// ) => await itemCRUD.listenItems([where('itemId', '==', itemId)], cb)

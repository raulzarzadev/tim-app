import { NewClient, UserType } from '@/types/user'
import { usersCRUD } from './auth'
import { where } from 'firebase/firestore'
import { BaseType } from '@/types/base'
import { USER_ROL } from '@/CONST/user'

export const setUser = async (
  userId: BaseType['id'],
  newUser: Pick<UserType, 'email' | 'name' | 'image' | 'rol'>
) => await usersCRUD.setItem(userId, { ...newUser, id: userId })

export const createUser = async (
  newUser: Pick<UserType, 'email' | 'name' | 'image' | 'rol'>
) => await usersCRUD.createItem({ ...newUser })

export const updateUser = async (
  userId: string,
  updates: Partial<UserType> | Partial<NewClient>
) => await usersCRUD.updateItem(userId, updates)

export const deleteUser = async (userId: BaseType['id']) =>
  await usersCRUD.deleteItem(userId)

export const getUser = async (userId: BaseType['id']) =>
  await usersCRUD.getItem(userId)

export const listenUser = async (
  userId: BaseType['id'],
  cb: CallableFunction
) => await usersCRUD.listenItem(userId, cb)

export const listenCollaborators = async (cb: CallableFunction) =>
  await usersCRUD.listenItems(
    [
      where('rol', 'in', [
        USER_ROL.COLLABORATOR,
        USER_ROL.COORDINATOR,
        USER_ROL.ADMIN,
        USER_ROL.CLIENT
      ])
    ],
    cb
  )

export async function findUserByEmail({ email }: { email: string }) {
  const formatFoundUser = (
    user: UserType
  ): Pick<UserType, 'name' | 'email' | 'id'> => {
    return {
      name: user?.name,
      email: user?.email,
      id: user?.id
    }
  }
  return await usersCRUD.getItems([where('email', '==', email)]).then((res) => {
    if (res?.length) return formatFoundUser(res[0])
    return null
  })
}

export const listenAppUsers = (cb: CallableFunction) => {
  return usersCRUD.listenItems([], cb)
}

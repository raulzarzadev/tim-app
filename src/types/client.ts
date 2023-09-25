import { UserType } from './user'

export type Client = Omit<UserType, 'rol'> & {
  imageID: string
  signature: string
  address: string
}

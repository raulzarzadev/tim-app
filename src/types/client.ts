import { UserType } from './user'

export type ClientBase = Pick<
  UserType,
  'name' | 'image' | 'email' | 'phone'
> & {
  imageID: string
  signature: string
  address: string
  companyId: string
}

import { BaseType } from './base'
import { UserBase } from './user'

export type Client = ClientBase & BaseType

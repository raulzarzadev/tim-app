import { BaseType } from './base'

export type ClientBase = {
  companyId: string
  name: string
  email?: string
  phone?: string
  address?: string
  image?: string
}

export type Client = ClientBase & BaseType

import { ArticleType } from './article'
import { BaseType } from './base'
import { CategoryType } from './category'
import { Client } from './client'
import { Order } from './order'
import { StaffType } from './staff'
import { UserType } from './user'

export type CompanyBase = {
  name: string
  userId: UserType['id']
  description: string
  categories?: CategoryType[]
  articles?: ArticleType[]

  staff?: StaffType[]
  staffMails: string[]
  phone?: string
  usdPrice?: number
  contract?: string
  image?: string
  shippingEnabled?: boolean
  confirmClientData?: boolean
  visible?: boolean
  principalContact?: string
  address?: string
  email?: string

  //* this should be added in context
  items?: Partial<ArticleType>[]
  clients?: Partial<Client>[]
  orders?: Partial<Order>[]
}

export type CompanyType = BaseType & CompanyBase

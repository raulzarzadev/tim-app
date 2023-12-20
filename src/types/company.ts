import { FieldValue } from 'firebase/firestore'
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
  currentFolio?: number | FieldValue
  //* this should be added in context
  categories?: CategoryType[] | null
  items?: Partial<ArticleType>[] | null
  clients?: Partial<Client>[] | null
  orders?: Partial<Order>[] | null
}

export type CompanyType = BaseType & CompanyBase

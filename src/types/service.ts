import { Timestamp } from 'firebase/firestore'
import { ArticleType } from './article'
import { CompanyType } from './company'
import { Order } from './order'
import { BaseType } from './base'

export type ServiceBase = {
  itemId?: ArticleType['id']
  companyId?: CompanyType['id']
  //* OrderId is the id of the client order. Its just when a client was a responsible of the damage of an article
  orderId?: Order['id']

  reason: string
  date: Date | Timestamp
  description: string
  status: 'pending' | 'accepted' | 'rejected' | 'finished'
  assignedTo?: string
  assignedToEmail?: string
  images?: ServiceImage[]
}

export type Service = ServiceBase & BaseType

export type ServiceImage = {
  description: string
  url: string
}

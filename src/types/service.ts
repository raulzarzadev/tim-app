import { Timestamp } from 'firebase/firestore'
import { ArticleType } from './article'
import { CompanyType } from './company'
import { Order } from './order'
import { BaseType } from './base'

export const serviceStatusLabels: Record<Service['status'], string> = {
  pending: 'Pendiente',
  accepted: 'Aceptado',
  rejected: 'Rechazado',
  finished: 'Finalizado',
  'in-progress': 'En proceso'
}
export type ServiceBase = {
  itemId?: ArticleType['id']
  companyId?: CompanyType['id']
  //* OrderId is the id of the client order. Its just when a client was a responsible of the damage of an article
  orderId?: Order['id']

  reason: string
  date: Date | Timestamp
  description: string
  status: 'pending' | 'accepted' | 'rejected' | 'finished' | 'in-progress'
  assignedTo?: string
  assignedToEmail?: string
  images?: ServiceImage[]
  comments?: ServiceComment[]
}
export type Service = ServiceBase & BaseType

export type ServiceImage = {
  description: string
  url: string
}

export type ServiceComment = {
  id?: string
  content: string
  images: string[]
  date: Date | Timestamp
  createdBy?: string
}

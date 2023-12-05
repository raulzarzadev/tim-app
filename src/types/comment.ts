import { Timestamp } from 'firebase/firestore'
import { BaseType } from './base'

export type CommentBase = {
  content: string
  images: string[]
  date: Date | Timestamp
}

export type Client = {
  type: 'client'
  clientId: string
}

export type Service = {
  type: 'service'
  serviceId: string
}

export type CommentType = Client | Service

export type Comment = CommentBase & CommentType & BaseType

export type ClientComment = Comment & {
  type: 'client'
}
export type CreateComment = Pick<Comment, 'content' | 'date'> &
  Partial<Pick<Comment, 'images'>> & {}

import { Timestamp } from 'firebase/firestore'
import { ArticleType } from './article'
import { CompanyType } from './company'
import { UserType } from './user'

export type Payment = {
  companyId: CompanyType['id']
  items: PaymentItem[]
  chargedBy: {
    id: UserType['id']
    at: Timestamp | Date
  }
}

export type PaymentItem = {
  itemId: ArticleType['id']
  time: `${number}-mins`
}

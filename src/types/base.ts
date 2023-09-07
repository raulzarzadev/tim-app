import { Timestamp } from 'firebase/firestore'

export type BaseType = {
  id: string
  created: {
    at: Date | Timestamp
    by: string
  }
  updated: {
    at: Date | Timestamp
    by: string
  }
}

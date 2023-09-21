import { Timestamp } from 'firebase/firestore'

const asDate = (
  date?: Timestamp | Date | number | string | object | null
): Date | null => {
  if (date === null) return null
  if (date === undefined) return null
  if (date === '') return null
  if (date instanceof Date) return date
  if (date instanceof Timestamp) return date.toDate()
  if (typeof date === 'number') return new Date(date)
  if (typeof date === 'string') {
    const newDate = new Date(date)
    if (newDate.getTime()) return newDate
  }
  console.error('not a valid date', { date })
  return null
}
export default asDate

import { Timestamp } from 'firebase/firestore'
import { format as fnsFormat, formatDistanceToNowStrict } from 'date-fns'
import { es } from 'date-fns/locale'
import asDate from './asDate'

export const weekDays = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sabado'
}

export const dateMx = (date?: Date | Timestamp | null) => {
  if (!date) return '-'
  const value = date instanceof Timestamp ? date.toDate() : date
  return new Intl.DateTimeFormat(['es-Mx']).format(value)
}

export const dateFormat = (
  date?: number | Date | Timestamp | null,
  strFormat?: string
): string => {
  if (!date) return 'n/d' //* not a date
  const value = date instanceof Timestamp ? date.toDate() : date
  const res = fnsFormat(value, strFormat || 'dd/MMM/yy', {
    locale: es
  })
  return res
}

export const fromNow = (date?: number | Date | Timestamp | null) => {
  const validDate = asDate(date)
  if (!validDate) return '-'
  const res = formatDistanceToNowStrict(validDate, {
    locale: es,
    addSuffix: true,
    roundingMethod: 'ceil'
  })
  return res
}

export const inputDateFormat = (
  date: Date | Timestamp | string | number = new Date()
) => dateFormat(asDate(date), "yyyy-MM-dd'T'HH:mm")

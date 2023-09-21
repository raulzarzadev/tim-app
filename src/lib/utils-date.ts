import { Timestamp } from 'firebase/firestore'
import { format as fnsFormat } from 'date-fns'
import { es } from 'date-fns/locale'

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
  if (!date) return '-'
  const value = date instanceof Timestamp ? date.toDate() : date
  const res = fnsFormat(value, strFormat || 'dd/MMM/yy', {
    locale: es
  })
  return res
}

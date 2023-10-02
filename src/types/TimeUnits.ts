export type TimeUnits =
  | 'hour'
  | 'minutes'
  | 'day'
  | 'week'
  | 'month'
  | 'year'
  | ''

export const timeUnitsLabels: Record<TimeUnits, string> = {
  hour: 'Hora',
  minutes: 'Minutos',
  day: 'Día',
  week: 'Semana',
  month: 'Mes',
  year: 'Año',
  '': 'n/a'
}

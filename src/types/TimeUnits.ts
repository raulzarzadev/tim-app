export type TimeUnits =
  | 'hour'
  | 'minutes'
  | 'day'
  | 'week'
  | 'month'
  | 'year'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years'
  | ''

export const timeUnitsLabels: Record<TimeUnits, string> = {
  hour: 'Hora',
  minutes: 'Minutos',
  day: 'Día',
  week: 'Semana',
  month: 'Mes',
  year: 'Año',
  hours: 'Horas',
  days: 'Días',
  weeks: 'Semanas',
  months: 'Meses',
  years: 'Años',
  '': 'sin'
}

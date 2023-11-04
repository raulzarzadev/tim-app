const labels = {
  canceled: 'Cancelada',
  pending: 'Pendiente',
  finished: 'Finalizada',
  'in-progress': 'En curso',
  taken: 'En uso',
  expired: 'Expirada',
  expire: 'Expira',
  hour: 'hora',
  day: 'día',
  week: 'semana',
  month: 'mes',
  year: 'año',
  second: 'segundo',
  seconds: 'segundos',
  minute: 'minuto',
  minutes: 'minutos',
  hours: 'horas',
  days: 'días',
  weeks: 'semanas',
  months: 'meses',
  years: 'años',
  '': '***'
} as const
export type Labels = keyof typeof labels
const dictionary = (value: Labels) => {
  return labels[value]
}

export default dictionary

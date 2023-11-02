const labels = {
  canceled: 'Cancelada',
  pending: 'Pendiente',
  finished: 'Finalizada',
  'in-progress': 'En curso',
  taken: 'En uso',
  expired: 'Expirada',
  expire: 'Expira'
} as const
export type Labels = keyof typeof labels
const dictionary = (value: Labels) => {
  return labels[value]
}

export default dictionary

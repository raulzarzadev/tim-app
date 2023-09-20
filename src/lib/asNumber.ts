export default (value: unknown): number => {
  if (!value) return 0
  if (typeof value === 'object') return 0
  if (Array.isArray(value)) return 0
  const validNumber = parseFloat(`${value}`)
  if (typeof validNumber === 'number') return validNumber
  return 0
}

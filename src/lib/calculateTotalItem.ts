import { PriceType } from '@/components/PricesForm'
import asNumber from './asNumber'
import { ItemSelected } from '@/components/CompanyCashbox'
import { ArticleType } from '@/types/article'

export const calculateTotal = (
  unit: PriceType['unit'] | undefined,
  qty?: PriceType['quantity'],
  pricesList?: PriceType[]
): { total: number; price?: PriceType } => {
  let total = 0
  let price = undefined
  const defaultPrice = pricesList?.[0]
  if (!unit || !qty)
    return {
      total:
        asNumber(defaultPrice?.price) * asNumber(defaultPrice?.quantity) || 0,
      price: defaultPrice
    }

  const fullMatch = pricesList?.find(
    (p) => p.unit === unit && p.quantity == asNumber(qty)
  )
  if (fullMatch) {
    total = asNumber(fullMatch.price)
    price = fullMatch
    return { total, price }
  }
  const unitMatch = pricesList?.find((p) => {
    return p.unit === unit
  })
  if (unitMatch) {
    const prePrice =
      (asNumber(unitMatch?.price) || 0) / (asNumber(unitMatch?.quantity) || 1)
    total = unitMatch ? asNumber(prePrice) * asNumber(qty) : 0
    price = unitMatch
    return { total, price }
  }

  total = asNumber(pricesList?.[0]?.price)
  price = pricesList?.[0]

  return { total: asNumber(asNumber(total).toFixed(2)), price }
}

export const calculateFullTotal = (
  selectedItems: ItemSelected[],
  fullItems: Partial<ArticleType>[]
) => {
  let total = 0
  selectedItems.forEach(({ qty, unit, itemId }) => {
    const pricesList = fullItems.find((item) => item.id == itemId)?.prices
    const defaultUnit = unit || pricesList?.[0].unit
    const { total: itemTotal } = calculateTotal(
      defaultUnit,
      asNumber(qty),
      pricesList || []
    )
    total += asNumber(itemTotal)
  })
  return total
}

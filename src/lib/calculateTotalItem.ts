import { PriceType } from '@/components/PricesForm'
import asNumber from './asNumber'
import { ArticleType } from '@/types/article'
import { ItemSelected } from '@/context/useCompanyCashbox'

export const calculateTotal = (
  unit: PriceType['unit'] | undefined,
  qty?: PriceType['quantity'],
  pricesList?: PriceType[]
): { total: number; price?: PriceType } => {
  let total = 0
  let price = undefined
  if (!unit && !qty) return { total: 0 }
  const defaultPrice = pricesList?.[0]
  if (!unit || !qty) {
    const t = asNumber(defaultPrice?.price) * asNumber(defaultPrice?.quantity)
    // FIXME: t some times calculate wrong prices wen is in minutes
    return {
      total: t || 0,
      price: defaultPrice
    }
  }
  const fullMatch = pricesList?.find(
    (p) => p.unit === unit && asNumber(p.quantity) === asNumber(qty)
  )
  if (fullMatch) {
    total = asNumber(fullMatch.price)
    price = fullMatch
    // console.log('full match', { total, price })
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
    //console.log({ total, price })

    return { total, price }
  }

  total = asNumber(pricesList?.[0]?.price)
  price = pricesList?.[0]
  return { total: asNumber(asNumber(total).toFixed(2)), price }
}

export const calculateFullTotal = (
  selectedItems: ItemSelected[] = [],
  fullItems?: Partial<(ArticleType | null)[]>
) => {
  let total = 0
  selectedItems?.forEach(({ qty, unit, itemId }) => {
    const pricesList = fullItems?.find((item) => item?.id == itemId)?.prices
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

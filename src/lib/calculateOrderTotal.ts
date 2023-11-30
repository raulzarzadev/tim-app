import { CompanyItem } from '@/types/article'
import { calculateFullTotal } from './calculateTotalItem'
import { Order } from '@/types/order'
import { CompanyType } from '@/types/company'
import asNumber from './asNumber'
import { totalCharged } from '@/components/cashboxBalances/calculateBalance.lib'

export const calculateOrderTotal = ({
  order,
  company
}: {
  order?: Order
  company?: CompanyType
}) => {
  let total = 0
  const itemsSelected = order?.items || []
  const companyItems = company?.articles || []
  const companyCategories = company?.categories || []
  const fullItems: (CompanyItem | null)[] = itemsSelected?.map(
    (searchItem: { itemId?: string }) => {
      const fullItem = companyItems?.find(
        (item) => item?.id == searchItem.itemId
      )
      if (!fullItem) return null
      if (fullItem?.ownPrice) return { ...fullItem, ...searchItem }
      const categoryPrices = companyCategories?.find(
        (c) => c.name === fullItem?.category
      )?.prices

      return { ...fullItem, prices: categoryPrices, ...searchItem }
    }
  )

  const itemsTotal = calculateFullTotal(itemsSelected, fullItems)
  const shippingAmount = asNumber(order?.shipping?.amount) || 0
  const totalPayments = totalCharged(order?.payments || [])
  total += itemsTotal
  total += shippingAmount
  total -= totalPayments

  return total
}

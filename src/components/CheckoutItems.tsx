import { Typography } from '@mui/material'
import CheckoutItemsList from './CheckoutItemsList'
import { dateFormat } from '@/lib/utils-date'
import asNumber from '@/lib/asNumber'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import useCashboxContext, { ItemSelected } from '@/context/useCompanyCashbox'
import { CompanyItem } from '@/types/article'
import { calculateFullTotal } from '@/lib/calculateTotalItem'
import { addMinutes } from 'date-fns'
import rentTime from '@/lib/rentTime'
import { PriceType } from './PricesForm'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const CheckoutItems = ({
  itemsSelected,
  setTotal,
  setItemsSelected
}: {
  itemsSelected: ItemSelected[]
  setTotal?: Dispatch<SetStateAction<number>>
  setItemsSelected?: (items: ItemSelected[]) => void
}) => {
  const { currentCompany } = useUserCompaniesContext()
  const categories = currentCompany?.categories
  const items = currentCompany?.articles
  const [_itemsSelected, _setItemsSelected] = useState(itemsSelected)
  const fullItems: (CompanyItem | null)[] = _itemsSelected?.map(
    (searchItem: { itemId?: string }) => {
      const fullItem = items?.find((item) => item?.id == searchItem.itemId)
      if (!fullItem) return null
      if (fullItem?.ownPrice) return { ...fullItem, ...searchItem }
      const categoryPrices = categories?.find(
        (c) => c.name === fullItem?.category
      )?.prices

      return { ...fullItem, prices: categoryPrices, ...searchItem }
    }
  )

  const [_total, _setTotal] = useState(0)

  const onSelectPrice = (itemId: string, price: PriceType) => {
    const newItems = [
      ..._itemsSelected.filter((i) => i.itemId !== itemId),
      {
        itemId,
        qty: price.quantity,
        unit: price.unit
      }
    ]
    console.log({ newItems })
    _setItemsSelected(newItems)
    setItemsSelected?.(itemsSelected)

    const t = calculateFullTotal(newItems, fullItems)
    _setTotal(t)
    setTotal?.(t) //* to update total outside the component
  }

  const returnBack = (): Date => {
    const qty = itemsSelected?.[0]?.qty
    const unit = itemsSelected?.[0]?.unit
    const time = rentTime(qty, unit)
    return addMinutes(new Date(), time)
  }
  //const total = calculateFullTotal(_itemsSelected, fullItems)

  useEffect(() => {
    _setItemsSelected(itemsSelected)
  }, [itemsSelected])

  return (
    <div>
      <CheckoutItemsList
        items={fullItems || []}
        onSelectPrice={onSelectPrice}
      />
      <Typography className="text-end mt-4">
        Regreso:
        {dateFormat(returnBack(), ' dd-MMM HH:mm')}
      </Typography>
      <Typography className="text-xl font-bold mb-4 text-end">
        Total: ${asNumber(_total)?.toFixed(2)}
      </Typography>
    </div>
  )
}

export default CheckoutItems

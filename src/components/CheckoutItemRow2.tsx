import { ArticleType } from '@/types/article'
import { useContext, useEffect, useState } from 'react'
import { CashboxContext, ItemSelected } from './CompanyCashbox'
import { calculateTotal } from '@/lib/calculateTotalItem'
import { PriceType } from './PricesForm'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import asNumber from '@/lib/asNumber'
import CurrencySpan from './CurrencySpan'
import { timeUnitsLabels } from '@/types/TimeUnits'
import AppIcon from './AppIcon'
import ModalConfirm from './ModalConfirm'
import { Typography } from '@mui/material'

export const CheckoutItemRow = ({ item }: { item: Partial<ArticleType> }) => {
  const { items = [], removeItem, updateItem } = useContext(CashboxContext)
  const foundItem = items?.find((i: { itemId?: string }) => i.itemId == item.id)
  const defaultPrice: {
    unit: PriceType['unit']
    quantity: PriceType['quantity']
  } = {
    unit: foundItem?.unit,
    quantity: foundItem?.qty || 0
  }

  const [priceSelected, setPriceSelected] = useState<
    Pick<PriceType, 'unit' | 'quantity'> | undefined
  >(undefined)

  useEffect(() => {
    const priceExist = item?.prices?.find((p) => {
      return (
        p.unit === priceSelected?.unit && p.quantity === priceSelected?.quantity
      )
    })
    if (priceExist) {
      setPriceSelected(defaultPrice)
      updateItem?.(item.id, {
        qty: defaultPrice.quantity,
        unit: defaultPrice.unit
      })
    } else {
      const price = item?.prices?.[0]
      setPriceSelected(item?.prices?.[0])
      updateItem?.(item.id, { qty: price?.quantity || 0, unit: price?.unit })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log({ priceSelected })

  const { total: itemTotal, price } = calculateTotal(
    priceSelected?.unit,
    priceSelected?.quantity,
    item.prices || []
  )

  const handleRemoveItem = () => {
    item.id && removeItem?.(item.id)
  }
  const handleSelectPrice = (p: PriceType) => {
    setPriceSelected(p)
    updateItem?.(item.id, { qty: p.quantity, unit: p.unit })
  }
  const isSelectedPrice = (
    p: PriceType,
    selected?: Pick<PriceType, 'unit' | 'quantity'>
  ) => {
    return selected?.unit === p.unit && selected?.quantity === p.quantity
  }

  return (
    <Grid2 container key={item?.id} spacing={1} alignItems={'center'}>
      <Grid2 xs={2}>{item?.category}</Grid2>
      <Grid2 xs={2}>{item?.serialNumber || item?.name}</Grid2>
      <Grid2 xs={6} container wrap={'nowrap'} overflow={'auto'} padding={'8px'}>
        {item.prices?.map((p, i) => (
          <Grid2 key={i} xs={'auto'}>
            <button
              onClick={() => handleSelectPrice(p)}
              className={`${
                isSelectedPrice(p, priceSelected) ? 'bg-blue-300' : ''
              } shadow-md rounded-md p-2 text-center flex flex-col justify-center `}
            >
              <p className="text-center w-full ">
                {p?.quantity} {p?.unit && timeUnitsLabels[p?.unit]}
                {p.quantity > 1 ? 's' : ''}
              </p>
              <p>${asNumber(p.price).toFixed(2)}</p>
            </button>
          </Grid2>
        ))}
      </Grid2>
      <Grid2 xs={2}>
        <ModalConfirm
          label={<AppIcon icon="trash" />}
          color="error"
          handleConfirm={handleRemoveItem}
        >
          <Typography>Remover articulo</Typography>
        </ModalConfirm>

        <CurrencySpan quantity={itemTotal} />
      </Grid2>
    </Grid2>
  )
}

export default CheckoutItemRow

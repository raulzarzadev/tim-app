import { ArticleType } from '@/types/article'
import { useState } from 'react'
import { PriceType } from './PricesForm'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import asNumber from '@/lib/asNumber'
import CurrencySpan from './CurrencySpan'
import { timeUnitsLabels } from '@/types/TimeUnits'
import { ItemSelected } from '@/context/useCompanyCashbox'
import ModalItemDetails from './ModalItemDetails'

export const CheckoutItemRow = ({
  item,
  onSelectPrice
}: {
  item: Partial<ArticleType & Pick<ItemSelected, 'qty' | 'unit' | 'price'>>
  onSelectPrice?: (itemId: string, price: PriceType) => void
}) => {
  const [priceSelected, setPriceSelected] = useState<
    Pick<PriceType, 'unit' | 'quantity' | 'price'> | undefined
  >()

  const itemTotal = priceSelected?.price || 0

  const handleSelectPrice = (p: PriceType) => {
    setPriceSelected(p)

    //* for the renew option
    onSelectPrice?.(item.id || '', p)
  }
  const isSelectedPrice = (
    p: PriceType,
    selected?: Pick<PriceType, 'unit' | 'quantity' | 'price'>
  ) => {
    return (
      selected?.unit === p.unit &&
      selected?.quantity === p.quantity &&
      selected.price === p.price
    )
  }
  return (
    <Grid2 container key={item?.id} spacing={1} alignItems={'center'}>
      <Grid2 xs={2}>{item?.category}</Grid2>
      <Grid2 xs={2}>
        <ModalItemDetails itemId={item?.id || ''} />
      </Grid2>
      <Grid2 xs={6} container wrap={'nowrap'} overflow={'auto'} padding={'8px'}>
        {item.prices?.map((p, i) => (
          <Grid2 key={i} xs={'auto'}>
            <button
              onClick={() => handleSelectPrice(p)}
              className={`${
                isSelectedPrice(p, priceSelected) ? 'bg-blue-300' : ''
              } shadow-gray-500 cursor-pointer shadow-md rounded-md p-2 text-center flex flex-col justify-center hover:bg-blue-100  border-gray-50 active:bg-blue-300`}
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
        <CurrencySpan quantity={itemTotal} />
      </Grid2>
    </Grid2>
  )
}

export default CheckoutItemRow

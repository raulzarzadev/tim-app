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
    Pick<PriceType, 'unit' | 'qty' | 'price'> | undefined
  >()

  const itemTotal = priceSelected?.price || 0

  const handleSelectPrice = (p: PriceType) => {
    setPriceSelected(p)

    //* for the renew option
    onSelectPrice?.(item.id || '', p)
  }
  const isSelectedPrice = (
    p: PriceType,
    selected?: Pick<PriceType, 'unit' | 'qty' | 'price'>
  ) => {
    return (
      selected?.unit === p.unit &&
      selected?.qty === p.qty &&
      selected.price === p.price
    )
  }
  return (
    <Grid2
      test-id={`selected-item-row-${item?.id}`}
      container
      key={item?.id}
      spacing={1}
      alignItems={'center'}
    >
      {/* <Grid2 xs={2}>{item?.category}</Grid2>
      <Grid2 xs={2}>
        <ModalItemDetails itemId={item?.id || ''} />
      </Grid2> */}
      <Grid2 xs={3}>
        <p className="whitespace-nowrap truncate">{`${item?.category} ${item.serialNumber}`}</p>
      </Grid2>
      <Grid2 xs={7} container wrap={'nowrap'} overflow={'auto'} padding={'8px'}>
        {item.prices?.map((p, i) => (
          <Grid2 key={i} xs={'auto'}>
            <button
              test-id={`select-item-price-${i}`}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleSelectPrice(p)
              }}
              className={`${
                isSelectedPrice(p, priceSelected) ? 'bg-blue-300' : ''
              } shadow-gray-500 cursor-pointer shadow-md rounded-md p-2 text-center flex flex-col justify-center hover:bg-blue-100  border-gray-50 active:bg-blue-300`}
            >
              <p className="text-center w-full ">
                {p?.qty} {p?.unit && timeUnitsLabels[p?.unit]}
                {p.qty > 1 ? 's' : ''}
              </p>
              <p>${asNumber(p.price).toFixed(2)}</p>
            </button>
          </Grid2>
        ))}
      </Grid2>
      <Grid2 xs={2}>
        <CurrencySpan test-id="item-total" quantity={itemTotal} />
      </Grid2>
    </Grid2>
  )
}

export default CheckoutItemRow

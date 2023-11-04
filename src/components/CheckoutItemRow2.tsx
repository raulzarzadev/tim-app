import { ArticleType } from '@/types/article'
import { useContext, useEffect, useState } from 'react'
import { calculateTotal } from '@/lib/calculateTotalItem'
import { PriceType } from './PricesForm'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import asNumber from '@/lib/asNumber'
import CurrencySpan from './CurrencySpan'
import { timeUnitsLabels } from '@/types/TimeUnits'
import AppIcon from './AppIcon'
import ModalConfirm from './ModalConfirm'
import { Typography } from '@mui/material'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import ChangeItem from './ChangeItem'
import useCashboxContext, { ItemSelected } from '@/context/useCompanyCashbox'
import ModalItemChange from './ModalItemChange'
import ModalItemDetails from './ModalItemDetails'

export const CheckoutItemRow = ({
  item,
  onSelectPrice
}: {
  item: Partial<ArticleType & Pick<ItemSelected, 'qty' | 'unit' | 'price'>>
  onSelectPrice?: (itemId: string, price: PriceType) => void
}) => {
  const { removeItem, updateItem, addItem } = useCashboxContext()

  const [priceSelected, setPriceSelected] = useState<
    Pick<PriceType, 'unit' | 'quantity' | 'price'> | undefined
  >()

  // const { total: itemTotal, price } = calculateTotal(
  //   priceSelected?.unit,
  //   priceSelected?.quantity,
  //   item.prices || []
  // )
  const itemTotal = priceSelected?.price || 0

  const handleRemoveItem = () => {
    item.id && removeItem?.(item.id)
  }
  const handleSelectPrice = (p: PriceType) => {
    setPriceSelected(p)
    updateItem?.(item.id, {
      qty: p.quantity,
      unit: p.unit,
      price: p.price || 0
    })

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
        {/* <ModalItemChange
          addItem={addItem}
          removeItem={removeItem}
          item={item}
          modalChangeItem={modalChangeItem}
          priceSelected={priceSelected}
        /> */}
      </Grid2>
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
        {removeItem && (
          <ModalConfirm
            label={<AppIcon icon="trash" />}
            color="error"
            handleConfirm={handleRemoveItem}
          >
            <Typography>Remover articulo</Typography>
          </ModalConfirm>
        )}

        <CurrencySpan quantity={itemTotal} />
      </Grid2>
    </Grid2>
  )
}

export default CheckoutItemRow

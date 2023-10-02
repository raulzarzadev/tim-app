import { ArticleType } from '@/types/article'
import { useContext, useEffect, useState } from 'react'
import { CashboxContext } from './CompanyCashbox'
import { calculateTotal } from '@/lib/calculateTotalItem'
import { PriceType } from './PricesForm'
import useModal from '@/hooks/useModal'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import AppIcon from './AppIcon'
import Modal from './Modal'
import { Box, Button, Typography } from '@mui/material'
import asNumber from '@/lib/asNumber'
import ModalConfirm from './ModalConfirm'
import NumberInput from './NumberInput'
import Select from './Select'
import CurrencySpan from './CurrencySpan'

export const CheckoutItemRow = ({ item }: { item: Partial<ArticleType> }) => {
  const { items = [], removeItem, updateItem } = useContext(CashboxContext)
  const foundItem = items?.find((i: { itemId?: string }) => i.itemId == item.id)
  const [qty, setQty] = useState(
    foundItem?.qty || item.prices?.[0].quantity || 1
  )
  const [unit, setUnit] = useState<PriceType['unit']>(
    foundItem?.unit || item.prices?.[0].unit
  )
  const [priceSelected, setPriceSelected] = useState<PriceType | undefined>(
    undefined
  )
  const { total: itemTotal, price } = calculateTotal(
    unit,
    qty,
    item.prices || []
  )

  const uniquePrices = [
    ...new Set(item.prices?.map((price) => price.unit))
  ].map((unit) => ({
    label: unit || '',
    value: unit || ''
  }))

  const modal = useModal({ title: 'Detalles de articulo' })

  const handleRemoveItem = () => {
    item.id && removeItem?.(item.id)
  }
  const handleSelectPrice = (p: PriceType) => {
    setUnit(p.unit)
    setQty(p.quantity)
  }
  const isSelectedPrice = (p: PriceType) => {
    return (
      priceSelected?.unit === p.unit && priceSelected?.quantity === p.quantity
    )
  }

  useEffect(() => {
    if (item.id) updateItem?.(item.id, { qty, unit })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty, unit])

  return (
    <Grid2
      container
      key={item?.id}
      spacing={1}
      // className={
      //   'grid grid-cols-5 items-center place-content-center my-2 shadow-md rounded-md p-2 text-center'
      // }
      alignItems={'center'}
    >
      <Grid2 xs={12} className="col-span-5 flex justify-end ">
        <button onClick={modal.onOpen}>
          <AppIcon icon="eye" />
        </button>
        <Modal {...modal}>
          <Box>
            <Box className="text-center mb-4">
              <p>Serie: {item.serialNumber}</p>
              <p>{item.name && 'Nombre: ' + item.name}</p>
              <p>Categoria: {item.category}</p>
            </Box>
            <Box className="grid gap-2 grid-flow-col">
              {item.prices?.map((p, i) => (
                <Box
                  component={Button}
                  onClick={() => handleSelectPrice(p)}
                  key={i}
                  className={`${
                    isSelectedPrice(p) ? 'bg-blue-300' : ''
                  } shadow-md rounded-md p-2 text-center flex flex-col justify-center`}
                >
                  <p>
                    {p?.quantity} {p?.unit}
                  </p>
                  <p>${asNumber(p.price).toFixed(2)}</p>
                </Box>
              ))}
            </Box>
            <Typography variant="body2" className="text-center">
              Origen del precio:{' '}
              <span className="font-bold">
                {item.ownPrice ? 'Articulo' : 'Categoria'}*
              </span>
            </Typography>

            <Box className="flex justify-center my-4">
              <ModalConfirm
                handleConfirm={handleRemoveItem}
                color="warning"
                label="Descartar"
              >
                <Typography className="text-center text-xl ">
                  Remover articulo de la lista
                </Typography>
              </ModalConfirm>
            </Box>
          </Box>
        </Modal>
      </Grid2>
      <Grid2 xs={2}>{item?.category}</Grid2>
      <Grid2 xs={2}>{item?.serialNumber || item?.name}</Grid2>
      <Grid2 xs={3}>
        {' '}
        <NumberInput
          name="qty"
          defaultValue={qty}
          onChange={(value) => setQty(value)}
          value={qty}
          min={0}
        />
      </Grid2>
      <Grid2 xs={3}>
        <Select
          variant="outlined"
          fullWidth
          onSelect={(value) => setUnit(value as PriceType['unit'])}
          label="Unidad"
          selected={unit || ''}
          options={uniquePrices}
        />
      </Grid2>
      <Grid2 xs={2}>
        <CurrencySpan quantity={itemTotal} />
      </Grid2>
    </Grid2>
  )
}

export default CheckoutItemRow

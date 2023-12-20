import { ArticleType } from '@/types/article'
import { Box, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

import CheckoutItemRow from './CheckoutItemRow2'
import { PriceType } from './PricesForm'
import MyTable from './MyTable'
import { useState } from 'react'
import asNumber from '@/lib/asNumber'
import { timeUnitsLabels } from '@/types/TimeUnits'

const CheckoutItemsList = ({
  items,
  onSelectPrice
}: {
  items: (Partial<ArticleType> | null)[]
  onSelectPrice?: (itemId: string, price: PriceType) => void
}) => {
  const sortByCatNameOrSerial = (
    a: Partial<ArticleType> | null,
    b: Partial<ArticleType> | null
  ): number =>
    a?.category?.localeCompare(b?.category || '') ||
    a?.name?.localeCompare(b?.name || '') ||
    a?.serialNumber?.localeCompare(b?.serialNumber || '') ||
    0

  const [priceSelected, setPriceSelected] = useState<
    Pick<PriceType, 'unit' | 'qty' | 'price'> | undefined
  >()

  const itemTotal = priceSelected?.price || 0

  const handleSelectPrice = (itemId: string, p: PriceType) => {
    console.log({ itemId, p })
    setPriceSelected(p)
    //* for the renew option
    if (itemId) onSelectPrice?.(itemId || '', p)
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
    <Box>
      <MyTable
        data={{
          headers: [
            {
              key: 'category',
              label: 'Categoria'
            },
            {
              key: 'serialNumber',
              label: 'No.Serie'
            },
            {
              key: 'rentTime',
              label: 'Tiempo'
            },
            {
              key: 'prices',
              label: 'Precios',
              format: (prices: PriceType[], row) => {
                return (
                  <div>
                    {prices?.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          console.log('first button', { p, row })
                        }}
                      >
                        Click
                      </button>
                    ))}
                  </div>
                )
              }
            }
          ],
          body: items
        }}
      ></MyTable>
      {/* <Grid2 container spacing={1} className=" font-bold ">
        <Grid2 xs={2} className="truncate">
          Categoria
        </Grid2>
        <Grid2 xs={2} className="truncate">
          No.Serie
        </Grid2>
        <Grid2 className="text-center" xs={6}>
          Tiempo
        </Grid2>
        <Grid2 xs={2}>Precio</Grid2>
      </Grid2>
      {items
        .sort(sortByCatNameOrSerial)
        .map((item, i) =>
          item ? (
            <CheckoutItemRow
              key={item.id}
              item={item}
              onSelectPrice={onSelectPrice}
            />
          ) : (
            <Typography key={i}>{`Articulo no encontrado`}</Typography>
          )
        )} */}
    </Box>
  )
}

export default CheckoutItemsList

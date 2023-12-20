import { ArticleType } from '@/types/article'
import { Box, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

import CheckoutItemRow from './CheckoutItemRow2'
import { PriceType } from './PricesForm'

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
  return (
    <Box>
      <Grid2 container spacing={1} className=" font-bold ">
        {/* <Grid2 xs={2} className="truncate">
          Categoria
        </Grid2>
        <Grid2 xs={2} className="truncate">
          No.Serie
        </Grid2> */}
        <Grid2 xs={3} className="truncate">
          Artículo
        </Grid2>
        <Grid2 className="text-center" xs={7}>
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
        )}
    </Box>
  )
}

export default CheckoutItemsList

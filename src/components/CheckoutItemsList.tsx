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
  const sortByCat = (
    a: { category?: string } | null,
    b: { category?: any } | null
  ): number => a?.category?.localeCompare(b?.category || '') || 0
  return (
    <Box>
      <Grid2 container spacing={1} className=" font-bold ">
        <Grid2 xs={2}>Categoria</Grid2>
        <Grid2 xs={2}>No.Serie</Grid2>
        <Grid2 className="text-center" xs={6}>
          Tiempo
        </Grid2>
        <Grid2 xs={2}>Precio</Grid2>
      </Grid2>
      {items
        .sort(sortByCat)
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

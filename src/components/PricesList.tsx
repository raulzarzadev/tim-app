import { Box, Button, Typography } from '@mui/material'
import { PriceType } from './PricesForm'
import AppIcon from './AppIcon'

const PricesList = ({
  prices = [],
  handleRemove
}: {
  prices: PriceType[]
  handleRemove?: (index: number) => void
}) => {
  return (
    <Box>
      <Typography className="text-center mt-4">Lista de precios</Typography>
      {prices.map((p, index) => (
        <Box
          className={`grid ${
            handleRemove ? 'grid-cols-4' : 'grid-cols-3'
          } gap-1 text-center my-2`}
          key={`${index}`}
        >
          {handleRemove ? (
            <Box>
              <Button
                onClick={() => {
                  handleRemove(index)
                }}
                color="error"
              >
                <AppIcon icon="trash" />
              </Button>
            </Box>
          ) : null}
          <Box>{p.quantity}</Box>
          <Box>{p.unit}</Box>
          <Box>${p.price}</Box>
        </Box>
      ))}
    </Box>
  )
}

export default PricesList

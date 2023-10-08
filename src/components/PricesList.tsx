import { Box, Button, Typography } from '@mui/material'
import { PriceType } from './PricesForm'
import AppIcon from './AppIcon'
import { timeUnitsLabels } from '@/types/TimeUnits'

const PricesList = ({
  prices = [],
  handleRemove
}: {
  prices: PriceType[]
  handleRemove?: (index: number) => void
}) => {
  return (
    <Box className="my-4">
      {prices.length === 0 && (
        <Typography className="text-center">
          No hay precios registrados
        </Typography>
      )}
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
          <Box>{p.unit && timeUnitsLabels[p.unit]}</Box>
          <Box>${p.price}</Box>
        </Box>
      ))}
    </Box>
  )
}

export default PricesList

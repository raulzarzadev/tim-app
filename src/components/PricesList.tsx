import { Box, Button, Typography } from '@mui/material'
import { PriceType } from './PricesForm'

import MyTable from './MyTable'
import dictionary from '@/CONSTS/dictionary'
import AppIcon from './AppIcon'

const PricesList = ({
  prices = [],
  handleRemove,
  handleUpdatePrices
}: {
  prices: PriceType[]
  handleRemove?: (index: number) => void
  handleUpdatePrices?: (prices?: PriceType[]) => void
}) => {
  return (
    <Box className="my-4">
      {prices.length === 0 && (
        <Typography className="text-center">
          Aún hay precios registrados
        </Typography>
      )}
      <PricesTable
        prices={prices}
        handleRemoveIndex={handleRemove}
        handleUpdatePrices={handleUpdatePrices}
      />
    </Box>
  )
}

const PricesTable = ({
  prices,
  handleRemoveIndex,
  handleUpdatePrices
}: {
  prices: PriceType[]
  handleRemoveIndex?: (index: number) => void
  handleUpdatePrices?: (prices?: PriceType[]) => void
}) => {
  //@ts-ignore next-line just for this table
  prices.map((p) => (p.period = `${p.qty} ${dictionary(p.unit)}`))

  function handleHiddenPrice(i: number | null) {
    if (typeof i == 'number') {
      prices[i].hidden = !prices[i].hidden
      handleUpdatePrices?.(prices)
    }
  }

  function handleAddAsFavorite(i: number | null) {
    if (typeof i == 'number') {
      prices.map((p) => (p.favorite = false))
      prices[i].favorite = true
      handleUpdatePrices?.(prices)
    }
  }

  return (
    <MyTable
      modalTitle="Acciones de precio"
      modalChildren={(value, i, onClose) => (
        <div>
          <div className="text-center ">
            <Typography>
              Eliminar precio:{' '}
              {`${value?.title || ''} ${dictionary(value?.period)} ${
                value?.price || ''
              }`}
            </Typography>
          </div>
          <div className="flex justify-evenly my-4">
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                if (typeof i == 'number') {
                  onClose?.()
                  handleRemoveIndex?.(i)
                }
              }}
            >
              Eliminar
            </Button>
            <Button
              disabled={value?.favorite}
              variant="outlined"
              color="primary"
              onClick={() => {
                handleAddAsFavorite(i)
              }}
              endIcon={<AppIcon icon="star" />}
            >
              Favorito
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                handleHiddenPrice(i)
              }}
              endIcon={
                <AppIcon icon={value?.hidden ? 'eyeOpen' : 'eyeClose'} />
              }
            >
              {value?.hidden ? 'Mostrar' : 'Ocultar'}
            </Button>
          </div>
        </div>
      )}
      data={{
        headers: [
          {
            key: 'title',
            label: 'Titulo'
          },
          {
            key: 'period',
            label: 'Tiempo'
          },
          {
            key: 'price',
            label: 'Precio'
          }
        ],
        body: prices
      }}
    ></MyTable>
  )
}

export default PricesList

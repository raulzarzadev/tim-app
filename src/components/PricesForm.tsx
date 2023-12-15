import { Button, TextField, Typography } from '@mui/material'
import AppIcon from './AppIcon'
import { useState } from 'react'
import PricesList from './PricesList'
import { TimeUnits } from '@/types/TimeUnits'
import RadioGroup from './RadioGroup'
import dictionary from '@/CONSTS/dictionary'

export type PriceType = {
  favorite?: boolean
  hidden?: boolean
  qty: number
  price: number
  unit?: TimeUnits
  title?: string
}
const PricesForm = ({
  prices = [],
  setPrices
}: {
  prices?: PriceType[]
  setPrices?: (prices: PriceType[]) => void
}) => {
  const [_prices, _setPrices] = useState<PriceType[]>(prices)
  const [_formValues, _setFormValues] = useState<PriceType>({
    qty: 1,
    price: 0,
    unit: 'hour'
  })
  const handleChange = (name: string, value: unknown) => {
    _setFormValues((prev) => ({ ...prev, [name]: value }))
  }
  const handleAddPrice = (newPrice: PriceType) => {
    const prices = [..._prices, newPrice]
    _setPrices(prices)
    setPrices?.(prices)
  }
  const handleRemovePrice = (index: number) => {
    const prices = _prices.filter((_, i) => i !== index)
    _setPrices(prices)
    setPrices?.(prices)
  }

  return (
    <div>
      <Typography variant="h6" className="text-center">
        Precios
      </Typography>
      <div className="grid gap-2">
        <RadioGroup
          label="Seleccionar unidad de tiempo"
          options={['minutes', 'hour', 'day', 'week', 'month'].map((u) => ({
            label: dictionary(u as TimeUnits),
            value: u
          }))}
          value={_formValues.unit}
          setValue={(value) => handleChange('unit', value)}
        />
        <div className="flex">
          <TextField
            onChange={(e) => handleChange('qty', e.target.value)}
            value={_formValues.qty}
            label="Cantidad"
            type="number"
            defaultValue={1}
          />
          <TextField
            onChange={(e) => handleChange('price', e.target.value)}
            value={_formValues.price}
            label="Precio"
            type="number"
          />
          <TextField
            onChange={(e) => handleChange('title', e.target.value)}
            value={_formValues.title || ''}
            label="Titulo (opcional)"
          />
        </div>
        <div>
          <Button
            disabled={!_formValues.qty || !_formValues.price}
            fullWidth
            onClick={() => {
              handleAddPrice(_formValues)
              _setFormValues({
                qty: 1,
                price: 0,
                unit: 'hour'
              })
            }}
            variant="contained"
          >
            Agregar precio
            <AppIcon icon="add" />
          </Button>
        </div>
      </div>
      <PricesList
        prices={_prices}
        handleRemove={handleRemovePrice}
        handleUpdatePrices={(prices) => {
          setPrices?.(prices || [])
        }}
      />
    </div>
  )
}

export default PricesForm

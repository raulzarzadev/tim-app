import { Button, TextField } from '@mui/material'
import Select from './Select'
import AppIcon from './AppIcon'
import { useState } from 'react'
import PricesList from './PricesList'
import ButtonNumber from './NumberInput'

export type PriceType = { quantity: number; price: number; unit: string }
const PricesForm = ({
  prices = [],
  setPrices
}: {
  prices?: PriceType[]
  setPrices?: (prices: PriceType[]) => void
}) => {
  const [_prices, _setPrices] = useState<PriceType[]>(prices)
  const [_formValues, _setFormValues] = useState({
    quantity: 0,
    price: 0,
    unit: ''
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
      <div>Precios</div>
      <PricesList prices={_prices} handleRemove={handleRemovePrice} />
      <div className="grid grid-cols-4 gap-1">
        {/* <TextField
          value={_formValues.quantity}
          label="Cantidad"
          type="number"
          onChange={(e) => handleChange('quantity', e.target.value)}
        /> */}
        <ButtonNumber
          name="quantity"
          onChange={(value) => handleChange('quantity', value)}
          min={0}
        />
        <Select
          selected={_formValues.unit}
          variant="outlined"
          label="Unidad"
          onSelect={(value) => handleChange('unit', value)}
          options={[
            {
              label: 'Hora',
              value: 'hour'
            },
            {
              label: 'Día',
              value: 'day'
            },
            {
              label: 'Semana',
              value: 'week'
            },
            {
              label: 'Mes',
              value: 'month'
            }
          ]}
        />
        <TextField
          onChange={(e) => handleChange('price', e.target.value)}
          value={_formValues.price}
          label="Precio"
          type="number"
        />
        <Button
          onClick={() => {
            handleAddPrice(_formValues)
          }}
        >
          <AppIcon icon="add" />
        </Button>
      </div>
    </div>
  )
}

export default PricesForm

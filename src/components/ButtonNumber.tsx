import * as React from 'react'
import Button from '@mui/material/Button'
import { Box, TextField } from '@mui/material'
import AppIcon from './AppIcon'

export default function ButtonNumber({
  defaultValue,
  onChange,
  name,
  min,
  max
}: {
  defaultValue?: number
  onChange?: (
    value: number,
    e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  name: string
  min?: number
  max?: number
}) {
  const [value, setValue] = React.useState(defaultValue || 0)
  const _onChange = (
    value: number,
    e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(value)
    onChange?.(value, e)
  }
  const handleChange = (value: number) => {
    if (typeof min == 'number' && value < min) return
    if (typeof max == 'number' && value > max) return
    _onChange(value)
  }
  return (
    <>
      <Box
        id="button-number"
        className="grid grid-cols-3 w-48 items-center shadow-sm place-content-center justify-center place-items-center"
      >
        <Button
          color="info"
          sx={{ width: 40, height: '100%' }}
          onClick={() => {
            handleChange(value - 1)
          }}
        >
          <AppIcon icon="substr" />
        </Button>
        <TextField
          name={name}
          onChange={(e) => {
            handleChange(Number(e.target.value), e)
          }}
          type="number"
          value={value}
          inputProps={{
            style: { textAlign: 'center', width: 50 },
            inputMode: 'numeric',
            pattern: '[0-9]*',
            min,
            max
          }}
        />

        <Button
          color="info"
          sx={{ width: 40, height: '100%' }}
          onClick={() => {
            handleChange(value + 1)
          }}
        >
          <AppIcon icon="add" />
        </Button>
      </Box>
    </>
  )
}

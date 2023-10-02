import * as React from 'react'
import Button from '@mui/material/Button'
import { Box, IconButton, TextField } from '@mui/material'
import AppIcon from './AppIcon'
import asNumber from '@/lib/asNumber'

export default function NumberInput({
  defaultValue,
  onChange,
  name,
  min,
  max,
  value
}: {
  defaultValue?: number
  onChange?: (
    value: number,
    e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  value?: number
  name: string
  min?: number
  max?: number
}) {
  const [_value, _setValue] = React.useState(
    asNumber(value || defaultValue) || 0
  )
  const _onChange = (
    value: number,
    e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    _setValue(value)
    onChange?.(value, e)
  }
  const handleChange = (
    value: number,
    e?: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (typeof min == 'number' && value < min) return
    if (typeof max == 'number' && value > max) return
    _onChange(value)
  }
  return (
    <>
      <Box
        id="button-number"
        className="grid grid-cols-3 w-full items-center  place-content-center justify-center place-items-center"
      >
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleChange(_value - 1)
          }}
          className="w-full h-full shadow-md rounded-l-md bg-blue-100"
        >
          <AppIcon icon="substr" />
        </button>
        <input
          name={name}
          onChange={(e) => {
            handleChange(Number(e.target.value), e)
          }}
          className="border w-full p-2 text-center shadow-md "
          type="number"
          value={value ?? _value}
          inputMode="numeric"
          pattern="[0-9]*"
          min={min}
          max={max}
        />

        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleChange(_value + 1)
          }}
          className="w-full h-full shadow-md rounded-r-md bg-blue-100"
        >
          <AppIcon icon="add" />
        </button>
      </Box>
    </>
  )
}

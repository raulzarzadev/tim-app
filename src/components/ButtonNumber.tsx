import * as React from 'react'
import Button from '@mui/material/Button'
import { Box, TextField } from '@mui/material'
import AppIcon from './AppIcon'

export default function ButtonNumber({
  onChange,
  name,
  min,
  max
}: {
  onChange?: (
    value: number,
    e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  name: string
  min?: number
  max?: number
}) {
  const [value, setValue] = React.useState(0)
  const _onChange = (
    value: number,
    e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(value)
    onChange?.(value, e)
  }
  return (
    <>
      <Box
        id="button-number"
        className="grid grid-cols-3 w-36 items-center shadow-sm place-content-center justify-center place-items-center"
      >
        <Button
          color="info"
          sx={{ width: 40, height: '100%' }}
          onClick={() => {
            _onChange(value - 1)
          }}
        >
          <AppIcon icon="substr" />
        </Button>
        <TextField
          name={name}
          onChange={(e) => {
            _onChange(Number(e.target.value), e)
          }}
          type="number"
          value={value}
          inputProps={{
            style: { textAlign: 'center' },
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
            _onChange(value + 1)
          }}
        >
          <AppIcon icon="add" />
        </Button>
      </Box>
    </>
  )
}

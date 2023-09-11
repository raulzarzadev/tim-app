import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

export default function CheckboxLabel({
  labelSide = 'end',
  label = 'label',
  value
}: {
  label: string
  labelSide?: 'top' | 'bottom' | 'end' | 'start' | undefined
  value: boolean
}) {
  return (
    <FormControlLabel
      value={value}
      control={<Checkbox />}
      label={label}
      labelPlacement={labelSide}
    />
  )
}

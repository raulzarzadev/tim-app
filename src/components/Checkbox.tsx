import * as React from 'react'
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

export default function CheckboxLabel({
  labelSide = 'end',
  label = 'label',
  value,
  ...rest
}: {
  label: string
  labelSide?: 'top' | 'bottom' | 'end' | 'start' | undefined
  value?: boolean
} & CheckboxProps) {
  return (
    <FormControlLabel
      value={value}
      control={<Checkbox {...rest} />}
      label={label}
      labelPlacement={labelSide}
    />
  )
}

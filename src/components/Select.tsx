'use client'
import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import MUISelect, { SelectChangeEvent, SelectProps } from '@mui/material/Select'

export default function Select({
  options,
  onSelect,
  selected = '',
  label,
  fullWidth = false,
  variant = 'standard'
}: {
  options: { value?: string | number; label?: string }[]
  onSelect?: (value: string) => void
  selected?: string
  label: string
  fullWidth?: boolean
  variant?: SelectProps['variant']
}) {
  const handleChange = (event: SelectChangeEvent) => {
    onSelect?.(event.target.value as string)
    _seValue(event.target.value)
  }
  const [_value, _seValue] = React.useState(String(selected))
  const sortByLabel = (a: { label?: string }, b: { label?: string }) => {
    if ((a?.label || '') < (b?.label || '')) return -1
    if ((a?.label || '') > (b?.label || '')) return 1
    return 0
  }
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel id={`simple-select-${label}`}>{label}</InputLabel>
      <MUISelect
        variant={variant}
        labelId={`simple-select-${label}`}
        id={`select-${label}`}
        value={selected ?? _value}
        label={label}
        onChange={handleChange}
      >
        {options.sort(sortByLabel).map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  )
}

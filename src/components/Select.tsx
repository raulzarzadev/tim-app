'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import MUISelect, { SelectChangeEvent } from '@mui/material/Select'

export default function Select({
  options,
  onSelect,
  selected = '',
  label
}: {
  options: { value: string | number; label: string }[]
  onSelect?: (value: string) => void
  selected?: string | number
  label: string
}) {
  const handleChange = (event: SelectChangeEvent) => {
    onSelect?.(event.target.value as string)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`simple-select-${label}`}>{label}</InputLabel>
        <MUISelect
          variant="standard"
          labelId={`simple-select-${label}`}
          id={`select-${label}`}
          value={String(selected)}
          label={label}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MUISelect>
      </FormControl>
    </Box>
  )
}

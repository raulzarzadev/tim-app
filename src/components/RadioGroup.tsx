import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroupMUI from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

export default function RadioGroup({
  options,
  label = 'Options',
  value,
  setValue,
  defaultValue,
  ...rest
}: {
  label: string
  options: { label: string; value: string; disabled?: boolean }[]
  value?: string
  defaultValue?: string
  setValue?: (value: string) => void
}) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroupMUI
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        onChange={(e) => setValue?.(e.target.value)}
        value={value}
        defaultValue={defaultValue}
      >
        {options.map((o) => (
          <FormControlLabel
            key={o.value}
            disabled={o.disabled}
            value={o.value}
            control={<Radio />}
            label={o.label}
          />
        ))}
        {/* <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        <FormControlLabel
          value="disabled"
          disabled
          control={<Radio />}
          label="other"
        /> */}
      </RadioGroupMUI>
    </FormControl>
  )
}

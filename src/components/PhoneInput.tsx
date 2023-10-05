import { MuiTelInput } from 'mui-tel-input'
import { forwardRef } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'

const PhoneInput = forwardRef(
  (
    {
      name,
      label,
      control
    }: { name: string; label: string; control: Control<FieldValues> },
    ref
  ) => {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <MuiTelInput
            {...field}
            label={label}
            preferredCountries={['MX', 'US', 'CA']}
            defaultCountry="MX"
          />
        )}
      />
    )
  }
)

PhoneInput.displayName = 'PhoneInput'

export default PhoneInput

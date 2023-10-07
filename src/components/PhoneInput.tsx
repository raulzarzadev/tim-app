// import { MuiTelInput } from 'mui-tel-input'
import { forwardRef } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import ErrorBoundary from './ErrorBoundary'
import PhoneInput2 from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

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
      <ErrorBoundary componentName="PhoneInput">
        <Controller
          control={control}
          name={name}
          className="w-full rounded-[4px] pl-12 py-1 border-black border-opacity-25 border h-14"
          render={({ field }) => (
            <PhoneInput2
              preferredCountries={['mx', 'us', 'ca']}
              country="mx"
              inputStyle={{
                width: '100%',
                height: '56px',
                borderWidth: '1px',
                borderColor: '#ccc',
                borderRadius: '4px',
                paddingLeft: '48px'
              }}
              inputProps={{
                className:
                  'w-full rounded-[4px] pl-12 py-1 border-black border-opacity-25 border h-14'
              }}
              {...field}
            />
          )}
        />
      </ErrorBoundary>
    )
  }
)

PhoneInput.displayName = 'PhoneInput'

export default PhoneInput

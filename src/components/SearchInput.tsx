import { TextField } from '@mui/material'
import { useEffect, useState } from 'react'

const SearchInput = ({
  handleSetSearch,
  placeholder = 'Buscar'
}: {
  handleSetSearch?: (value: string) => void
  placeholder?: string
}) => {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSetSearch?.(inputValue)
    }, 800)
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  return (
    <>
      <TextField
        size="small"
        fullWidth
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
      />
    </>
  )
}

export default SearchInput

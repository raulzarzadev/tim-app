import { Button } from '@mui/material'
import { ButtonHTMLAttributes } from 'react'

const ButtonClear = ({
  onClick,
  type
}: Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'>) => {
  return (
    <Button onClick={onClick} type={type}>
      Limpiar
    </Button>
  )
}

export default ButtonClear

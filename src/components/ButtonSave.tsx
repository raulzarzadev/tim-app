import { Button } from '@mui/material'
import AppIcon from './AppIcon'
import { ButtonHTMLAttributes, MouseEventHandler } from 'react'

const ButtonSave = ({
  onClick,
  type = 'submit',
  label = 'Guardar'
}: Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'> & {
  label?: string
}) => {
  return (
    <>
      <Button
        onClick={onClick}
        color="success"
        variant="outlined"
        type={type}
        endIcon={<AppIcon icon="save" />}
      >
        {label}
      </Button>
    </>
  )
}

export default ButtonSave

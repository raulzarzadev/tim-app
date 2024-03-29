import { Button } from '@mui/material'
import AppIcon from './AppIcon'
import { ButtonHTMLAttributes, MouseEventHandler } from 'react'

const ButtonSave = ({
  onClick,
  type = 'submit',
  label = 'Guardar',
  ...rest
}: Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'type' | 'disabled'
> & {
  label?: string
}) => {
  return (
    <>
      <Button
        onClick={onClick}
        color="success"
        variant="contained"
        type={type}
        endIcon={<AppIcon icon="save" />}
        {...rest}
      >
        {label}
      </Button>
    </>
  )
}

export default ButtonSave

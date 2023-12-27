import LoadingButton, {
  LoadingButtonProps as MUILoadingButtonProps
} from '@mui/lab/LoadingButton'
import { ButtonProps } from '@mui/material'

export type LoadingButtonProps = MUILoadingButtonProps & {
  loading: boolean
  label: string
}
const ButtonLoading = ({
  disabled = false,
  loading = false,
  loadingIndicator = 'Loading...',
  onClick = () => {},
  label = 'Aceptar',
  color = 'primary',
  endIcon,
  ...rest
}: {
  disabled?: boolean
  loading?: boolean
  loadingIndicator?: string
  onClick?: () => void | Promise<any>
  label?: string
  color?: ButtonProps['color']
  endIcon?: React.ReactNode
} & LoadingButtonProps) => {
  return (
    <LoadingButton
      endIcon={endIcon}
      disabled={disabled}
      loading={loading}
      loadingIndicator={loadingIndicator}
      onClick={onClick}
      variant="outlined"
      color={color}
      {...rest}
    >
      {label}
    </LoadingButton>
  )
}

export default ButtonLoading

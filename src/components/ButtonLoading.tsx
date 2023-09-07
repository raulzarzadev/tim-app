import LoadingButton, {
  LoadingButtonProps as MUILoadingButtonProps
} from '@mui/lab/LoadingButton'

export type LoadingButtonProps = MUILoadingButtonProps & {
  loading: boolean
  label: string
}
const ButtonLoading = ({
  disabled = false,
  loading = false,
  loadingIndicator = 'Loading...',
  onClick = () => {},
  label = 'Aceptar'
}) => {
  return (
    <LoadingButton
      disabled={disabled}
      loading={loading}
      loadingIndicator={loadingIndicator}
      onClick={onClick}
      variant="outlined"
    >
      {label}
    </LoadingButton>
  )
}

export default ButtonLoading

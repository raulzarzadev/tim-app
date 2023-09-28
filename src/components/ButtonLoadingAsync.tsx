import LoadingButton, {
  LoadingButtonProps as MUILoadingButtonProps
} from '@mui/lab/LoadingButton'
import { useState } from 'react'

export type LoadingButtonProps = MUILoadingButtonProps & {
  loading: boolean
  label: string
}
const ButtonLoadingAsync = ({
  disabled,
  loading,
  loadingLabel = 'Loading...',
  onClick = () => {},
  label = 'Aceptar'
}: {
  disabled?: boolean
  loading?: boolean
  loadingLabel?: string
  onClick?: () => void | Promise<any>
  label?: string
}) => {
  const [_loading, _setLoading] = useState(loading)
  return (
    <LoadingButton
      disabled={disabled}
      loading={_loading}
      loadingIndicator={loadingLabel}
      onClick={async () => {
        _setLoading(true)
        try {
          await onClick()
        } catch (error) {
          console.error(error)
          _setLoading(false)
        } finally {
          _setLoading(false)
        }
      }}
      variant="outlined"
    >
      {label}
    </LoadingButton>
  )
}

export default ButtonLoadingAsync

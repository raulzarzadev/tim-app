import useModal from '@/hooks/useModal'
import {
  Box,
  Button,
  ButtonProps,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material'
import { ReactNode, useState } from 'react'
import Modal from './Modal'
import ButtonLoading from './ButtonLoading'
import AppIcon, { IconName } from './AppIcon'

const ModalConfirm = ({
  handleConfirm,
  children,
  disabled,
  label = 'Guardar',
  color = 'primary',
  acceptLabel = 'Aceptar',
  acceptColor = 'primary',
  acceptIcon,
  modalTitle = 'Confirmar',
  openIcon,
  fullWidth,
  disabledAccept,
  justIcon,
  openVariant = 'outlined',
  openTooltipTitle = '',
  ...rest
}: {
  handleConfirm?: () => void | Promise<any>
  children?: ReactNode
  disabled?: boolean
  label?: ReactNode
  acceptLabel?: string
  color?: ButtonProps['color']
  acceptColor?: ButtonProps['color']
  modalTitle?: string
  openIcon?: IconName
  acceptIcon?: IconName
  fullWidth?: boolean
  disabledAccept?: boolean
  justIcon?: boolean
  openTooltipTitle?: string
  openVariant?: 'contained' | 'outlined'
}) => {
  const modal = useModal({ title: 'confirm' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const acceptDisabled = done || disabledAccept
  return (
    <>
      <Tooltip title={openTooltipTitle}>
        <span>
          {justIcon ? (
            <IconButton
              onClick={(e) => {
                e.preventDefault()
                modal.onOpen()
              }}
              disabled={disabled}
              aria-label="button-modal-save"
              color={color}
              {...rest}
            >
              <AppIcon icon={openIcon || 'eye'} />
            </IconButton>
          ) : (
            <Button
              fullWidth={fullWidth}
              onClick={(e) => {
                e.preventDefault()
                modal.onOpen()
              }}
              disabled={disabled}
              aria-label="button-modal-save"
              variant={openVariant}
              color={color}
              endIcon={openIcon ? <AppIcon icon={openIcon} /> : undefined}
              {...rest}
            >
              {label}
            </Button>
          )}
        </span>
      </Tooltip>

      <Modal {...modal} title={modalTitle}>
        {children}
        {handleConfirm && (
          <Box className="flex w-full justify-center my-4">
            <ButtonLoading
              //type="submit"
              test-id="confirm-button"
              endIcon={acceptIcon ? <AppIcon icon={acceptIcon} /> : undefined}
              color={acceptColor}
              onClick={async () => {
                setLoading(true)
                await handleConfirm()
                setLoading(false)
                setDone(true)
                setTimeout(() => {
                  modal.onClose()
                  setDone(false)
                }, 400)
              }}
              loading={loading}
              disabled={acceptDisabled}
              label={done ? 'Hecho' : acceptLabel}
            />
          </Box>
        )}
      </Modal>
    </>
  )
}

export default ModalConfirm

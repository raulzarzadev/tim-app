import useModal from '@/hooks/useModal'
import { Box, Button, ButtonProps, IconButton, Typography } from '@mui/material'
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
  modalTitle = 'Confirmar',
  openIcon,
  fullWidth,
  disabledAccept,
  justIcon,
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
  fullWidth?: boolean
  disabledAccept?: boolean
  justIcon?: boolean
}) => {
  const modal = useModal()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const acceptDisabled = done || disabledAccept
  return (
    <>
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
          variant="outlined"
          color={color}
          endIcon={openIcon ? <AppIcon icon={openIcon} /> : undefined}
          {...rest}
        >
          {label}
        </Button>
      )}
      <Modal {...modal} title={modalTitle}>
        {children}
        {handleConfirm && (
          <Box className="flex w-full justify-center my-4">
            <ButtonLoading
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

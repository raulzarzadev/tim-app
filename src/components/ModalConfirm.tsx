import useModal from '@/hooks/useModal'
import { Box, Button, ButtonProps, Typography } from '@mui/material'
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
  modalTitle = 'Confirmar',
  openIcon,
  fullWidth,
  disabledAccept
}: {
  handleConfirm: () => void | Promise<any>
  children?: ReactNode
  disabled?: boolean
  label?: ReactNode
  acceptLabel?: string
  color?: ButtonProps['color']
  modalTitle?: string
  openIcon?: IconName
  fullWidth?: boolean
  disabledAccept?: boolean
}) => {
  const modal = useModal()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const acceptDisabled = done || disabledAccept
  return (
    <>
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
      >
        {label}
      </Button>
      <Modal {...modal} title={modalTitle}>
        {children}
        <Box className="flex w-full justify-center my-4">
          <ButtonLoading
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
      </Modal>
    </>
  )
}

export default ModalConfirm

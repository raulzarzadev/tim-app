import useModal from '@/hooks/useModal'
import { Box, Button, ButtonProps, Typography } from '@mui/material'
import { ReactNode, useState } from 'react'
import Modal from './Modal'
import ButtonLoading from './ButtonLoading'

const ModalConfirm = ({
  handleConfirm,
  children,
  disabled,
  label = 'Guardar',
  color = 'primary',
  acceptLabel = 'Aceptar'
}: {
  handleConfirm: () => void | Promise<any>
  children?: ReactNode
  disabled?: boolean
  label?: ReactNode
  acceptLabel?: string
  color?: ButtonProps['color']
}) => {
  const modal = useModal()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault()
          modal.onOpen()
        }}
        disabled={disabled}
        aria-label="button-modal-save"
        variant="outlined"
        color={color}
      >
        {label}
      </Button>
      <Modal {...modal} title="Confirmar">
        {children}
        <Box className="flex w-full justify-center my-4">
          <ButtonLoading
            disabled={done}
            onClick={async () => {
              setLoading(true)
              await handleConfirm()
              setLoading(false)
              setDone(true)
            }}
            loading={loading}
            label={done ? 'Hecho' : acceptLabel}
          />
        </Box>
      </Modal>
    </>
  )
}

export default ModalConfirm

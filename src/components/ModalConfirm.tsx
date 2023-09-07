import useModal from '@/hooks/useModal'
import { Box, Button, Typography } from '@mui/material'
import { ReactNode, useState } from 'react'
import Modal from './Modal'
import ButtonLoading from './ButtonLoading'

const ModalConfirm = ({
  handleConfirm,
  children,
  disabled
}: {
  handleConfirm: () => void | Promise<any>
  children?: ReactNode
  disabled?: boolean
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
      >
        Guardar
      </Button>
      <Modal {...modal} title="Confirmar">
        {children}

        <ButtonLoading
          disabled={done}
          onClick={async () => {
            setLoading(true)
            await handleConfirm()
            setLoading(false)
            setDone(true)
          }}
          loading={loading}
          label={done ? 'Hecho' : 'Aceptar'}
        />
      </Modal>
    </>
  )
}

export default ModalConfirm

import { Box, Button } from '@mui/material'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import ClientForm from './ClientForm2'

const ModalClientInfo = () => {
  const modal = useModal({ title: 'Información de cliente' })

  return (
    <div className="flex justify-center">
      <Button variant="outlined" onClick={modal.onOpen}>
        Información de cliente
      </Button>
      <Modal {...modal}>
        <ClientForm />
        <Box className="flex justify-center mt-4">
          <Button
            variant="outlined"
            onClick={(e) => {
              e.preventDefault()
              modal.onClose()
            }}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalClientInfo

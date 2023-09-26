import { Button } from '@mui/material'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import ClientForm from './ClientForm'
import { useContext } from 'react'
import { CashboxContext } from './CompanyCashbox'

const ModalClientInfo = () => {
  const modal = useModal({ title: 'Información de cliente' })
  const { setClient, client } = useContext(CashboxContext)

  return (
    <div className="flex justify-center">
      <Button variant="outlined" onClick={modal.onOpen}>
        Información de cliente
      </Button>
      <Modal {...modal}>
        <ClientForm
          client={client}
          setClient={(data) => {
            setClient?.(data)
            modal.onClose()
          }}
        />
      </Modal>
    </div>
  )
}

export default ModalClientInfo

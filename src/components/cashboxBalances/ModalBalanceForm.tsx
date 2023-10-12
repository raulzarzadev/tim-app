'use client'
import { Button } from '@mui/material'
import Modal from '../Modal'
import useModal from '@/hooks/useModal'
import BalanceForm from './BalanceForm'

const ModalBalanceForm = () => {
  const modal = useModal({ title: 'Nuevo corte' })
  return (
    <div className="flex w-full justify-center my-4">
      <Button
        variant="outlined"
        onClick={(e) => {
          e.preventDefault()
          modal.onOpen()
        }}
      >
        Nuevo corte
      </Button>
      <Modal {...modal}>
        <BalanceForm />
      </Modal>
    </div>
  )
}

export default ModalBalanceForm

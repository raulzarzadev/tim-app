import { Button } from '@mui/material'
import StaffList from './StaffList'
import useModal from '@/hooks/useModal'
import Modal from './Modal'

const AssignForm = ({
  assignTo,
  assignedTo
}: {
  assignTo: (email: string) => void | Promise<any>
  assignedTo?: string
}) => {
  const modal = useModal({ title: 'Asignar responsable' })
  const handleAssign = async (email: string) => {
    assignTo(email)
    modal.onClose()
  }
  return (
    <>
      <Button onClick={modal.onOpen}>
        {assignedTo ? 'Asiganado' : 'Asignar'}
      </Button>
      <Modal {...modal}>
        <StaffList simple onClick={(staffEmail) => handleAssign(staffEmail)} />
      </Modal>
    </>
  )
}

export default AssignForm

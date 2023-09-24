'use client'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import StaffForm from './StaffForm'
import StaffList from './StaffList'
import { Button, Typography } from '@mui/material'
import AppIcon from './AppIcon'

const CompanyStaff = () => {
  const modal = useModal({ title: 'Nuevo empleado' })
  return (
    <div>
      <Button onClick={() => modal.onOpen()}>
        Nuevo empleado
        <AppIcon icon="add" />
      </Button>
      <Modal {...modal}>
        <StaffForm />
      </Modal>
      <StaffList />
    </div>
  )
}

export default CompanyStaff
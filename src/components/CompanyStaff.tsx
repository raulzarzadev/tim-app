'use client'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import StaffForm from './StaffForm'
import StaffList from './StaffList'
import { Button } from '@mui/material'
import AppIcon from './AppIcon'
import ErrorBoundary from './ErrorBoundary'

const CompanyStaff = () => {
  const modal = useModal({ title: 'Nuevo empleado' })
  return (
    <ErrorBoundary componentName="CompanyStaff">
      <div>
        <Button onClick={() => modal.onOpen()}>
          Nuevo empleado
          <AppIcon icon="add" />
        </Button>
        <Modal {...modal}>
          <StaffForm newStaff />
        </Modal>
        <StaffList />
      </div>
    </ErrorBoundary>
  )
}

export default CompanyStaff

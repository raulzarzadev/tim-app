'use client'
import useModal from '@/hooks/useModal'
import Modal from '../Modal'
import { Button } from '@mui/material'
import AppIcon from '../AppIcon'
import ErrorBoundary from '../ErrorBoundary'
import { CompanyType } from '@/types/company'
import ShopStaffForm from './ShopStaffForm'
import StaffTable from '../StaffTable'

const ShopStaff = ({ staff }: { staff: CompanyType['staff'] }) => {
  const modal = useModal({ title: 'Nuevo empleado' })
  return (
    <ErrorBoundary componentName="CompanyStaff">
      <div className="flex justify-center">
        <Button variant="outlined" onClick={() => modal.onOpen()}>
          Nuevo empleado
          <AppIcon icon="add" />
        </Button>
        <Modal {...modal}>
          <ShopStaffForm />
        </Modal>
      </div>
      <StaffTable staff={staff} />
    </ErrorBoundary>
  )
}

export default ShopStaff

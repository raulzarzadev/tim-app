'use client'
import useModal from '@/hooks/useModal'
import Modal from '../Modal'
import StaffForm from '../StaffForm2'
import { Button } from '@mui/material'
import AppIcon from '../AppIcon'
import ErrorBoundary from '../ErrorBoundary'
import StaffTable from '../StaffTable'
import { CompanyType } from '@/types/company'
import ShopStaffForm from './ShopStaffForm'

const ShopStaff = ({ staff }: { staff: CompanyType['staff'] }) => {
  const modal = useModal({ title: 'Nuevo empleado' })
  console.log({ staff })
  return (
    <ErrorBoundary componentName="CompanyStaff">
      <div>
        <Button onClick={() => modal.onOpen()}>
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

'use client'
import { StaffType } from '@/types/staff'
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material'
import StaffBadge from './StaffBadge'
import AppIcon from './AppIcon'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import StaffForm from './StaffForm'
import ErrorBoundary from './ErrorBoundary'
import { CompanyType } from '@/types/company'
import MyTable from './MyTable'
import ShopStaffForm from './ShopDashboard/ShopStaffForm'

const StaffTable = ({ staff }: { staff: CompanyType['staff'] }) => {
  return (
    <ErrorBoundary componentName="StaffTable ">
      <MyTable
        modalChildren={(value) => (
          <>
            <ShopStaffForm staffEmail={value?.email} />
          </>
        )}
        modalTitle="Editar empleado"
        data={{
          headers: [
            { label: 'Nombre', key: 'name' },
            { label: 'Email', key: 'email' },
            { label: 'Telefono', key: 'phone' },
            {
              label: 'Permisos',
              key: 'permissions',
              format: (value) => (
                <Box className="flex gap-1 ">
                  {Object.entries(value || {}).map(([key, value]) =>
                    value ? <StaffBadge badge={key} key={key} /> : null
                  )}
                </Box>
              )
            }
          ],
          body: staff || []
        }}
      />
    </ErrorBoundary>
  )
}

const StaffCard = ({
  staff,
  simple,
  onClick
}: {
  staff: StaffType
  simple?: boolean
  onClick?: (email: string) => void
}) => {
  const modal = useModal({ title: 'Editar empleado' })
  return (
    <Card
      onClick={() => onClick?.(staff?.email || '')}
      className={`${
        onClick ? 'cursor-pointer hover:bg-blue-300 active:shadow-none' : ''
      }
      sm:flex 
      `}
    >
      <CardContent className="sm:w-2/3">
        <Typography>
          {staff.name}{' '}
          {!simple && (
            <IconButton color="primary" onClick={() => modal.onOpen()}>
              <AppIcon icon="edit" />
            </IconButton>
          )}
          <Modal {...modal}>
            <StaffForm staff={staff} />
          </Modal>
        </Typography>
        <Typography className="truncate">{staff.email}</Typography>
      </CardContent>
      <ErrorBoundary>
        {!simple && (
          <Box className="flex gap-2 p-2 sm:flex-wrap sm:w-1/3 sm:items-start">
            {Object.entries(staff.permissions || {}).map(([key, value]) =>
              value ? <StaffBadge badge={key} key={key} /> : null
            )}
          </Box>
        )}
      </ErrorBoundary>
    </Card>
  )
}

export default StaffTable

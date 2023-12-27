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

export default StaffTable

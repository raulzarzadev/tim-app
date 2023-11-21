'use client'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { StaffType } from '@/types/staff'
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material'
import StaffBadge from './StaffBadge'
import AppIcon from './AppIcon'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import StaffForm from './StaffForm'
import ErrorBoundary from './ErrorBoundary'

const StaffList = ({
  simple,
  onClick
}: {
  simple?: boolean
  onClick?: (email: string) => void
}) => {
  const { currentCompany } = useUserCompaniesContext()
  return (
    <ErrorBoundary componentName="StaffList ">
      <Box className="grid gap-4 my-4">
        {currentCompany?.staff?.map((staff, i) => (
          <ErrorBoundary componentName="StaffList card" key={i}>
            <StaffCard staff={staff} simple={simple} onClick={onClick} />
          </ErrorBoundary>
        ))}
      </Box>
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
      }`}
    >
      <CardContent>
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
        <Typography>{staff.email}</Typography>
      </CardContent>
      <ErrorBoundary>
        {!simple && (
          <Box className="flex gap-2 p-2">
            {Object.entries(staff.permissions || {}).map(([key, value]) =>
              value ? <StaffBadge badge={key} key={key} /> : null
            )}
          </Box>
        )}
      </ErrorBoundary>
    </Card>
  )
}

export default StaffList

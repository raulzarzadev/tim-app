'use client'
import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { StaffType } from '@/types/staff'
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material'
import StaffBadge from './StaffBadge'
import AppIcon from './AppIcon'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import StaffForm from './StaffForm'
import { useAuthContext } from '@/context/authContext'

const StaffList = () => {
  const { currentCompany } = useUserCompaniesContext()
  return (
    <Box className="grid gap-4 my-4">
      {currentCompany?.staff?.map((staff) => (
        <StaffCard staff={staff} key={staff.id} />
      ))}
    </Box>
  )
}

const StaffCard = ({ staff }: { staff: StaffType }) => {
  const modal = useModal({ title: 'Editar empleado' })
  return (
    <Card>
      <CardContent>
        <Typography>
          {staff.name}{' '}
          <IconButton color="primary" onClick={() => modal.onOpen()}>
            <AppIcon icon="edit" />
          </IconButton>
          <Modal {...modal}>
            <StaffForm staff={staff} />
          </Modal>
        </Typography>
        <Typography>{staff.email}</Typography>
      </CardContent>
      <Box className="flex gap-2 p-2">
        {Object.entries(staff.permissions).map(([key, value]) =>
          value ? <StaffBadge badge={key} key={key} /> : null
        )}
      </Box>
    </Card>
  )
}

export default StaffList

import { StaffPermission, StaffPermissionLabels } from '@/types/staff'
import { Box, Tooltip, Typography } from '@mui/material'

const StaffBadge = ({ badge = 'badge' }: { badge: string }) => {
  return (
    <Tooltip
      title={StaffPermissionLabels[badge as StaffPermission]}
      placement="top-start"
    >
      <Box className="w-4 aspect-square rounded-full shadow-md flex justify-center items-center bg-blue-100  ">
        <Typography className="text-xs font-bold">
          {badge[0].toUpperCase()}
        </Typography>
      </Box>
    </Tooltip>
  )
}

export default StaffBadge

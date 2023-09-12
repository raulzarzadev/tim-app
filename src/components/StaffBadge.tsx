import { Box, Tooltip, Typography } from '@mui/material'

const StaffBadge = ({ badge = 'badge' }: { badge: string }) => {
  return (
    <Tooltip title={badge} placement="top-start">
      <Box className="w-12 h-12 rounded-full shadow-md flex justify-center items-center ">
        <Typography className="text-lg font-bold">
          {badge[0].toUpperCase()}
        </Typography>
      </Box>
    </Tooltip>
  )
}

export default StaffBadge

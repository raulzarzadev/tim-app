import { useUserCompaniesContext } from '@/context/userCompaniesContext2'

import { useAuthContext } from '@/context/authContext'
import OrdersTabs from './OrdersTabs'
import { Typography } from '@mui/material'

const StaffOrders = () => {
  const { user } = useAuthContext()
  const { orders } = useUserCompaniesContext()

  if (!user) return <div>Cargando...</div>
  const userOrders = orders?.filter(
    (o) => o?.shipping?.assignedToEmail === user?.email
  )
  if (userOrders === undefined) return <Typography>Cargando ....</Typography>
  return <OrdersTabs orders={userOrders || []} />
}

export default StaffOrders

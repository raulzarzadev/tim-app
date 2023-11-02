import { useUserCompaniesContext } from '@/context/userCompaniesContext2'

import { useAuthContext } from '@/context/authContext'
import OrdersTabs from './OrdersTabs'

const StaffOrders = () => {
  const { user } = useAuthContext()
  const { orders } = useUserCompaniesContext()

  if (!user) return <div>Cargando...</div>
  const userOrders = orders?.filter(
    (o) => o?.shipping?.assignedToEmail === user?.email
  )

  return <OrdersTabs orders={userOrders || []} />
}

export default StaffOrders

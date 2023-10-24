import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import OrdersTable from './OrdersTable'

const CompanyOrders = () => {
  const { orders } = useUserCompaniesContext()
  return (
    <div>
      <OrdersTable orders={orders || []} />
    </div>
  )
}

export default CompanyOrders

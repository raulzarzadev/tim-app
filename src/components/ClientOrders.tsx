import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import OrdersTable from './OrdersTable'

const ClientOrders = ({ clientId }: { clientId: string }) => {
  const { orders } = useUserCompaniesContext()
  const clientOrders = orders?.filter((o) => o.client.id === clientId)
  console.log({ clientOrders })
  return (
    <div>
      <OrdersTable orders={clientOrders || []} />
    </div>
  )
}

export default ClientOrders

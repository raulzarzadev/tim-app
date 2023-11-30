'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import BasicTabs from './BasicTabs'
import OrdersTable from './OrdersTable'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { useAuthContext } from '@/context/authContext'

const CompanyDelivery = () => {
  const { orders, services } = useUserCompaniesContext()
  const { user } = useAuthContext()
  const userOrders = orders?.filter(
    (o) => o?.shipping?.assignedToEmail === user?.email
  )
  const pending = userOrders?.filter((o) =>
    o?.items?.some((i) => i?.rentStatus === 'pending')
  )

  const timeOut = userOrders || []

  const withReport = userOrders?.filter((o) =>
    o.items.some((i) => !!services?.find((s) => s.itemId === i.itemId))
  )

  //const onTime = isAfter(asDate(item.rentFinishAt) || new Date(), new Date())
  return (
    <div>
      <BasicTabs
        tabs={[
          {
            label: 'Pendientes',
            content: <OrdersTable orders={pending || []} />
          },
          {
            label: 'Vencidas ',
            content: <OrdersTable orders={timeOut || []} />
          },
          {
            label: 'Reportes',
            content: <OrdersTable orders={withReport || []} />
          }
        ]}
      ></BasicTabs>
    </div>
  )
}

// export default validatePermissions(CompanyDelivery, 'DELIVERY')
export default CompanyDelivery

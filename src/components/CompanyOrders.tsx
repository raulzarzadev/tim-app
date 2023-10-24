import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import OrdersTable from './OrdersTable'
import BasicTabs from './BasicTabs'

const CompanyOrders = () => {
  const { orders } = useUserCompaniesContext()
  const actives = orders?.filter((o) =>
    o?.items?.some((i) => i?.rentStatus === 'taken')
  )
  const pending = orders?.filter((o) =>
    o?.items?.some((i) => i?.rentStatus === 'pending')
  )
  const finished = orders?.filter((o) =>
    o?.items?.some((i) => i?.rentStatus === 'finished')
  )
  return (
    <div>
      <BasicTabs
        tabs={[
          { label: 'Todas', content: <OrdersTable orders={orders || []} /> },
          { label: 'Activas', content: <OrdersTable orders={actives || []} /> },
          {
            label: 'Pendientes',
            content: <OrdersTable orders={pending || []} />
          },
          {
            label: 'Terminadas',
            content: <OrdersTable orders={finished || []} />
          }
        ]}
      />
    </div>
  )
}

export default CompanyOrders

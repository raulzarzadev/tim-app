import { Order } from '@/types/order'
import BasicTabs from './BasicTabs'
import OrdersTable from './OrdersTable'
import { isAfter, isBefore } from 'date-fns'
import forceAsDate from '@/lib/forceAsDate'
import { calculateFinishRentDate } from '@/context/userCompaniesContext2'

const OrdersTabs = ({ orders }: { orders: Partial<Order>[] }) => {
  const ordersWithFinishRent = orders?.map((o) => {
    return {
      ...o,
      items: o?.items?.map((i) => ({
        ...i,
        rentFinishAt: calculateFinishRentDate(
          forceAsDate(i?.rentStartedAt),
          i?.qty,
          i?.unit
        )
      }))
    }
  })
  const actives = ordersWithFinishRent?.filter((o) =>
    o?.items?.some((i) => i?.rentStatus === 'taken')
  )
  const pending = ordersWithFinishRent?.filter((o) =>
    o?.items?.some((i) => i?.rentStatus === 'pending' || !i.rentStatus)
  )
  const finished = ordersWithFinishRent?.filter((o) =>
    o?.items?.some((i) => i?.rentStatus === 'finished')
  )
  const expired = ordersWithFinishRent?.filter((o) =>
    o?.items?.some(
      (i) =>
        i?.rentStatus === 'taken' &&
        isBefore(forceAsDate(i?.rentFinishAt), new Date())
    )
  )

  return (
    <div>
      <BasicTabs
        tabs={[
          {
            label: `Pendientes ${pending?.length}`,
            content: <OrdersTable orders={pending || []} />
          },
          {
            label: `Activas ${actives?.length}`,
            content: <OrdersTable orders={actives || []} />
          },
          {
            label: `Vencidas ${expired?.length}`,
            content: <OrdersTable orders={expired || []} />
          },
          {
            label: `Terminadas ${finished?.length}`,
            content: <OrdersTable orders={finished || []} />
          },
          {
            label: `Todas ${orders?.length}`,
            content: <OrdersTable orders={orders || []} />
          }
        ]}
      />
    </div>
  )
}

export default OrdersTabs

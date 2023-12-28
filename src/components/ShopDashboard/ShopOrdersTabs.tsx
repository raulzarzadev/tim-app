import { Order } from '@/types/order'
import BasicTabs from '../BasicTabs'
import SearchInput from '../SearchInput'
import searchValueInObject from '@/lib/searchValueInObject'
import { useEffect, useState } from 'react'
import { rentFinishAt } from '@/context/lib'
import { orderStatus } from '@/lib/orderStatus'
import asNumber from '@/lib/asNumber'
import ShopOrdersTable from './ShopOrdersTable'

const ShopOrdersTabs = ({
  orders,
  hideActives,
  hideAlls,
  hideFinished,
  hideCanceled,
  hidePendingPayments
}: {
  orders: Partial<Order>[]
  hideActives?: boolean
  hideAlls?: boolean
  hideFinished?: boolean
  hideCanceled?: boolean
  hidePendingPayments?: boolean
}) => {
  const ordersWithFinishRentAt = orders?.map((o) => {
    const status = orderStatus(o)
    return {
      ...o,
      status,
      items: o?.items?.map((i) => {
        const finishAt = i.rentStartedAt
          ? rentFinishAt(i.rentStartedAt, i.qty || 0, i.unit)
          : null

        return {
          ...i,
          rentFinishAt: finishAt
        }
      })
    }
  })

  const handleSearch = (search: string) => {
    const r = ordersWithFinishRentAt.filter((o) =>
      searchValueInObject(o, search)
    )
    if (search === '') {
      setFiltered(ordersWithFinishRentAt || [])
    } else {
      setFiltered(r)
    }
  }

  const [filtered, setFiltered] = useState<Partial<Order>[]>([])

  useEffect(() => {
    setFiltered(ordersWithFinishRentAt)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders])

  if (orders.length === 0)
    return (
      <div className="flex justify-center">
        <p className="text-gray-500">No hay ordenes</p>
      </div>
    )

  const actives = filtered?.filter((o) => o.status === 'taken')
  const pending = filtered?.filter((o) => o.status === 'pending')
  const finished = filtered?.filter((o) => o.status === 'finished')
  const expired = filtered?.filter((o) => o.status === 'expired')
  const canceled = filtered?.filter((o) => o.status === 'canceled')

  const pendingPayments = filtered.filter(
    (o) => asNumber(o.itemsAmount) > asNumber(o?.paymentsAmount)
  )
  return (
    <div>
      <SearchInput
        placeholder="Buscar en todas las pestañas (nombre, teléfono, email)"
        handleSetSearch={handleSearch}
      />
      <BasicTabs
        title="orders"
        tabs={[
          {
            label: `Pendientes ${pending?.length}`,
            content: <ShopOrdersTable orders={pending || []} />
          },
          {
            label: `Vencidas ${expired?.length}`,
            content: <ShopOrdersTable orders={expired || []} />
          },

          {
            label: `Activas ${actives?.length}`,
            content: <ShopOrdersTable orders={actives || []} />,
            hidden: hideActives
          },
          {
            label: `Pagos pendientes ${pendingPayments?.length}`,
            content: <ShopOrdersTable orders={pendingPayments || []} />,
            hidden: hidePendingPayments
          },
          {
            label: `Terminadas ${finished?.length}`,
            content: <ShopOrdersTable orders={finished || []} />,
            hidden: hideFinished
          },
          {
            label: `Canceladas ${canceled?.length}`,
            content: <ShopOrdersTable orders={canceled || []} />,
            hidden: hideCanceled
          },
          {
            label: `Todas ${filtered?.length}`,
            content: <ShopOrdersTable orders={filtered || []} />,
            hidden: hideAlls
          }
        ]}
      />
    </div>
  )
}

export default ShopOrdersTabs

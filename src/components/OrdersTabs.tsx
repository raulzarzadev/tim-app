import { Order } from '@/types/order'
import BasicTabs from './BasicTabs'
import OrdersTable from './OrdersTable'
import { isBefore } from 'date-fns'
import { rentFinishAt } from '@/context/userCompaniesContext2'
import SearchInput from './SearchInput'
import searchValueInObject from '@/lib/searchValueInObject'
import { useEffect, useState } from 'react'

const OrdersTabs = ({
  orders,
  hideActives,
  hideAlls,
  hideFinished
}: {
  orders: Partial<Order>[]
  hideActives?: boolean
  hideAlls?: boolean
  hideFinished?: boolean
}) => {
  const ordersWithFinishRentAt = orders?.map((o) => {
    return {
      ...o,
      items: o?.items?.map((i) => {
        const finishAt = i.rentStartedAt
          ? rentFinishAt(i.rentStartedAt, i.qty || 0, i.unit)
          : null

        return {
          ...i,
          rentFinishAt: finishAt,
          rentStatus:
            i.rentStatus === 'taken' &&
            finishAt &&
            isBefore(finishAt, new Date())
              ? 'expired'
              : i.rentStatus || 'pending'
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

  const actives = filtered?.filter((o) =>
    o?.items?.some((i) => i?.rentStatus === 'taken')
  )
  const pending = filtered?.filter((o) =>
    o?.items?.some((i) => i?.rentStatus === 'pending' || !i.rentStatus)
  )
  const finished = filtered?.filter((o) =>
    o?.items?.some((i) => i?.rentStatus === 'finished')
  )
  const expired = filtered?.filter((o) =>
    o?.items?.some((i) => i?.rentStatus === 'expired')
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
            content: <OrdersTable orders={pending || []} />
          },
          {
            label: `Vencidas ${expired?.length}`,
            content: <OrdersTable orders={expired || []} />
          },
          {
            label: `Activas ${actives?.length}`,
            content: <OrdersTable orders={actives || []} />,
            hidden: hideActives
          },
          {
            label: `Terminadas ${finished?.length}`,
            content: <OrdersTable orders={finished || []} />,
            hidden: hideFinished
          },
          {
            label: `Todas ${filtered?.length}`,
            content: <OrdersTable orders={filtered || []} />,
            hidden: hideAlls
          }
        ]}
      />
    </div>
  )
}

export default OrdersTabs

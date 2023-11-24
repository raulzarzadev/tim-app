import { Order } from '@/types/order'
import BasicTabs from './BasicTabs'
import OrdersTable from './OrdersTable'
import { isBefore } from 'date-fns'
import { rentFinishAt } from '@/context/userCompaniesContext2'
import SearchInput from './SearchInput'
import searchValueInObject from '@/lib/searchValueInObject'
import { useState } from 'react'

const OrdersTabs = ({ orders }: { orders: Partial<Order>[] }) => {
  const ordersWithFinishRentAt = orders?.map((o) => {
    return {
      ...o,
      items: o?.items?.map((i) => ({
        ...i,
        rentFinishAt: rentFinishAt(i.rentStartedAt, i.qty || 0, i.unit),
        rentStatus:
          i.rentStatus === 'taken' &&
          isBefore(
            rentFinishAt(i.rentStartedAt, i.qty || 0, i.unit),
            new Date()
          )
            ? 'expired'
            : i.rentStatus || 'pending'
      }))
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
            label: `Todas ${filtered?.length}`,
            content: <OrdersTable orders={filtered || []} />
          }
        ]}
      />
    </div>
  )
}

export default OrdersTabs

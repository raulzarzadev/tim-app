import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { useEffect, useState } from 'react'

import { Order } from '@/types/order'
import OrdersTable from './OrdersTable'

const ItemOrders = ({ itemId }: { itemId: string }) => {
  const { orders: companyOrders } = useUserCompaniesContext()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const itemOrders =
      companyOrders?.filter((o) =>
        o?.items?.find((i) => i?.itemId === itemId)
      ) || []
    setOrders(itemOrders)
  }, [companyOrders, itemId])

  return (
    <div>
      <OrdersTable orders={orders} />
    </div>
  )
}

export default ItemOrders

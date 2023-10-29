import { dateFormat, fromNow } from '@/lib/utils-date'
import { Order, Payment } from '@/types/order'
import CurrencySpan from './CurrencySpan'
import Modal from './Modal'
import OrderDetails from './OrderDetails'
import MyTable from './MyTable'
import useModal from '@/hooks/useModal'
import { useState } from 'react'
import StaffSpan from './StaffSpan'
import OrderActions from './orders/OrderActions'
import { Tooltip } from '@mui/material'

const OrdersTable = ({ orders }: { orders: Partial<Order>[] }) => {
  const [order, setOrder] = useState<Partial<Order>>()

  const modal = useModal({ title: 'Detalles de orden' })

  return (
    <div>
      <Modal {...modal}>
        <OrderDetails order={order} />
        {order?.id && (
          <OrderActions
            orderId={order.id}
            onAction={(action) => {
              modal.onClose()
            }}
          />
        )}
      </Modal>
      <MyTable
        search
        onRowClick={(id) => {
          setOrder(orders?.find((o) => o?.id === id))
          modal.onOpen()
        }}
        data={{
          headers: [
            {
              label: 'Actualizado',
              key: 'updated.at',
              format: (date) => fromNow(date)
            },
            {
              label: 'Creado',
              key: 'created.at',
              format: (date) => fromNow(date)
            },
            {
              label: 'Programado',
              key: 'shipping.date',
              format: (date) => fromNow(date)
            },
            {
              label: 'Entregado',
              key: 'items.[0].rentStartedAt',

              format: (date) => fromNow(date)
            },
            {
              label: 'Unidades',
              key: 'items.length'
            },
            { label: 'Cliente', key: 'client.name' },
            {
              label: 'Total',
              key: 'payments',
              value: (p) =>
                p?.reduce(
                  (acc: number, curr: Payment) => acc + curr?.amount,
                  0
                ) || 0,
              format: (payments) => (
                <CurrencySpan
                  quantity={payments?.reduce(
                    (acc: number, curr: Payment) => acc + curr?.amount,
                    0
                  )}
                />
              )
            },
            {
              label: 'Asignado',
              key: 'shipping.assignedToEmail',
              value: (v) => v,
              format: (email) => <StaffSpan email={email} />
            }
          ],
          body: orders
        }}
      />
    </div>
  )
}

export default OrdersTable

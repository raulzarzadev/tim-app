import { dateFormat, fromNow } from '@/lib/utils-date'
import { Order, Payment } from '@/types/order'
import CurrencySpan from './CurrencySpan'
import Modal from './Modal'
import OrderDetails from './OrderDetails'
import MyTable from './MyTable'
import useModal from '@/hooks/useModal'
import { useState } from 'react'
import StaffSpan from './StaffSpan'

const OrdersTable = ({ orders }: { orders: Partial<Order>[] }) => {
  const [order, setOrder] = useState<Partial<Order>>()

  const modal = useModal({ title: 'Detalles de orden' })

  return (
    <div>
      <Modal {...modal}>
        <OrderDetails order={order} />
      </Modal>
      <MyTable
        onRowClick={(id) => {
          setOrder(orders?.find((o) => o?.id === id))
          modal.onOpen()
        }}
        data={{
          headers: [
            {
              label: 'Actualizado',
              key: 'updated.at',
              format: (date) => dateFormat(date, 'dd/MMM HH:mm')
            },
            {
              label: 'Creado',
              key: 'created.at',
              format: (date) => dateFormat(date, 'dd/MMM HH:mm')
            },
            {
              label: 'Entrega',
              key: 'shipping.date',
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

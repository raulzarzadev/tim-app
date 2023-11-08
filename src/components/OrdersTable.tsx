import { fromNow } from '@/lib/utils-date'
import { Order } from '@/types/order'
import OrderDetails from './OrderDetails'
import MyTable from './MyTable'
import StaffSpan from './StaffSpan'
import OrderActions from './orders/OrderActions'
import ErrorBoundary from './ErrorBoundary'

const OrdersTable = ({ orders }: { orders: Partial<Order>[] }) => {
  if (!orders.length) return <>Cargando...</>
  return (
    <div>
      <ErrorBoundary componentName="OrdersTable ">
        <MyTable
          modalTitle="Detalles de orden"
          modalChildren={(value) => (
            <>
              <OrderDetails order={value} />
              {value?.id && (
                <OrderActions
                  orderId={value.id}
                  onAction={(action) => {
                    // modal.onClose()
                  }}
                />
              )}
            </>
          )}
          search
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
                label: 'Inicio',
                key: 'items.[0].rentStartedAt',
                format: (date) => fromNow(date)
              },
              {
                label: 'Vence',
                key: 'items.[0].rentFinishAt',
                format: (date) => fromNow(date)
              },
              {
                label: 'Unidades',
                key: 'items.length'
              },
              { label: 'Cliente', key: 'client.name' },
              // {
              //   label: 'Total',
              //   key: 'payments',
              //   value: (p) =>
              //     p?.reduce(
              //       (acc: number, { amount = 0 }: Payment) => acc + amount,
              //       0
              //     ) || 0,
              //   format: (payments) => (
              //     <CurrencySpan
              //       quantity={payments?.reduce(
              //         (acc: number, { amount = 0 }: Payment) => acc + amount,
              //         0
              //       )}
              //     />
              //   )
              // },
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
      </ErrorBoundary>
    </div>
  )
}

export default OrdersTable

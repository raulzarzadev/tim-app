import { fromNow } from '@/lib/utils-date'
import { Order } from '@/types/order'
import OrderDetails from './OrderDetails'
import MyTable from './MyTable'
import StaffSpan from './StaffSpan'
import OrderActions from './orders/OrderActions'
import ErrorBoundary from './ErrorBoundary'
import { calculateOrderTotal } from '@/lib/calculateOrderTotal'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import CurrencySpan from './CurrencySpan'

const OrdersTable = ({ orders }: { orders: Partial<Order>[] }) => {
  const { currentCompany } = useUserCompaniesContext()

  orders?.map((o = {}) => {
    const totalOrder =
      calculateOrderTotal({
        company: currentCompany,
        order: o as Order
      }) || 0
    //@ts-ignore Just add this prop for this table
    o.totalOrder = totalOrder
    return o
  })

  if (!orders) return <>Cargando...</>
  if (orders?.length === 0) return <>No hay ordenes </>

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
                label: 'Cliente',
                key: 'client.name',
                format: (value) => (
                  <div className="truncate">
                    <span>{`${value}`.substring(0, 12)}</span>
                  </div>
                )
              },
              {
                label: 'Adeudo',
                key: 'totalOrder',
                format: (value) => (
                  <span
                    className={`
                    ${value > 0 && 'bg-red-400 text-white'} 
                    ${value === 0 && 'bg-green-600 text-white'}
                    ${value < 0 && 'bg-yellow-400 text-white'}
                    p-1 rounded-md font-bold`}
                  >
                    <CurrencySpan quantity={value} />
                  </span>
                )
              },
              {
                label: 'Asignado',
                key: 'shipping.assignedToEmail',
                value: (v) => {
                  const staffName =
                    currentCompany?.staff?.find((s) => s.email === v)?.name ||
                    ''

                  return staffName || v
                },
                format: (email) => <StaffSpan email={email} />
              },
              {
                label: 'Unidades',
                key: 'items.length'
              },
              {
                label: 'Vence',
                key: 'items.[0].rentFinishAt',
                format: (date) => fromNow(date)
              },
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
              }

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
            ],
            body: orders
          }}
        />
      </ErrorBoundary>
    </div>
  )
}

export default OrdersTable

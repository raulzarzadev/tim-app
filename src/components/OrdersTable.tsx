import forceAsDate from '@/lib/forceAsDate'
import { dateFormat } from '@/lib/utils-date'
import { Order } from '@/types/order'
import CurrencySpan from './CurrencySpan'

const OrdersTable = ({ orders }: { orders: Partial<Order>[] }) => {
  return (
    <div>
      <table className="w-full text-center">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Unidades</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => {
            return (
              <tr key={o.id}>
                <td>
                  {dateFormat(forceAsDate(o.created?.at), 'dd/MM/yy HH:mm')}
                </td>
                <td>{o.client?.name}</td>
                <td>{o.items?.length}</td>
                <td>
                  <CurrencySpan
                    quantity={o.payments?.reduce((a, b) => a + b.amount, 0)}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersTable

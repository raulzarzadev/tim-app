import { Order } from '@/types/order'
import { Typography } from '@mui/material'
import ModalItemDetails from './ModalItemDetails'
import MyTable from './MyTable'
import { dateFormat, fromNow } from '@/lib/utils-date'
import ShippingLink from './ShippingLink'
import ItemChanges from './ItemChanges'
import StaffSpan from './StaffSpan'
import ClientInfo from './ClientInfo'
import OrderActions from './orders/OrderActions'

const OrderDetails = ({ order }: { order?: Partial<Order> }) => {
  return (
    <div>
      <div className="flex   flex-col items-end sm:justify-between sm:flex-row">
        <Typography className="text-center" variant="caption">
          Id: {order?.id}
        </Typography>

        <Typography className="text-center" variant="caption">
          Creada: {fromNow(order?.created?.at)}
        </Typography>
        <Typography className="text-center" variant="caption">
          Ultima actualización: {fromNow(order?.updated?.at)}
        </Typography>
      </div>
      <div className="mb-4">
        <ClientInfo client={order?.client} />
      </div>
      <div>
        <Typography variant="h5">Unidades</Typography>
        {!!order?.items?.length ? (
          <MyTable
            data={{
              headers: [
                {
                  label: 'Unidad',
                  key: 'itemId',
                  format: (value) => (
                    <ModalItemDetails
                      itemId={value}
                      hiddenCurrentStatus
                      showCat
                    />
                  )
                },
                {
                  label: 'status',
                  key: 'rentStatus'
                }
              ],
              body: order?.items || []
            }}
          />
        ) : (
          <Typography>No hay unidades</Typography>
        )}
      </div>
      <div className="mb-4">
        <Typography variant="h5">Pagos</Typography>
        {!!order?.payments?.length ? (
          <MyTable
            data={{
              headers: [
                {
                  label: 'Fecha',
                  key: 'created.at',
                  format: (value) => dateFormat(value, 'dd/MMM HH:mm')
                },
                {
                  label: 'Monto',
                  key: 'amount'
                },
                {
                  label: 'Metodo',
                  key: 'method'
                }
              ],
              body: order?.payments || []
            }}
          />
        ) : (
          <Typography>No hay pagos</Typography>
        )}
      </div>
      <div>
        <Typography variant="h5">Cambios</Typography>
        <ItemChanges changes={order?.changes || []} />
      </div>
      <div>
        <Typography variant="h5">Entrega </Typography>
        <Typography>
          Asignado: <StaffSpan email={order?.shipping?.assignedToEmail || ''} />
        </Typography>
        <Typography>
          Lugar: <ShippingLink address={order?.shipping?.address} />
        </Typography>
        <Typography>
          Hora: {dateFormat(order?.shipping?.date, 'dd/MMM HH:mm')}
        </Typography>
      </div>
    </div>
  )
}

export default OrderDetails

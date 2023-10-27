import { Order } from '@/types/order'
import { Typography } from '@mui/material'
import ModalItemDetails from './ModalItemDetails'
import MyTable from './MyTable'
import { dateFormat } from '@/lib/utils-date'
import ShippingLink from './ShippingLink'
import ItemChanges from './ItemChanges'
import StaffSpan from './StaffSpan'
import ClientInfo from './ClientInfo'

const OrderDetails = ({ order }: { order?: Partial<Order> }) => {
  console.log({ order })
  return (
    <div>
      <Typography className="text-center" variant="caption">
        Id: {order?.id}
      </Typography>
      <div className="mb-4">
        <ClientInfo client={order?.client} />
        {/* <Typography variant="h5">Cliente</Typography>
        <Typography>Cliente: {order?.client?.name}</Typography>
        <Typography>Telefono: {order?.client?.phone}</Typography>
        <Typography>Dirección: {order?.client?.address}</Typography>
        <Typography>Email: {order?.client?.email}</Typography> */}
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
                    <ModalItemDetails itemId={value} hiddenCurrentStatus />
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

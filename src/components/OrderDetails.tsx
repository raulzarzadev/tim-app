import { Order } from '@/types/order'
import { Typography } from '@mui/material'
import ModalItemDetails from './ModalItemDetails'
import MyTable from './MyTable'
import { dateFormat } from '@/lib/utils-date'
import ShippingLink from './ShippingLink'
import ItemChanges from './ItemChanges'

const OrderDetails = ({ order }: { order?: Partial<Order> }) => {
  return (
    <div>
      <div>
        <Typography variant="h5">Cliente</Typography>
        <Typography>Cliente: {order?.client?.name}</Typography>
        <Typography>Telefono: {order?.client?.phone}</Typography>
        <Typography>Dirección: {order?.client?.address}</Typography>
        <Typography>Email: {order?.client?.email}</Typography>
      </div>
      <div>
        <Typography variant="h5">Unidades</Typography>
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
      </div>
      <div>
        <Typography variant="h5">Pagos</Typography>
        <MyTable
          data={{
            headers: [
              {
                label: 'Fecha',
                key: 'date',
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
      </div>
      <div>
        <Typography variant="h5">Cambios</Typography>
        <ItemChanges changes={order?.changes || []} />
      </div>
      <div>
        <Typography variant="h5">Entrega </Typography>
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

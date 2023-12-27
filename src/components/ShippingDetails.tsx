import { Order } from '@/types/order'
import ShippingLink from './ShippingLink'
import { Typography } from '@mui/material'
import { dateFormat, fromNow } from '@/lib/utils-date'
import StaffSpan from './StaffSpan'
import CurrencySpan from './CurrencySpan'

const ShippingDetails = ({ shipping }: { shipping: Order['shipping'] }) => {
  return (
    <div>
      <Typography>
        Fecha:
        {shipping?.date === null
          ? ' Ahora '
          : dateFormat(shipping?.date, 'dd/MMM HH:mm')}
        {/* {fromNow(asDate(shipping.date))} */}
      </Typography>

      <Typography>
        Lugar: <ShippingLink address={shipping?.address} />
      </Typography>
      <Typography>
        Asignado:{' '}
        {shipping?.assignedToEmail ? (
          <StaffSpan email={shipping?.assignedToEmail} />
        ) : (
          'Sin asignar'
        )}
      </Typography>
      <Typography>
        Costo: <CurrencySpan quantity={shipping?.amount || 0} />
      </Typography>
    </div>
  )
}

export default ShippingDetails

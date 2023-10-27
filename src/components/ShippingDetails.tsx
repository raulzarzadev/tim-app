import { Order } from '@/types/order'
import ShippingLink from './ShippingLink'
import { Typography } from '@mui/material'
import { dateFormat, fromNow } from '@/lib/utils-date'
import asDate from '@/lib/asDate'
import StaffSpan from './StaffSpan'
import CurrencySpan from './CurrencySpan'

const ShippingDetails = ({ shipping }: { shipping: Order['shipping'] }) => {
  return (
    <div>
      <Typography>
        Fecha: {dateFormat(shipping.date, 'dd/MMM')}{' '}
        {fromNow(asDate(shipping.date))}
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
        Lugar: <ShippingLink address={shipping.address} />
      </Typography>
      <Typography>
        Costo: <CurrencySpan quantity={shipping.amount || 0} />
      </Typography>
    </div>
  )
}

export default ShippingDetails

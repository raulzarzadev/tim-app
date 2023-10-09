import { dateFormat } from '@/lib/utils-date'
import { Payment } from '@/types/payment'
import { IconButton, Typography } from '@mui/material'
import AppIcon from './AppIcon'
import Link from 'next/link'

const OrderInfo = ({ payment }: { payment: Payment }) => {
  const orderData = payment.order
  return (
    <div>
      <Typography className="font-bold">Información de orden</Typography>
      {!orderData && <>Sin datos de orden</>}
      {orderData && (
        <>
          <Typography>
            {orderData.pickupNow ? 'Entregar ahora' : 'Entregar en tienda'}
          </Typography>
          <Typography>
            Fecha de entrega:{' '}
            {dateFormat(orderData.schedule, ' dd/MM/yy HH:mm')}
          </Typography>
          <Typography>
            Lugar de entrega :{' '}
            {orderData.pickupStore ? 'En tienda' : orderData?.shippingAddress}
            {!orderData.pickupStore && (
              <IconButton
                LinkComponent={Link}
                href={`https://maps.google.com/?q=${orderData.shippingAddress}`}
                target="_blank"
              >
                <AppIcon icon="location" />
              </IconButton>
            )}
          </Typography>
        </>
      )}
    </div>
  )
}

export default OrderInfo

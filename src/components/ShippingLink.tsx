import { Order } from '@/types/order'
import { IconButton } from '@mui/material'
import Link from 'next/link'
import AppIcon from './AppIcon'
import ModalEditShipping from './ModalEditShipping'
import { updateOrder } from '@/firebase/orders'

const ShippingLink = ({
  address
}: {
  address: Order['shipping']['address']
}) => {
  return (
    <span>
      {address === 'store' ? (
        'En tienda'
      ) : (
        <IconButton
          LinkComponent={Link}
          target="_blank"
          href={`https://maps.google.com/?q=${address}`}
        >
          <AppIcon icon="location" />
        </IconButton>
      )}
    </span>
  )
}

export default ShippingLink

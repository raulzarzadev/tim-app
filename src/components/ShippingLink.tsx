import { Order } from '@/types/order'
import { IconButton } from '@mui/material'
import Link from 'next/link'
import AppIcon from './AppIcon'

const ShippingLink = ({
  address
}: {
  address: Order['shipping']['address']
}) => {
  const googleMapsPrefix = ' https://maps.google.com/?q='

  //* Regex checks if the string starts with http
  const regex = /^http/
  const formatted = regex.test(address || '')
    ? address
    : `${googleMapsPrefix}${address}`

  return (
    <span>
      {address === 'store' || !address ? (
        'En tienda'
      ) : (
        <IconButton LinkComponent={Link} target="_blank" href={formatted || ''}>
          <AppIcon icon="location" />
        </IconButton>
      )}
    </span>
  )
}

export default ShippingLink

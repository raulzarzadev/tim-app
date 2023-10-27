import { Order } from '@/types/order'
import { IconButton, Tooltip } from '@mui/material'
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
  const isLink = regex.test(address || '')
  const formatted = isLink ? address : `${googleMapsPrefix}${address}`

  return (
    <Tooltip title={formatted}>
      <span>
        <>
          {address === 'store' || !address ? (
            'En tienda'
          ) : (
            <IconButton
              size="small"
              LinkComponent={Link}
              target="_blank"
              href={formatted || ''}
            >
              <AppIcon icon="location" fontSize="small" />
            </IconButton>
          )}
        </>
      </span>
    </Tooltip>
  )
}

export default ShippingLink

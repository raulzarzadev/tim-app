import { Box, IconButton, Typography } from '@mui/material'
import PreviewImage from './PreviewImage'
import ShippingLink from './ShippingLink'
import { Order } from '@/types/order'
import AppIcon from './AppIcon'
import Link from 'next/link'

const ClientInfo = ({ client }: { client?: Partial<Order['client']> }) => {
  const clientData = client
  if (!clientData) return <>Sin datos de cliente</>
  return (
    <div>
      {/* <div className=" flex justify-center">
        <ModalContactClient client={clientData} />
      </div> */}
      <Box className="flex items-center justify-between">
        <Box>
          {/* <Typography variant="h5">Cliente</Typography> */}
          <Typography>
            <span className="font-bold">Nombre:</span> {clientData?.name}
          </Typography>
          <Typography
            component={'div'}
            className="flex items-center whitespace-nowrap"
          >
            <span className="font-bold"> Teléfono:</span>{' '}
            {clientData?.phone || '-'}{' '}
            {(clientData?.phone?.length || 0) > 3 && (
              <div className="flex items-center">
                <IconButton
                  color="success"
                  LinkComponent={Link}
                  target="_blank"
                  href={`https://wa.me/${clientData?.phone}`}
                >
                  <AppIcon icon="whatsapp" />
                </IconButton>
                <IconButton
                  target="_blank"
                  color="primary"
                  LinkComponent={Link}
                  href={`tel:${clientData?.phone}`}
                >
                  <AppIcon icon="phone" />
                </IconButton>
              </div>
            )}
          </Typography>

          <Typography>
            <span className="font-bold">Email:</span> {clientData?.email || '-'}
          </Typography>
          <Typography>
            <span className="font-bold"> Dirección: </span>
            <ShippingLink address={clientData?.address} />
          </Typography>
          <Typography>
            <span className="font-bold"> Instrucciónes de entrega: </span>
            {clientData?.extraInfo || ''}
          </Typography>
        </Box>
        <Box className="flex justify-center w-1/2 flex-wrap">
          {clientData?.imageID && (
            <PreviewImage
              src={clientData?.imageID}
              alt="Identificacion de usuario"
            />
          )}
          {clientData?.signature && (
            <PreviewImage src={clientData?.signature} alt="Firma de usuario" />
          )}
        </Box>
      </Box>
    </div>
  )
}

export default ClientInfo

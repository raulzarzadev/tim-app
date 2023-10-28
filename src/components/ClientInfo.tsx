import { Payment } from '@/types/payment'
import { Box, Typography } from '@mui/material'
import PreviewImage from './PreviewImage'
import ShippingLink from './ShippingLink'

const ClientInfo = ({ client }: { client: Payment['client'] }) => {
  const clientData = client
  if (!clientData) return <>Sin datos de cliente</>
  return (
    <div>
      {/* <div className=" flex justify-center">
        <ModalContactClient client={clientData} />
      </div> */}
      <Box className="flex items-center justify-between">
        <Box>
          <Typography variant="h5">Cliente</Typography>
          <Typography>Cliente: {clientData?.name}</Typography>
          <Typography>Telefono: {clientData?.phone || '-'}</Typography>
          <Typography>Email: {clientData?.email || '-'}</Typography>
          <Typography>
            Dirección: <ShippingLink address={clientData?.address} />
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

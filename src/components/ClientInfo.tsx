import { Payment } from '@/types/payment'
import { Box, Typography } from '@mui/material'
import PreviewImage from './PreviewImage'
import ModalContactClient from './ModalContactClient'

const ClientInfo = ({ client }: { client: Payment['client'] }) => {
  const clientData = client
  return (
    <div>
      <Typography className="font-bold mt-4 ">
        Información de cliente
      </Typography>
      {!clientData && <>Sin datos de cliente</>}
      {clientData && (
        <Box className="flex items-center justify-between">
          <Box>
            <Typography>Nombre: {clientData?.name}</Typography>
            <Typography>Teléfono: {clientData?.phone}</Typography>
          </Box>
          <ModalContactClient client={clientData} />
          <Box className="flex justify-center w-1/2 flex-wrap">
            {clientData?.imageID && (
              <PreviewImage
                src={clientData?.imageID}
                alt="Identificacion de usuario"
              />
            )}
            {clientData?.signature && (
              <PreviewImage
                src={clientData?.signature}
                alt="Firma de usuario"
              />
            )}
          </Box>
        </Box>
      )}
    </div>
  )
}

export default ClientInfo

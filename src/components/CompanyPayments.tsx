import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { updatePayment } from '@/firebase/payments'
import { Payment } from '@/types/payment'
import { Box, Button, IconButton, Typography } from '@mui/material'
import AppIcon from './AppIcon'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import { dateFormat, fromNow } from '@/lib/utils-date'
import CurrencySpan from './CurrencySpan'
import ModalConfirm from './ModalConfirm'
import useItem from '@/hooks/useItem'
import { ItemSelected } from './CompanyCashbox'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Timestamp } from 'firebase/firestore'
import rentTime from '@/lib/rentTime'
import { addMinutes } from 'date-fns'
import asDate from '@/lib/asDate'
import PreviewImage from './PreviewImage'
import ItemDetails from './ModalItemDetails'
import ModalContactClient from './ModalContactClient'

const CompanyPayments = () => {
  const { payments } = useUserCompaniesContext()
  const sortByDate = (a: Payment, b: Payment) => {
    return (
      (asDate(b.startAt)?.getTime() || 0) - (asDate(a.startAt)?.getTime() || 0)
    )
  }
  return (
    <div>
      {payments?.sort(sortByDate).map((payment) => (
        <Payment key={payment.id} payment={payment} />
      ))}
    </div>
  )
}

const Payment = ({ payment }: { payment: Payment }) => {
  const modal = useModal({ title: 'Detalle de pago' })
  const paymentData = payment.payment
  return (
    <>
      <Modal {...modal}>
        <Typography>
          Fecha de pago: {dateFormat(paymentData.date, ' dd/MM/yy HH:mm')}
        </Typography>
        <Typography>
          Fecha de inicio: {dateFormat(payment.startAt, ' dd/MM/yy HH:mm')}
        </Typography>

        <Typography className="font-bold mt-4">Articluos</Typography>
        <Grid2 container alignItems={'end'}>
          <Grid2 xs={2} className="font-bold truncate">
            Serie/Nombre
          </Grid2>
          <Grid2 xs={3} className="font-bold truncate">
            Categoria
          </Grid2>
          <Grid2 xs={2} className="font-bold truncate">
            Tiempo
          </Grid2>
          <Grid2 xs={2} className="font-bold truncate">
            Precio
          </Grid2>
          <Grid2 xs={3} className="font-bold truncate">
            Entrega
          </Grid2>
          {payment.items.map((item) => (
            <OnRoadItem
              item={item}
              startAt={payment.startAt}
              key={item.itemId}
            />
          ))}
        </Grid2>
        {!!payment?.changes?.length && (
          <Box>
            <Typography className="font-bold mt-4 ">Cambios</Typography>
            {payment?.changes?.map((change, i) => (
              <Box key={i}>
                <ItemDetails itemId={change.oldItemId} />
                {' -> '}
                <ItemDetails itemId={change.newItemId} />{' '}
                <CurrencySpan quantity={change.amount} />
              </Box>
            ))}
          </Box>
        )}
        <Typography className="font-bold mt-4 ">
          Información de cliente
        </Typography>
        <Box className="flex items-center justify-between">
          <Box>
            <Typography>Nombre: {payment?.client?.name}</Typography>
            <Typography>Teléfono: {payment?.client?.phone}</Typography>
          </Box>
          <Box className="flex justify-center w-1/2 flex-wrap">
            {payment?.client?.imageID && (
              <PreviewImage
                src={payment?.client?.imageID}
                alt="Identificacion de usuario"
              />
            )}
            {payment?.client?.signature && (
              <PreviewImage
                src={payment?.client?.signature}
                alt="Firma de usuario"
              />
            )}
          </Box>
        </Box>
        <Typography className="font-bold mt-4">Información de pago</Typography>
        <Typography>
          Total: <CurrencySpan quantity={paymentData.amount} />
        </Typography>
        <Typography>
          Pagado: <CurrencySpan quantity={paymentData.charged} />{' '}
          {paymentData.method}
        </Typography>
        <Typography>
          Cambio: <CurrencySpan quantity={paymentData.rest} />
        </Typography>
        <Typography>
          Precio(usd): <CurrencySpan quantity={paymentData.usdPrice} />
        </Typography>
        <Typography>descuento: {paymentData.discount || 0}</Typography>
        <Box className="flex justify-evenly my-4">
          <ModalConfirm
            color="error"
            label="Cancelar"
            handleConfirm={() => {
              console.log('Canclear pago')
              updatePayment(payment.id, { isCancelled: true })
            }}
          >
            <Typography>¿Esta seguro que desea cancelar el pago?</Typography>
          </ModalConfirm>
          <Button variant="outlined" disabled>
            Editar
          </Button>
        </Box>
      </Modal>
      <Box key={payment.id} className="p-2 my-2 rounded-md shadow-md">
        <Box className="flex w-full justify-between">
          <Box>
            {payment.isCancelled && (
              <span className="border-2 border-red-500 p-1">Cancelado</span>
            )}
          </Box>
          <IconButton
            size="small"
            onClick={(e) => {
              modal.onOpen()
            }}
          >
            <AppIcon icon="info" />
          </IconButton>
        </Box>
        <Box className="grid grid-cols-3">
          <Box className="flex items-center ">
            <Typography>{payment.client?.name}</Typography>
            <ModalContactClient client={payment.client} />
          </Box>
          <Typography>
            Inicio: {dateFormat(payment.startAt, ' dd/MM/yy HH:mm')}
          </Typography>
          <Typography>
            Por entregar : {payment.items.filter((i) => i.inUse ?? true).length}
          </Typography>
        </Box>
        {/* <Typography>Articulos : {payment.items.length}</Typography>
        {!!payment?.changes?.length && (
          <Typography>Cambios : {payment?.changes?.length}</Typography>
        )}
        <Typography>
          Por entregar : {payment.items.filter((i) => i.inUse ?? true).length}
        </Typography> */}
      </Box>
    </>
  )
}

const OnRoadItem = ({
  item,
  startAt
}: {
  item: ItemSelected
  startAt: Date | Timestamp
}) => {
  const itemsDetails = useItem({ itemId: item.itemId })
  const shouldDelivery = (item: ItemSelected) => {
    // startAt +( qty * unit)
    const rentMinutes = rentTime(item.qty || 0, item.unit)
    const endsAt = addMinutes(asDate(startAt) as Date, rentMinutes)
    return fromNow(endsAt)
  }
  return (
    <>
      <Grid2 xs={2}>{itemsDetails?.serialNumber || itemsDetails?.name} </Grid2>
      <Grid2 xs={3}>{itemsDetails?.category}</Grid2>
      <Grid2 xs={2}>
        {item.qty}x {item.unit}
      </Grid2>
      <Grid2 xs={2}>
        <Typography className="truncate">
          {itemsDetails?.ownPrice ? 'Individual' : 'Categoria'}
        </Typography>
      </Grid2>
      <Grid2 xs={3}> {shouldDelivery(item)}</Grid2>
    </>
  )
}

export default CompanyPayments

import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { listenCompanyActivePayments, updatePayment } from '@/firebase/payments'
import { Payment } from '@/types/payment'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
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

const CompanyPayments = () => {
  const { currentCompany } = useUserCompaniesContext()
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    listenCompanyActivePayments(currentCompany?.id || '', setPayments)
  }, [currentCompany?.id])

  const sortByDate = (a: Payment, b: Payment) => {
    return (
      (asDate(b.startAt)?.getTime() || 0) - (asDate(a.startAt)?.getTime() || 0)
    )
  }
  return (
    <div>
      {payments.sort(sortByDate).map((payment) => (
        <Payment key={payment.id} payment={payment} />
      ))}
    </div>
  )
}

const Payment = ({ payment }: { payment: Payment }) => {
  const modal = useModal({ title: 'Detalle de pago' })
  const paymentData = payment.payment
  return (
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
            <Grid2 xs={3} className="font-bold">
              Categoria
            </Grid2>
            <Grid2 xs={2} className="font-bold">
              Tiempo
            </Grid2>
            <Grid2 xs={2} className="font-bold">
              Precio
            </Grid2>
            <Grid2 xs={3} className="font-bold">
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
          <Typography className="font-bold mt-4">
            Información de Cliente
          </Typography>
          <Box className="flex items-center">
            <Box>
              <Typography>Nombre: {payment?.client?.name}</Typography>
              <Typography>Telefono: {payment?.client?.phone}</Typography>
            </Box>
            <Box className="flex">
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
          <Typography className="font-bold mt-4">
            Información de pago
          </Typography>
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
            <Button variant="outlined">Editar</Button>
          </Box>
        </Modal>
      </Box>
      <Typography>
        Inicio: {dateFormat(payment.startAt, ' dd/MM/yy HH:mm')}
      </Typography>

      <Typography>Articulos : {payment.items.length}</Typography>
      <Typography>
        Por entregar : {payment.items.filter((i) => i.inUse ?? true).length}
      </Typography>
    </Box>
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
      <Grid2 xs={2}>{itemsDetails?.ownPrice ? 'Ind' : 'Cat'}</Grid2>
      <Grid2 xs={3}> {shouldDelivery(item)}</Grid2>
    </>
  )
}

export default CompanyPayments

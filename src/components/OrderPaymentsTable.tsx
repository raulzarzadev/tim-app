import useModal from '@/hooks/useModal'
import { Payment } from '@/types/order'
import Modal from './Modal'
import { Box, Typography } from '@mui/material'
import asDate from '@/lib/asDate'
import { dateFormat } from '@/lib/utils-date'
import CurrencySpan from './CurrencySpan'

const OrderPaymentsTable = ({ payments }: { payments: Payment[] }) => {
  const modalPay = useModal()
  return (
    <div>
      <Typography className="text-center font-bold mt-6">Pagos</Typography>
      {!payments?.length ? (
        <>
          <button
            onClick={(e) => {
              e.preventDefault()
              modalPay.onOpen()
            }}
            className="text-center font-bold bg-yellow-400 shadow-md rounded-md p-1 w-full"
          >
            Sin pagos
          </button>
          <Modal {...modalPay}>
            <Box className="text-center ">
              <Typography className="my-4">No hay pagos registrados</Typography>
            </Box>
          </Modal>
        </>
      ) : (
        <Box>
          <Box className="grid grid-cols-6 place-content-center items-center text-center shadow-md rounded-md p-1 m-1 ">
            <Typography className="col-span-2">Fecha</Typography>
            <Typography>Metodo</Typography>
            <Typography>Status</Typography>
            <Typography>Dolar $</Typography>
            <Typography>Total</Typography>
          </Box>
          {payments
            ?.sort(
              (a, b) =>
                (asDate(b.date)?.getTime() || 0) -
                (asDate(a.date)?.getTime() || 0)
            )
            ?.map((p, i) => {
              return (
                <Box
                  key={i}
                  className="grid grid-cols-6 place-content-center items-center text-center shadow-md rounded-md p-1 m-1 "
                >
                  <Typography className="col-span-2">
                    {dateFormat(asDate(p.date), 'EEE dd-MM-yy HH:mm')}
                  </Typography>
                  <Typography>{p.method}</Typography>
                  <Typography>
                    {p.isCancelled ? 'Cancelado' : 'Pagado'}
                  </Typography>
                  <Typography>
                    <CurrencySpan quantity={p.usdPrice} />
                  </Typography>
                  <Typography>
                    <CurrencySpan quantity={p.amount}></CurrencySpan>
                  </Typography>
                </Box>
              )
            })}
        </Box>
      )}
    </div>
  )
}

export default OrderPaymentsTable

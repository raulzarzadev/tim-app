import { Typography } from '@mui/material'
import CurrencySpan from './CurrencySpan'
import { Payment } from '@/types/payment'

const PaymentInfo = ({ payment }: { payment: Payment }) => {
  const paymentData = payment?.payment
  return (
    <div>
      <Typography className="font-bold mt-4">Información de pago</Typography>
      {!paymentData && <>Sin datos de pago aún</>}
      {paymentData && (
        <>
          <Typography>
            Total: <CurrencySpan quantity={paymentData?.amount} />
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
        </>
      )}
    </div>
  )
}

export default PaymentInfo

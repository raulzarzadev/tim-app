import { Box, Typography } from '@mui/material'
import CurrencySpan from '../CurrencySpan'
import { BalanceData } from '@/types/balance'
import ErrorBoundary from '../ErrorBoundary'
import { dateFormat, fromNow } from '@/lib/utils-date'
import forceAsDate from '@/lib/forceAsDate'
import ModalItemDetails from '../ModalItemDetails'

const BalanceCard = ({ balance }: { balance: BalanceData }) => {
  return (
    <Box>
      <ErrorBoundary componentName="BalanceCard">
        <Box className="grid mx-2 text-center place-content-center">
          <span>
            Creado:{' '}
            {dateFormat(forceAsDate(balance?.created?.at), 'dd/MM/yy HH:mm')}
          </span>
          <span className="text-xs italic mb-4">
            {fromNow(forceAsDate(balance?.created?.at))}
          </span>
        </Box>
        <Box className="flex text-center place-content-center">
          <Box className="grid mx-2">
            <span>
              Desde: {dateFormat(forceAsDate(balance?.from), 'dd/MM/yy HH:mm')}
            </span>
            <span className="text-xs italic mb-4">
              {fromNow(forceAsDate(balance?.from))}
            </span>
          </Box>
          <Box className="grid mx-2">
            <span>
              Hasta: {dateFormat(forceAsDate(balance?.to), 'dd/MM/yy HH:mm')}
            </span>
            <span className="text-xs italic mb-4">
              {fromNow(forceAsDate(balance?.to))}
            </span>
          </Box>
        </Box>
        <Typography>Ordenes: {balance?.orders?.length || 0}</Typography>
        <Typography>Pagos: {balance?.payments?.length || 0}</Typography>
        <Typography>Cambios: {balance?.changes?.length}</Typography>
        <Typography>
          Unidades rentadas: {balance?.itemsStats?.length}
        </Typography>
        <Typography component={'div'} className="flex ">
          <div className="text-end w-48">Efectivo: </div>
          <div className="w-28 ml-2 text-start">
            <CurrencySpan quantity={balance.paymentsMethods?.mxn} />
          </div>
        </Typography>
        <Typography component={'div'} className="flex ">
          <div className="text-end w-48">Dolares:</div>
          <div className="w-28 ml-2 text-start">
            <CurrencySpan quantity={balance.paymentsMethods?.usd} />
          </div>
        </Typography>
        <Typography component={'div'} className="flex ">
          <div className="text-end w-48">Tarjeta:</div>
          <div className="w-28 ml-2 text-start">
            <CurrencySpan quantity={balance.paymentsMethods?.card} />
          </div>
        </Typography>
        <Typography component={'div'} className="flex ">
          <div className="text-end w-48">Total: </div>
          <div className="w-28 ml-2 text-start">
            <CurrencySpan quantity={balance.totalFromPayments} />
          </div>
        </Typography>
        <div>
          {balance?.orders?.map((o) => (
            <div
              key={o.id}
              className="grid grid-cols-3 place-items-center items-center"
            >
              <div>{o.client?.name}</div>
              <div>
                <CurrencySpan
                  quantity={o.payments?.reduce((a, b) => a + b.amount, 0)}
                />
              </div>
              <div className="">
                {o.items?.length || 0}
                {/* {o.items?.map((i) => (
                  <div key={i.itemId}>
                    <ModalItemDetails itemId={i.itemId || ''} /> {i.qty}x
                    {i.unit}
                  </div>
                ))} */}
              </div>
            </div>
          ))}
        </div>
      </ErrorBoundary>
    </Box>
  )
}

export default BalanceCard

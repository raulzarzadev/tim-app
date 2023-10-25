import { Box, Typography } from '@mui/material'
import CurrencySpan from '../CurrencySpan'
import { BalanceData } from '@/types/balance'
import ErrorBoundary from '../ErrorBoundary'
import { dateFormat, fromNow } from '@/lib/utils-date'
import forceAsDate from '@/lib/forceAsDate'
import AccordionSections from '../AccordionSections'
import OrderItemsStats from '../OrderItemsStats'
import OrdersTable from '../OrdersTable'

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

        <AccordionSections
          sections={[
            {
              title: 'Detalle de ordenes',
              subTitle: `${balance?.orders?.length || 0}`,
              content: <OrdersTable orders={balance?.orders || []} />
            },
            {
              title: 'Datalle de unidades',
              subTitle: `${balance.itemsStats?.length || 0}`,
              content: <OrderItemsStats itemsStats={balance.itemsStats || []} />
            }
          ]}
        />
      </ErrorBoundary>
    </Box>
  )
}

export default BalanceCard

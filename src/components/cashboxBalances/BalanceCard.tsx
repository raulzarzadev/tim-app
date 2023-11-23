import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import CurrencySpan from '../CurrencySpan'
import { BalanceData } from '@/types/balance'
import ErrorBoundary from '../ErrorBoundary'
import { dateFormat, fromNow } from '@/lib/utils-date'
import forceAsDate from '@/lib/forceAsDate'
import AccordionSections from '../AccordionSections'
import OrdersTable from '../OrdersTable'
import { PaymentMethods, paymentMethods } from '@/CONSTS/paymentMethods'
import MyTable from '../MyTable'
import OrderDetails from '../OrderDetails'
import dictionary from '@/CONSTS/dictionary'
import StaffSpan from '../StaffSpan'
import AppIcon from '../AppIcon'

const BalanceCard = ({ balance }: { balance: BalanceData }) => {
  console.log({ balance })
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
        {/* TODO: Calcular cambios realizados en dicho periodo */}
        {/* <Typography>Cambios: {balance?.changes?.length || 0}</Typography> */}
        <div className="mt-6"></div>
        {paymentMethods.map((method) => (
          <Typography key={method.type} component={'div'} className="flex ">
            <div className="text-end w-48 capitalize">{method.label}: </div>
            <div className="w-28 ml-2 text-start">
              <CurrencySpan
                quantity={
                  balance?.paymentsMethods?.[method.type as PaymentMethods]
                }
              />
            </div>
          </Typography>
        ))}
        <Typography
          variant="h5"
          className="text-center mt-4 place-items-start flex justify-center"
        >
          Total: <CurrencySpan quantity={balance.paymentsMethods?.total} />
          <Tooltip title="Este monto puede variar, según el precio del dólar en cada transacción.">
            <IconButton size="small">
              <AppIcon icon="info" className="text-sm text-blue-400" />
            </IconButton>
          </Tooltip>
        </Typography>
        <AccordionSections
          sections={[
            {
              title: 'Lista de pagos',
              subTitle: `${balance?.payments?.length || 0}`,
              content: (
                <MyTable
                  modalChildren={(value) => {
                    if (value === undefined)
                      return <Typography>Sin información</Typography>
                    return (
                      <OrderDetails
                        order={balance.orders?.find(
                          (o) => o?.id === value?.orderId
                        )}
                      />
                    )
                  }}
                  data={{
                    headers: [
                      {
                        label: 'Fecha',
                        key: 'created.at',
                        format: (value) =>
                          dateFormat(forceAsDate(value), 'dd/MM/yy HH:mm')
                      },
                      {
                        label: 'Monto',
                        key: 'totalPaid',
                        format: (value) => <CurrencySpan quantity={value} />
                      },
                      {
                        label: 'Metodo',
                        key: 'method',
                        format: (value) => dictionary(value)
                      },
                      {
                        label: 'Cobrado por',
                        key: 'created.by',
                        format: (value) => {
                          return <StaffSpan email={value} />
                        }
                      },
                      {
                        label: 'Cliente',
                        key: 'orderId',
                        format: (value) => {
                          return balance.orders?.find((o) => o.id === value)
                            ?.client?.name
                        }
                      }
                    ],
                    body: balance?.payments || []
                  }}
                />
              )
            },
            {
              title: 'Detalle de ordenes',
              subTitle: `${balance?.orders?.length || 0}`,
              content: <OrdersTable orders={balance?.orders || []} />
            }
            // TODO: Calcular detalle de unidades
            // {
            //   title: 'Detalle de unidades',
            //   subTitle: `${balance.itemsStats?.length || 0}`,
            //   content: <OrderItemsStats itemsStats={balance.itemsStats || []} />
            // }
          ]}
        />
      </ErrorBoundary>
    </Box>
  )
}

export default BalanceCard

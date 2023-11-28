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
import { isAfter, isBefore } from 'date-fns'
import useModal from '@/hooks/useModal'
import Modal from '../Modal'

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
        <BalanceInfo balance={balance} />

        {/* <Typography>Ordenes: {balance?.orders?.length || 0}</Typography>
        <Typography>Pagos: {balance?.payments?.length || 0}</Typography> */}
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

const isBetweenDates = (date: Date, date1: Date, date2: Date) => {
  if (!date) return false
  if (!date1 || !date2) return false
  return isAfter(date, date1) && isBefore(date, date2)
}
const BalanceInfo = ({ balance }: { balance: BalanceData }) => {
  const renewedOrders = balance.orders?.filter((o) => o.status === 'renewed')
  const balanceItems = balance?.orders
    ?.map((o) =>
      o.items?.map((i) => {
        //@ts-ignore is just used for this table
        i.orderId = o.id
        return i
      })
    )
    .flat()
  const itemsRentStarted = balanceItems?.filter((i) =>
    isBetweenDates(
      forceAsDate(i?.rentStartedAt),
      forceAsDate(balance.from),
      forceAsDate(balance.to)
    )
  )
  const itemsRentFinished = balanceItems?.filter(
    (i) =>
      i?.rentFinishedAt &&
      isBetweenDates(
        forceAsDate(i?.rentFinishedAt),
        forceAsDate(balance.from),
        forceAsDate(balance.to)
      )
  )
  const balancePayments = balance.payments
  // console.log({ itemsRentStarted })
  const ordersStarted = balance.orders?.filter((o) =>
    //@ts-ignore
    itemsRentStarted?.find((i) => i?.orderId === o.id)
  )
  const ordersFinished = balance.orders?.filter((o) =>
    //@ts-ignore
    itemsRentFinished?.find((i) => i?.orderId === o.id)
  )
  //  console.log({ ordersStarted })
  return (
    <>
      <Typography className="text-center font-bold mt-4 ">Rentas</Typography>
      <Box className="flex justify-evenly">
        <SpanInfo
          title="Iniciadas"
          info={`${itemsRentStarted?.length}`}
          modalChildren={
            <>
              <OrdersTable orders={ordersStarted || []} />
            </>
          }
        />
        <SpanInfo
          title="Renovadas"
          info={`${renewedOrders?.length}`}
          modalChildren={<OrdersTable orders={renewedOrders || []} />}
        />
        <SpanInfo
          title="Finalizadas"
          info={`${itemsRentFinished?.length}`}
          modalChildren={
            <>
              <OrdersTable orders={ordersFinished || []} />
            </>
          }
        />
      </Box>
      <Typography className="text-center font-bold mt-4 ">Pagos</Typography>
      <Box className="flex justify-evenly">
        <SpanInfo
          title="Realizados"
          info={`${balancePayments?.length}`}
          modalChildren={
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
                      return balance.orders?.find((o) => o.id === value)?.client
                        ?.name
                    }
                  }
                ],
                body: balance?.payments || []
              }}
            />
          }
        />
        {/* <SpanInfo title="Pendientes" info={`${balance?.payments?.length}`} /> */}
      </Box>
    </>
  )
}
const SpanInfo = ({
  title,
  info,
  modalChildren
}: {
  title: string
  info?: string
  modalChildren?: React.ReactNode
}) => {
  const modal = useModal({ title: title })
  return (
    <>
      <Modal {...modal}>{modalChildren}</Modal>
      <Typography className="grid place-content-center text-center  border-2 p-2 ">
        <span>{title}</span>{' '}
        <button
          onClick={modal.onOpen}
          className="cursor-pointer hover:shadow-lg bg-blue-100 hover:bg-blue-200 rounded-full p-1 font-bold text-lg"
        >
          {info}
        </button>
      </Typography>
    </>
  )
}

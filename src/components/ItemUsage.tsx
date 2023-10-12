import { ItemOrder } from '@/context/userCompaniesContext2'
import useModal from '@/hooks/useModal'
import { isAfter } from 'date-fns'
import ErrorBoundary from './ErrorBoundary'
import { Box, Button, Typography } from '@mui/material'
import { dateFormat, fromNow } from '@/lib/utils-date'
import asDate from '@/lib/asDate'
import AppIcon from './AppIcon'
import ChangeItem from './ChangeItem'
import Modal from './Modal'
import { finishItemRent, startItemRent, resumeRent } from '@/firebase/orders'
import ModalPayment from './ModalPayment2'
import { calculateTotal } from '@/lib/calculateTotalItem'
const ItemUsage = ({
  item,
  onCloseParent
}: {
  item: ItemOrder
  onCloseParent?: () => void
}) => {
  const handleFinishRent = async (item: ItemOrder) => {
    await finishItemRent(item.order.id, item?.id || '')
    onCloseParent?.()
    return
  }
  const modal = useModal({ title: `Cambiar articulo` })
  const modalPay = useModal({ title: `Pagar` })
  // const moreItemsInUse = [...finished, ...inUse].filter(
  //   (i) => i.paymentId === item.paymentId && i.id !== item.itemId
  // )

  const rentalReturn = item.rentStatus === 'finished'
  const inUse = item.rentStatus === 'taken'
  const pending = item.rentStatus === 'pending'

  const onTime = isAfter(asDate(item.rentFinishAt) || new Date(), new Date())

  const handleCancelFinishRent = async (item: Partial<ItemOrder>) => {
    await resumeRent({ itemId: item?.id || '', orderId: item?.order?.id || '' })
    onCloseParent?.()
    return
  }

  const handleStartItemRent = async (item: Partial<ItemOrder>) => {
    await startItemRent(item?.order?.id, item?.id || '')
    onCloseParent?.()
    return
  }

  const payments = item?.order?.payments
  console.log(item.unit, item.qty, item.prices)
  const amount = calculateTotal(item.unit, item.qty, item.prices)
  console.log({ amount })
  return (
    <ErrorBoundary>
      <Box className="my-4">
        <Typography className="text-center">
          {item.order?.client?.name}
        </Typography>
        <Typography className="text-center">
          Entrega: {dateFormat(item.rentFinishAt, 'dd/MM HH:mm')}
          <Typography variant="caption" className="text-center">
            {' '}
            {fromNow(asDate(item.rentFinishAt))}
          </Typography>
        </Typography>
      </Box>
      <Box className="grid gap-2">
        {!onTime && !rentalReturn && (
          <Typography className="text-center  font-bold" color={'error'}>
            Unidad fuera de tiempo.
          </Typography>
        )}
        <Typography className="text-center my-4">
          Revisa que la unidad este en buen estado.
        </Typography>
        <Box className="flex w-full gap-4">
          <Button
            fullWidth
            onClick={(e) => {
              e.preventDefault()
              modal.onOpen()
            }}
            variant="outlined"
            color="info"
          >
            Cambiar <AppIcon icon="switch" />
          </Button>
          {rentalReturn && (
            <Button
              fullWidth
              onClick={(e) => {
                e.preventDefault()
                handleCancelFinishRent(item)
              }}
              variant="outlined"
              color="warning"
            >
              {`Regresar ${item.category} ${item.serialNumber || item.name}`}
            </Button>
          )}
          {inUse && (
            <Button
              fullWidth
              onClick={(e) => {
                e.preventDefault()
                handleFinishRent(item)
              }}
              variant="outlined"
              color="success"
            >
              {`Recibir ${item.category} ${item.serialNumber || item.name}`}
            </Button>
          )}
          {pending && (
            <Button
              fullWidth
              onClick={(e) => {
                e.preventDefault()
                handleStartItemRent(item)
              }}
              variant="outlined"
              color="success"
            >
              {`Inciar renta de: ${item.category} ${
                item.serialNumber || item.name
              }`}
            </Button>
          )}
        </Box>
        <Box>
          {!payments?.length && (
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
                  <Typography className="my-4">
                    No hay pagos registrados
                  </Typography>
                  <ModalPayment amount={100} />
                </Box>
              </Modal>
            </>
          )}
          <Box>
            {payments?.map((p, i) => {
              console.log({ p })
              return (
                <Box
                  key={i}
                  className="grid grid-cols-2 place-content-center items-center text-center shadow-md rounded-md p-1 m-1 "
                >
                  <Typography>{dateFormat(asDate(p.date))}</Typography>
                  <Typography>{p.amount}</Typography>
                </Box>
              )
            })}
          </Box>
        </Box>

        {/* TODO: add this functionality
         {!!moreItemsInUse?.length && (
          <Box>
            <Typography className="text-center font-bold mt-6">
              Otras unidades del mismo cliente
            </Typography>
            <Box>
              {moreItemsInUse.map((item, i) => (
                <ItemInUserRow key={i} item={item} />
              ))}
            </Box>
          </Box>
        )} */}
        <Modal {...modal}>
          <ChangeItem item={item} />
        </Modal>
      </Box>
    </ErrorBoundary>
  )
}

export default ItemUsage

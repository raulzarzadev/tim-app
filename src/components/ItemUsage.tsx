import {
  ItemOrder,
  useUserCompaniesContext
} from '@/context/userCompaniesContext2'
import useModal from '@/hooks/useModal'
import { isAfter } from 'date-fns'
import ErrorBoundary from './ErrorBoundary'
import { Box, Button, Typography } from '@mui/material'
import asDate from '@/lib/asDate'
import AppIcon from './AppIcon'
import ChangeItem from './ChangeItem'
import Modal from './Modal'
import { finishItemRent, startItemRent, resumeRent } from '@/firebase/orders'
import ModalPayment from './ModalPayment2'
import { calculateFullTotal, calculateTotal } from '@/lib/calculateTotalItem'
import ShippingLink from './ShippingLink'
import ItemInUserRow from './ItemInUserRow2'
import OrderPaymentsTable from './OrderPaymentsTable'
import ItemRentStatus from './ItemRentStatus'

const ItemUsage = ({
  item,
  onCloseParent
}: {
  item: ItemOrder
  onCloseParent?: () => void
}) => {
  const { companyItems, ordersItems } = useUserCompaniesContext()

  const modal = useModal({ title: `Cambiar articulo` })
  const modalPay = useModal({ title: `Pagar` })
  const moreUserOrderItems = item.order.items
    .filter((i) => i.itemId !== item.itemId)
    .map((i) =>
      ordersItems.all.find(
        (searchItem) =>
          searchItem.id === i.itemId && searchItem.order.id === item.order.id
      )
    )

  const handleFinishRent = async (item: ItemOrder) => {
    onCloseParent?.()
    await finishItemRent(item.order.id, item?.id || '')
    return
  }
  const handleCancelFinishRent = async (item: Partial<ItemOrder>) => {
    onCloseParent?.()
    await resumeRent({ itemId: item?.id || '', orderId: item?.order?.id || '' })
    return
  }

  const handleStartItemRent = async (item: Partial<ItemOrder>) => {
    onCloseParent?.()
    await startItemRent(item?.order?.id, item?.id || '')
    return
  }

  const payments = item?.order?.payments

  const inUse = item.rentStatus === 'taken'
  const pending = item.rentStatus === 'pending'
  const onTime = isAfter(asDate(item.rentFinishAt) || new Date(), new Date())
  const finished = item.rentStatus === 'finished'
  const itemTotals = calculateTotal(item.unit, item.qty, item.prices)
  const orderTotal = calculateFullTotal(
    item.order.items,
    item.order.items?.map((i) => companyItems.find((c) => c.id === i.itemId))
  )

  //console.log({ orderTotal })
  return (
    <ErrorBoundary>
      <Box className="my-4">
        <Typography className="text-center">
          {item.order?.client?.name}
        </Typography>
        <Typography className="text-center font-bold my-4">
          {item.category} {item.serialNumber || item.name}
        </Typography>
        {/* {pending && (
          <Box className="text-center">
            <Typography>
              Comienza: {dateFormat(asDate(item.rentStartAt), 'dd/MM HH:mm')}
            </Typography>
          </Box>
        )} */}
        {/* <Typography className="text-center">
          Entrega: {dateFormat(item.rentFinishAt, 'dd/MM HH:mm')}
          <Typography variant="caption" className="text-center">
            {' '}
            {fromNow(asDate(item.rentFinishAt))}
          </Typography>
        </Typography> */}
        <Typography className="text-center">
          Lugar : <ShippingLink address={item.order.shipping.address} />
        </Typography>
      </Box>
      <Box className="grid gap-2">
        {/* {!onTime && !finished && (
          <Typography className="text-center  font-bold" color={'error'}>
            Unidad fuera de tiempo.
          </Typography>
        )} */}
        <Typography className="text-center my-4">
          Revisa que la unidad este en buen estado.
        </Typography>
        <Box className="grid gap-4 max-w-xs mx-auto">
          {!finished && onTime && (
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
          )}
          {finished && (
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
          <Box>
            <ItemRentStatus item={item} />
          </Box>
          {/* {inUse && (
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
          )} */}
        </Box>
        <Box>
          <Box className="flex justify-evenly my-4">
            {/* <ModalPayment
              label="Pagar articulo"
              amount={itemTotals.total}
              orderId={item?.order?.id}
              onCloseParent={modalPay.onClose}
            /> */}
            {/* <ModalPayment
              label="Pagar orden "
              amount={orderTotal}
              orderId={item?.order?.id}
              onCloseParent={modalPay.onClose}
            /> */}
          </Box>

          <OrderPaymentsTable payments={payments} />
        </Box>

        {!!moreUserOrderItems?.length && (
          <Box>
            <Typography className="text-center font-bold mt-6">
              Otras unidades del mismo cliente
            </Typography>
            <Box>
              {moreUserOrderItems.map((item, i) =>
                item ? <ItemInUserRow key={i} item={item} /> : null
              )}
            </Box>
          </Box>
        )}
        <Modal {...modal}>
          <ChangeItem item={item} />
        </Modal>
      </Box>
    </ErrorBoundary>
  )
}

export default ItemUsage

import {
  ItemOrder,
  useUserCompaniesContext
} from '@/context/userCompaniesContext2'
import useModal from '@/hooks/useModal'
import { isAfter } from 'date-fns'
import ErrorBoundary from './ErrorBoundary'
import { Box, Button, Typography } from '@mui/material'
import { dateFormat, fromNow } from '@/lib/utils-date'
import asDate from '@/lib/asDate'
import AppIcon from './AppIcon'
import ChangeItem from './ChangeItem'
import Modal from './Modal'
import { finishItemRent, startItemRent } from '@/firebase/orders'
const ItemUsage = ({
  item,
  onCloseParent
}: {
  item: ItemOrder
  onCloseParent?: () => void
}) => {
  const {
    ordersItems: { finished, inUse }
  } = useUserCompaniesContext()
  const handleFinishRent = async (item: ItemOrder) => {
    onCloseParent?.()
    return await finishItemRent(item.order.id, item?.id || '')
  }
  const modal = useModal({ title: `Cambiar articulo` })

  // const moreItemsInUse = [...finished, ...inUse].filter(
  //   (i) => i.paymentId === item.paymentId && i.id !== item.itemId
  // )

  const rentalReturn = (item.inUse ?? false) === false

  const onTime =
    item.rentFinishAt &&
    isAfter(asDate(item.rentFinishAt) || new Date(), new Date())
  const handleCancelFinishRent = async (item: Partial<ItemOrder>) => {
    onCloseParent?.()
    return await startItemRent(item?.order?.id, item?.id || '')
  }
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
          {rentalReturn ? (
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
          ) : (
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

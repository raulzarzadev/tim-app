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
import ShippingLink from './ShippingLink'
import ItemInUserRow from './ItemInUserRow2'
import OrderPaymentsTable from './OrderPaymentsTable'
import ItemRentStatus from './ItemRentStatus'
import ItemChanges from './ItemChanges'

const ItemUsage = ({
  item,
  onCloseParent
}: {
  item: ItemOrder
  onCloseParent?: () => void
}) => {
  const { ordersItems } = useUserCompaniesContext()

  const modal = useModal({ title: `Cambiar articulo` })
  const moreUserOrderItems = item.order.items
    .filter((i) => i.itemId !== item.itemId)
    .map((i) =>
      ordersItems.all.find(
        (searchItem) =>
          searchItem.id === i.itemId && searchItem.order.id === item.order.id
      )
    )

  const payments = item?.order?.payments

  const onTime = isAfter(asDate(item.rentFinishAt) || new Date(), new Date())
  const finished = item.rentStatus === 'finished'

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

        <Typography className="text-center">
          Lugar : <ShippingLink address={item.order.shipping.address} />
        </Typography>
      </Box>
      <Box className="grid gap-2">
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
          <Box>
            <ItemRentStatus item={item} />
          </Box>
        </Box>
        <Box>
          <OrderPaymentsTable payments={payments} />
        </Box>
        <ItemChanges changes={item?.order?.changes} />

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

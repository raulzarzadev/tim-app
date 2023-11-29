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
import { dateFormat, fromNow } from '@/lib/utils-date'
import ModalEditShipping from './ModalEditShipping'
import StaffSpan from './StaffSpan'
import RenewOrder from './RenewOrder'

const ItemUsage = ({
  item,
  onCloseParent
}: {
  item: ItemOrder
  onCloseParent?: () => void
}) => {
  const { ordersItems, currentCompany } = useUserCompaniesContext()

  const modal = useModal({ title: `Cambiar articulo` })
  const moreUserOrderItems = item.order.items
    .filter((i) => i.itemId !== item.itemId)
    .map((i) =>
      ordersItems.all.find(
        (searchItem) =>
          searchItem?.id === i?.itemId &&
          searchItem?.order?.id === item?.order?.id
      )
    )

  const payments = item?.order?.payments

  const onTime = isAfter(asDate(item.rentFinishAt) || new Date(), new Date())
  const finished = item.rentStatus === 'finished'
  return (
    <ErrorBoundary>
      <Box className="text-end">
        <Typography variant="caption">
          Creada por: <StaffSpan email={item.order.created.byEmail} />
        </Typography>
        <Typography variant="caption">
          {' '}
          {fromNow(item.order.created.at)}
        </Typography>
      </Box>
      <Box className="my-4">
        <Typography className="text-center">
          {item.order?.client?.name}
        </Typography>
        <Typography className="text-center font-bold my-4">
          {item.category} {item.serialNumber || item.name}
        </Typography>
      </Box>

      <Box className={'grid gap-2 place-content-center'}>
        <Box className="col-span-3 text-center">
          <Typography> Status: {item.rentStatus}</Typography>
        </Box>
        <Box>
          <Typography>Comienza:</Typography>
          <Typography className="text-xs">
            {dateFormat(asDate(item.rentStartAt), 'dd-MMM HH:mm')}
          </Typography>
          <Typography className="text-xs">
            {fromNow(asDate(item.rentStartAt))}
          </Typography>
        </Box>
        <Box className="">
          <Typography>Termina:</Typography>
          <Typography className="text-xs">
            {dateFormat(asDate(item.rentFinishAt), 'dd-MMM HH:mm')}
          </Typography>
          <Typography className="text-xs">
            {fromNow(asDate(item.rentFinishAt))}
          </Typography>
        </Box>

        {item.rentFinishedAt && (
          <Box className="">
            <Typography>Entregado:</Typography>
            <Typography className="text-xs">
              {dateFormat(asDate(item.rentFinishedAt), 'dd-MMM HH:mm')}
            </Typography>
            <Typography className="text-xs">
              {fromNow(asDate(item.rentFinishedAt))}
            </Typography>
          </Box>
        )}
      </Box>
      <Typography className="text-center mt-4" component={'div'}>
        <span>
          Lugar : <ShippingLink address={item.order?.shipping?.address} />{' '}
        </span>
      </Typography>
      <Typography className="text-center mt-4" component={'div'}>
        <span>
          Asigando:{' '}
          <StaffSpan email={item?.order?.shipping?.assignedToEmail || ''} />
        </span>
      </Typography>

      <Box className="grid gap-2">
        <Typography className="text-center my-4">
          Revisa que la unidad este en buen estado.
        </Typography>
        <Box className="grid gap-4 max-w-xs mx-auto">
          {/** Change shipping data address, assignedToEmail and date */}
          <ModalEditShipping order={item?.order} />

          {/** Change item */}
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
              Cambiar unidad
              <AppIcon icon="switch" />
            </Button>
          )}

          {/** item rent status and options to modify the rent as finish rent, start rent , etc */}
          <ItemRentStatus item={item} />
        </Box>
        <Box className="flex justify-center">
          <RenewOrder orderId={item?.order?.id} />
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

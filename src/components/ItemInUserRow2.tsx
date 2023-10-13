import useModal from '@/hooks/useModal'
import asDate from '@/lib/asDate'
import { isAfter } from 'date-fns'
import Modal from './Modal'
import ItemUsage from './ItemUsage'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Typography } from '@mui/material'
import { dateFormat, fromNow } from '@/lib/utils-date'
import { ItemOrder } from '@/context/userCompaniesContext2'
import { unitLabels } from '@/CONSTS/unit-labels'
import ShippingLink from './ShippingLink'
import ItemRentStatus from './ItemRentStatus'

const ItemInUserRow = ({ item }: { item: ItemOrder }) => {
  const modal = useModal({
    title: `Detalles de unidad: ${item.category} ${
      item.serialNumber || item.name
    }`
  })

  const pending = item.rentStatus === 'pending'
  const inUse = item.rentStatus === 'taken'

  return (
    <>
      <Modal {...modal} fullWidth>
        <ItemUsage item={item} onCloseParent={() => modal.onClose()} />
      </Modal>
      <Grid2
        container
        xs={12}
        className=" shadow-md rounded-md p-1  text-center"
        alignItems={'center'}
        onClick={() => {
          modal.onOpen()
        }}
      >
        {/* //* Client  */}
        <Grid2 xs={4} className="whitespace-pre-wrap ">
          <Typography className="truncate">
            {item?.order?.client?.name}
          </Typography>
        </Grid2>
        {/* //* Item  */}
        <Grid2 xs={4}>
          <Typography className="truncate">{item.category}</Typography>
          <Typography className="truncate">
            {item.serialNumber || item.name}
          </Typography>
        </Grid2>

        {/* //* Status  */}
        <Grid2 xs={4} className="flex items-center">
          <Box className="w-1/2 ">
            {inUse && (
              <>
                <Typography>Termina:</Typography>
                <Typography className="text-xs">
                  {dateFormat(asDate(item.rentFinishAt), 'dd-MMM HH:mm')}
                </Typography>
                <Typography className="text-xs">
                  {fromNow(asDate(item.rentFinishAt))}
                </Typography>
              </>
            )}
            {pending && (
              <>
                <Typography>Comienza:</Typography>
                <Typography className="text-xs">
                  {dateFormat(item.rentStartAt, 'dd-MMM HH:mm')}
                </Typography>
                <Typography className="text-xs">
                  {fromNow(asDate(item.rentStartAt))}
                </Typography>
              </>
            )}
          </Box>
          <Box className="w-1/2">
            <ItemRentStatus item={item} />
          </Box>
        </Grid2>
      </Grid2>
    </>
  )
}
export default ItemInUserRow

import useModal from '@/hooks/useModal'
import asDate from '@/lib/asDate'
import { isAfter } from 'date-fns'
import Modal from './Modal'
import ItemUsage from './ItemUsage'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Typography } from '@mui/material'
import { dateFormat, fromNow } from '@/lib/utils-date'
import { ItemOrder } from '@/context/userCompaniesContext2'

const ItemInUserRow = ({ item }: { item: ItemOrder }) => {
  const modal = useModal({
    title: `Detalles de unidad: ${item.category} ${
      item.serialNumber || item.name
    }`
  })

  const pending = item.rentStatus === 'pending'
  const inUse = item.rentStatus === 'taken'
  const finished = item.rentStatus === 'finished'
  const onTime = isAfter(asDate(item.rentFinishAt) || new Date(), new Date())
  return (
    <>
      <Modal {...modal}>
        <ItemUsage item={item} onCloseParent={() => modal.onClose()} />
      </Modal>
      <Grid2
        container
        xs={12}
        className=" shadow-md rounded-md p-2 m-1 text-center"
        alignItems={'center'}
        onClick={() => {
          modal.onOpen()
        }}
      >
        <Grid2 xs={2} className="whitespace-pre-wrap">
          {item?.order?.client?.name}
        </Grid2>
        <Grid2 xs={1}>{item.serialNumber || item.name}</Grid2>
        <Grid2 xs={2}>{item.category}</Grid2>
        <Grid2 xs={1}>
          {item.qty}x {item.unit}
        </Grid2>
        <Grid2 xs={2}>
          <Typography>
            {dateFormat(item.rentStartAt, 'dd-MMM HH:mm')}
          </Typography>
          <Typography variant="caption">
            {fromNow(asDate(item.rentStartAt))}
          </Typography>
        </Grid2>
        <Grid2 xs={2}>
          <Typography>
            {dateFormat(asDate(item.rentFinishAt), 'dd-MMM HH:mm')}
          </Typography>
          <Typography variant="caption">
            {fromNow(asDate(item.rentFinishAt))}
          </Typography>
        </Grid2>
        <Grid2 xs={2} className="flex flex-wrap">
          {pending && <ItemStatus label="Pendiente" status="pending" />}
          {inUse && onTime && <ItemStatus label="En uso" status="success" />}
          {inUse && !onTime && (
            <ItemStatus label="Fuera de tiempo" status="error" />
          )}

          {finished && <ItemStatus label="Terminado" status="success" />}
        </Grid2>
      </Grid2>
    </>
  )
}
const ItemStatus = ({
  status,
  label = ''
}: {
  status: 'error' | 'success' | 'pending'
  label: string
}) => {
  const statusColor = {
    error: 'bg-red-400',
    success: 'bg-green-400',
    pending: 'bg-yellow-400'
  }
  return (
    <div
      className={`${statusColor[status]} m-0.5 rounded-md  truncate aspect-video w-16 items-center flex justify-center text-xs shadow-md whitespace-pre-line`}
    >
      {label}
    </div>
  )
}
export default ItemInUserRow

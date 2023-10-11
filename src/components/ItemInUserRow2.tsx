import useModal from '@/hooks/useModal'
import asDate from '@/lib/asDate'
import { isAfter } from 'date-fns'
import Modal from './Modal'
import ItemUsage from './ItemUsage'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Typography } from '@mui/material'
import { dateFormat, fromNow } from '@/lib/utils-date'
import { ItemOrder } from '@/context/userCompaniesContext2'

const ItemInUseRow = ({ item }: { item: ItemOrder }) => {
  const modal = useModal({
    title: `Detalles de unidad: ${item.category} ${
      item.serialNumber || item.name
    }`
  })

  const finishAt = asDate(item.rentFinishAt)
  const rentalReturn = (item.inUse ?? false) === false
  const onTime = finishAt && isAfter(finishAt, new Date())
  const payments = item?.order?.payments
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
          {!payments?.length ? (
            <ItemStatus label="Sin pagos" status="error" />
          ) : null}
          {onTime && <ItemStatus label="En tiempo" status="success" />}
          {!onTime && !rentalReturn && (
            <ItemStatus label="Retraso" status="error" />
          )}
          {rentalReturn && <ItemStatus status="success" label="Terminada" />}
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
      className={`${statusColor[status]} m-0.5 rounded-md  truncate aspect-video w-16 items-center flex justify-center text-xs shadow-md`}
    >
      {label}
    </div>
  )
}
export default ItemInUseRow

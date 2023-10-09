import useModal from '@/hooks/useModal'
import asDate from '@/lib/asDate'
import { isAfter } from 'date-fns'
import Modal from './Modal'
import ItemUsage from './ItemUsage'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Typography } from '@mui/material'
import { dateFormat, fromNow } from '@/lib/utils-date'
import { PriceType } from './PricesForm'
import { Timestamp } from 'firebase/firestore'
import { Payment } from '@/types/payment'
import { ArticleType } from '@/types/article'

export type ItemRowStatus = Partial<ArticleType> & {
  itemId: string
  qty?: number
  unit?: PriceType['unit']
  startAt: Date | Timestamp
  rentFinishAt?: Date | null
  rentTime?: number
  paymentId: Payment['id']
  inUse?: boolean
  payment?: Payment
}

const ItemInUseRow = ({ item }: { item: Partial<ItemRowStatus> }) => {
  const modal = useModal({
    title: `Detalles de unidad: ${item.category} ${
      item.serialNumber || item.name
    }`
  })

  const finishAt = asDate(item.rentFinishAt)

  const rentalReturn = (item.inUse ?? false) === false
  const onTime = finishAt && isAfter(finishAt, new Date())
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
          {item?.payment?.client?.name}
        </Grid2>
        <Grid2 xs={1}>{item.serialNumber || item.name}</Grid2>
        <Grid2 xs={2}>{item.category}</Grid2>
        <Grid2 xs={2}>
          {item.qty}x {item.unit}
        </Grid2>
        <Grid2 xs={3}>
          <Typography>
            {dateFormat(item.rentFinishAt, 'dd-MMM HH:mm')}
          </Typography>
          <Typography variant="caption">
            {fromNow(asDate(item.rentFinishAt))}
          </Typography>
        </Grid2>
        <Grid2 xs={2} className="">
          {onTime && (
            <div className="bg-green-400 rounded-md p-2 truncate">
              En tiempo
            </div>
          )}
          {!onTime && !rentalReturn && (
            <div className="bg-red-400 rounded-md p-2 truncate">Retraso</div>
          )}
          {rentalReturn && (
            <div className="bg-green-600 rounded-md p-2 truncate">
              Terminada
            </div>
          )}
        </Grid2>
      </Grid2>
    </>
  )
}
export default ItemInUseRow

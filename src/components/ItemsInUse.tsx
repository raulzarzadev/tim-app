import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { Timestamp } from 'firebase/firestore'
import { ArticleType } from '@/types/article'
import { Box, Button, Container, Typography } from '@mui/material'
import { fromNow } from '@/lib/utils-date'
import { isAfter } from 'date-fns'
import asDate from '@/lib/asDate'
import { PriceType } from './PricesForm'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import { finishItemRent, getPayment } from '@/firebase/payments'
import { Payment } from '@/types/payment'
import ChangeItem from './ChangeItem'
import AppIcon from './AppIcon'
import ErrorBoundary from './ErrorBoundary'

const ItemsInUse = () => {
  const { itemsInUse } = useUserCompaniesContext()
  const sortByFinishRent = (a: Partial<ItemInUse>, b: Partial<ItemInUse>) => {
    if (!a.rentFinishAt && !b.rentFinishAt) return 0
    return (
      (asDate(a.rentFinishAt)?.getTime() || 0) -
      (asDate(b.rentFinishAt)?.getTime() || 0)
    )
  }

  return (
    <Container>
      <Grid2 container spacing={1}>
        <Grid2 xs={2} className="font-bold truncate">
          Serie
        </Grid2>
        <Grid2 xs={3} className="font-bold truncate">
          Categoria
        </Grid2>
        <Grid2 xs={2} className="font-bold truncate">
          Tiempo
        </Grid2>
        <Grid2 xs={3} className="font-bold truncate">
          Entrega
        </Grid2>
        <Grid2 xs={2} className="font-bold truncate">
          Status
        </Grid2>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          {itemsInUse.sort(sortByFinishRent).map((item, i) => (
            <ItemRow key={i} item={item} />
          ))}
        </ErrorBoundary>
      </Grid2>
    </Container>
  )
}

export type ItemInUse = Partial<ArticleType> & {
  itemId: string
  qty?: number
  unit?: PriceType['unit']
  startAt: Date | Timestamp
  rentFinishAt?: Date | null
  rentTime?: number
  paymentId: Payment['id']
  inUse?: boolean
}
const ItemRow = ({ item }: { item: Partial<ItemInUse> }) => {
  const modal = useModal({
    title: `Detalles de articulo: ${item.category} ${
      item.serialNumber || item.name
    }`
  })

  const finishAt = asDate(item.rentFinishAt)

  const onTime = finishAt && isAfter(finishAt, new Date())
  return (
    <>
      <Modal {...modal}>
        <ItemInUse item={item} onCloseParent={() => modal.onClose()} />
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
        <Grid2 xs={2}>{item.serialNumber || item.name}</Grid2>
        <Grid2 xs={3}>{item.category}</Grid2>
        <Grid2 xs={2}>
          {item.qty}x {item.unit}
        </Grid2>
        <Grid2 xs={3}>{fromNow(asDate(item.rentFinishAt))}</Grid2>
        <Grid2 xs={2} className="">
          {onTime ? (
            <div className="bg-green-400 rounded-md p-2 truncate">
              En tiempo
            </div>
          ) : (
            <div className="bg-red-400 rounded-md p-2 truncate">Retraso</div>
          )}
        </Grid2>
      </Grid2>
    </>
  )
}

const ItemInUse = ({
  item,
  onCloseParent
}: {
  item: Partial<ItemInUse>
  onCloseParent?: () => void
}) => {
  const { itemsInUse } = useUserCompaniesContext()
  const handleFinishRent = async (item: Partial<ItemInUse>) => {
    onCloseParent?.()
    return await finishItemRent(item.paymentId, item?.id || '')
  }
  const modal = useModal({ title: `Cambiar articulo` })
  const moreItemsInUse = itemsInUse.filter(
    (i) => i.paymentId === item.paymentId && i.id !== item.itemId
  )
  const onTime = item.rentFinishAt && isAfter(item.rentFinishAt, new Date())

  return (
    <ErrorBoundary>
      <Box className="grid gap-6">
        {!!moreItemsInUse?.length && (
          <Box>
            <Typography>Otras unidades del mismo cliente...</Typography>
            <Box>
              {moreItemsInUse.map((item, i) => (
                <ItemRow key={i} item={item} />
              ))}
            </Box>
          </Box>
        )}
        {!onTime && (
          <Typography className="text-center my-4">
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
        </Box>

        <Modal {...modal}>
          <ChangeItem item={item} />
        </Modal>
      </Box>
    </ErrorBoundary>
  )
}

export default ItemsInUse

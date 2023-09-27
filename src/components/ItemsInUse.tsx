import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { ItemSelected } from './CompanyCashbox'
import { Timestamp } from 'firebase/firestore'
import { ArticleType } from '@/types/article'
import { Box, Button, Container, Typography } from '@mui/material'
import rentTime from '@/lib/rentTime'
import { fromNow } from '@/lib/utils-date'
import { addMinutes } from 'date-fns'
import asDate from '@/lib/asDate'
import { PriceType } from './PricesForm'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import { finishItemRent } from '@/firebase/payments'
import { Payment } from '@/types/payment'
import ModalConfirm from './ModalConfirm'
import ModalArticles from './ModalArticles'
import ChangeItem from './ChangeItem'

const ItemsInUse = () => {
  const { itemsInUse, items } = useUserCompaniesContext()
  const rentFinishAt = (
    qty: number,
    unit: PriceType['unit'],
    startAt: Date | Timestamp
  ) => {
    const rentMinutes = rentTime(qty, unit)
    return addMinutes(asDate(startAt) as Date, rentMinutes)
  }
  const fullItems: ItemInUse[] = itemsInUse.map((item) => ({
    ...items.find(({ id }) => id === item.itemId),
    ...item,
    rentFinishAt: rentFinishAt(item.qty || 0, item.unit, item.startAt),
    rentTime: rentTime(item.qty, item.unit)
  }))

  const sortByFinishRent = (a: ItemInUse, b: ItemInUse) => {
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
        <Grid2 xs={3} className="font-bold truncate">
          Tiempo
        </Grid2>
        <Grid2 xs={4} className="font-bold truncate">
          Entrega
        </Grid2>

        {fullItems.sort(sortByFinishRent).map((item, i) => (
          <ItemRow key={i} item={item} />
        ))}
      </Grid2>
    </Container>
  )
}

export type ItemInUse = Partial<ArticleType> & {
  itemId: string
  qty?: number
  unit?: PriceType['unit']
  startAt: Date | Timestamp
  rentFinishAt: Date
  rentTime: number
  paymentId: Payment['id']
  inUse?: boolean
}
const ItemRow = ({ item }: { item: ItemInUse }) => {
  const modal = useModal({
    title: `Detalles de articulo: ${item.serialNumber || item.name}`
  })
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
        <Grid2 xs={3}>
          {item.qty}x {item.unit}
        </Grid2>
        <Grid2 xs={4}>{fromNow(item.rentFinishAt)}</Grid2>
      </Grid2>
    </>
  )
}

const ItemInUse = ({
  item,
  onCloseParent
}: {
  item: ItemInUse
  onCloseParent?: () => void
}) => {
  const handleFinishRent = async (item: ItemInUse) => {
    onCloseParent?.()
    return await finishItemRent(item.paymentId, item?.id || '')
  }
  const modal = useModal({ title: `Cambiar articulo` })
  return (
    <Box className="grid gap-6">
      <ModalConfirm
        label="Recibir unidad"
        handleConfirm={() => handleFinishRent(item)}
      >
        <Typography>Otras unidades del mismo cliente...</Typography>
        <Typography>Revisa que la unidad este en buen estado.</Typography>
      </ModalConfirm>

      <Button
        onClick={(e) => {
          e.preventDefault()
          modal.onOpen()
        }}
      >
        Cambiar
      </Button>
      <Modal {...modal}>
        <ChangeItem item={item} />
      </Modal>
    </Box>
  )
}

export default ItemsInUse

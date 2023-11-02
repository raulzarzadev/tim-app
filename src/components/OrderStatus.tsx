import { rentFinishAt } from '@/context/userCompaniesContext2'
import { Order } from '@/types/order'
import { Typography } from '@mui/material'
import { isBefore } from 'date-fns'

const OrderStatus = ({ order }: { order?: Partial<Order> }) => {
  const someItemAlreadyExpire = order?.items?.some((i) => {
    return (
      i.rentStatus === 'expired' ||
      (i.rentStatus === 'taken' &&
        isBefore(rentFinishAt(i.rentStartedAt, i.qty, i.unit), new Date()))
    )
  })
  const someItemIsPending = order?.items?.some(
    (i) => i.rentStatus === 'pending' || !i.rentStatus
  )
  const itemsInUse = order?.items?.every((i) => i.rentStatus === 'taken')
  const itemsFinished = order?.items?.every((i) => i.rentStatus === 'finished')
  return (
    <div>
      {someItemIsPending && (
        <Typography
          className="text-center font-bold text-blue-500 my-4"
          variant="h5"
        >
          Unidades pendientes
        </Typography>
      )}
      {someItemAlreadyExpire && (
        <Typography
          className="text-center font-bold text-red-500 my-4"
          variant="h5"
        >
          Unidades vencidas
        </Typography>
      )}

      {itemsInUse && (
        <Typography>
          <Typography
            className="text-center font-bold text-green-500 my-4"
            variant="h5"
          >
            Unidades en uso
          </Typography>
        </Typography>
      )}
      {itemsFinished && (
        <Typography>
          <Typography
            className="text-center font-bold text-teal-600 my-4"
            variant="h5"
          >
            Orden finalizada
          </Typography>
        </Typography>
      )}
    </div>
  )
}

export default OrderStatus

import { ItemRentStatus, ItemSelected } from '@/context/useCompanyCashbox'
import { orderStatus } from '@/lib/orderStatus'
import { Order } from '@/types/order'
import { Typography } from '@mui/material'

const OrderStatus = ({ order }: { order?: Partial<Order> }) => {
  const ComponentStatus: Record<
    ItemRentStatus,
    { label: string; color: string }
  > = {
    pending: { label: 'Pendiente', color: 'text-blue-500' },
    expired: { label: 'Vencida', color: 'text-red-500' },
    taken: { label: 'Activa', color: 'text-green-500' },
    finished: { label: 'Terminada', color: 'text-teal-500' },
    canceled: {
      label: 'Cancelada',
      color: 'text-red-500'
    }
  }
  return (
    <div>
      {ComponentStatus[orderStatus(order)]?.label && (
        <Typography
          className={`text-center font-bold ${
            ComponentStatus[orderStatus(order)]?.color
          } my-4`}
          variant="h5"
        >
          {ComponentStatus[orderStatus(order)]?.label}
        </Typography>
      )}
    </div>
  )
}

export default OrderStatus

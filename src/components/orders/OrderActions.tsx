import useModal from '@/hooks/useModal'
import { Button, Typography } from '@mui/material'
import ModalOrderForm from './ModalOrderForm'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { updateOrder } from '@/firebase/orders'

const OrderActions = ({ orderId }: { orderId: string }) => {
  const modalEdit = useModal({ title: 'Editar orden' })
  const { orders } = useUserCompaniesContext()
  const order = orders?.find((o) => o?.id === orderId)
  return (
    <div>
      <Typography variant="h5" className="mt-4">
        Acciones de la orden
      </Typography>
      <ModalOrderForm
        label="Editar orden"
        icon="edit"
        order={order}
        handleSave={async (order) => {
          const res = await updateOrder(orderId, order)
          console.log(res)
          return res
        }}
      />
    </div>
  )
}

export default OrderActions

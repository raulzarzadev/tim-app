import useModal from '@/hooks/useModal'
import ClientForm from './ClientForm'
import { Button } from '@mui/material'
import Modal from '../Modal'
import ShippingForm from './ShippingForm'
import OrderItemsForm from './OrderItemsForm'

const OrderForm = () => {
  const modal = useModal({ title: 'Detalle de orden' })
  const clientForm = useModal({ title: 'Detalles de cliente' })
  const shippingForm = useModal({ title: 'Detalles de entrega' })
  const itemsForm = useModal({ title: 'Unidades' })
  return (
    <div>
      <Button onClick={modal.onOpen}>Orden</Button>
      <Modal {...modal}>
        <div className="grid gap-2">
          <Button onClick={clientForm.onOpen}>Cliente</Button>
          <Modal {...clientForm}>
            <ClientForm />
          </Modal>
          <Button onClick={shippingForm.onOpen}>Entrega</Button>
          <Modal {...shippingForm}>
            <ShippingForm />
          </Modal>
          <Button onClick={itemsForm.onOpen}>Unidades</Button>
          <Modal {...itemsForm}>
            <OrderItemsForm />
          </Modal>
        </div>
      </Modal>
    </div>
  )
}

export default OrderForm

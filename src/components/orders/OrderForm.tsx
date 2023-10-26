import useModal from '@/hooks/useModal'
import ClientForm from './ClientForm'
import { Button } from '@mui/material'
import Modal from '../Modal'
import ShippingForm from './ShippingForm'
import { useState } from 'react'
import { Order } from '@/types/order'
import ClientInfo from '../ClientInfo'
import ShippingDetails from '../ShippingDetails'
import CheckoutItems from '../CheckoutItems'
import SelectCompanyItem from './SelectCompanyItem'

const OrderForm = () => {
  const modal = useModal({ title: 'Detalle de orden' })
  const clientForm = useModal({ title: 'Detalles de cliente' })
  const shippingForm = useModal({ title: 'Detalles de entrega' })
  const itemsForm = useModal({ title: 'Unidades' })

  const [order, setOrder] = useState<Partial<Order>>({})
  return (
    <div>
      <Button onClick={modal.onOpen}>Orden</Button>
      <Modal {...modal}>
        <div className="grid gap-2">
          <Button onClick={clientForm.onOpen}>Cliente</Button>
          {order?.client && <ClientInfo client={order?.client} />}
          <Modal {...clientForm}>
            <ClientForm
              setClient={(data) => {
                setOrder({ ...order, client: data })
                clientForm.onClose()
              }}
            />
          </Modal>
          <Button onClick={shippingForm.onOpen}>Entrega</Button>
          {order.shipping && <ShippingDetails shipping={order.shipping} />}
          <Modal {...shippingForm}>
            <ShippingForm
              setShipping={(data) => {
                setOrder({ ...order, shipping: data })
                // shippingForm.onClose()
              }}
            />
          </Modal>
          <Button onClick={itemsForm.onOpen}>Seleccionar unidades</Button>
          {order.items && <CheckoutItems itemsSelected={order.items} />}
          <Modal {...itemsForm}>
            <SelectCompanyItem
              multiple
              itemsSelected={order?.items?.map((i) => i.itemId || '') || []}
              setItems={(items) => {
                setOrder({
                  ...order,
                  items: items.map((itemId) => ({ itemId }))
                })
                itemsForm.onClose()
              }}
            />
          </Modal>
        </div>
      </Modal>
    </div>
  )
}

export default OrderForm

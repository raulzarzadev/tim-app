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
import ModalPayment from '../ModalPayment3'
import OrderPaymentsTable from '../OrderPaymentsTable'

const OrderForm = ({
  handleSave,
  defaultOrder
}: {
  defaultOrder?: Order
  handleSave?: (order: Partial<Order>) => void
}) => {
  const modal = useModal({ title: 'Detalle de orden' })
  const clientForm = useModal({ title: 'Detalles de cliente' })
  const shippingForm = useModal({ title: 'Detalles de entrega' })
  const itemsForm = useModal({ title: 'Unidades' })

  const [order, setOrder] = useState<Partial<Order>>(defaultOrder || {})

  const [total, setTotal] = useState(0)

  const orderPaymentsCharged =
    order.payments?.reduce((acc, curr) => acc + curr.amount, 0) || 0
  const paymentIsComplete = orderPaymentsCharged >= total

  return (
    <div>
      <Button onClick={modal.onOpen}>Orden</Button>
      <Modal {...modal}>
        <div className="grid gap-2">
          {/* **** Client Form section */}
          <Button onClick={clientForm.onOpen}>Cliente</Button>
          {order?.client && <ClientInfo client={order?.client} />}
          <Modal {...clientForm}>
            <ClientForm
              client={order?.client}
              setClient={(client) => {
                setOrder({
                  ...order,
                  client
                })

                clientForm.onClose()
              }}
            />
          </Modal>
          {/* **** Shipping Form section */}
          <Button onClick={shippingForm.onOpen}>Entrega</Button>
          {order.shipping && <ShippingDetails shipping={order.shipping} />}
          <Modal {...shippingForm}>
            <ShippingForm
              shipping={{
                ...order.shipping,
                address: order?.client?.address || ''
              }}
              setShipping={(data) => {
                setOrder({ ...order, shipping: data })
                // shippingForm.onClose()
              }}
            />
          </Modal>
          {/* **** Items Form section */}
          <Button onClick={itemsForm.onOpen}>Seleccionar unidades</Button>
          {order.items && (
            <CheckoutItems
              itemsSelected={order.items}
              setTotal={setTotal}
              setItemsSelected={(itemsSelected) => {
                setOrder({ ...order, items: itemsSelected })
              }}
            />
          )}
          <Modal {...itemsForm}>
            <SelectCompanyItem
              multiple
              itemsSelected={order?.items?.map((i) => i.itemId || '') || []}
              setItems={(items) => {
                console.log({ items })
                setOrder({
                  ...order,
                  items: items.map((itemId) => ({ itemId }))
                })
                itemsForm.onClose()
              }}
            />
          </Modal>
          {/* **** Payment  section */}
          {order.payments && <OrderPaymentsTable payments={order.payments} />}
          {!!order?.items?.length && (
            <ModalPayment
              disabled={!!paymentIsComplete}
              amount={total - orderPaymentsCharged}
              label="Pagar "
              setPayment={(payment) => {
                const payments = [...(order.payments || []), payment]
                setOrder({ ...order, payments })
              }}
            />
          )}

          {/* **** Save  */}
          <Button
            onClick={() => {
              //modal.onClose()
              clientForm.onClose()
              shippingForm.onClose()
              itemsForm.onClose()
              handleSave?.(order)
            }}
          >
            Guardar
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default OrderForm

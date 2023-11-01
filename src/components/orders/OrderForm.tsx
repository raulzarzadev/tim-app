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
import asNumber from '@/lib/asNumber'
import { ArticleType } from '@/types/article'

const OrderForm = ({
  handleSave,
  defaultOrder
}: {
  defaultOrder?: Partial<Order>
  handleSave?: (order: Partial<Order>) => Promise<void> | void
}) => {
  const clientForm = useModal({ title: 'Detalles de cliente' })
  const shippingForm = useModal({ title: 'Detalles de entrega' })
  const itemsForm = useModal({ title: 'Unidades' })
  const [saving, setSaving] = useState(false)

  const [order, setOrder] = useState<Partial<Order>>(defaultOrder || {})

  const [itemsTotal, setItemsTotal] = useState(0)

  const orderPaymentsCharged =
    order.payments?.reduce(
      (acc, { amount = 0, method = 'mxn', usdPrice = 1 }) => {
        if (method === 'usd') return acc + amount * usdPrice
        return acc + amount
      },
      0
    ) || 0

  // const paymentIsComplete = orderPaymentsCharged >= itemsTotal

  const shippingAmount = asNumber(order?.shipping?.amount) || 0
  const total = itemsTotal - orderPaymentsCharged + shippingAmount
  const itemsDisabled: ArticleType['id'][] = []

  return (
    <div>
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
            // setShipping={(data) => {
            //   setOrder({ ...order, shipping: data })
            //   // shippingForm.onClose()
            // }}
            handleSave={(data) => {
              setOrder({ ...order, shipping: data })
              shippingForm.onClose()
            }}
          />
        </Modal>
        {/* **** Items Form section */}
        <Button onClick={itemsForm.onOpen}>Seleccionar unidades</Button>

        <CheckoutItems
          shippingAmount={shippingAmount}
          itemsSelected={order.items || []}
          setTotal={setItemsTotal}
          setItemsSelected={(itemsSelected) => {
            setOrder({ ...order, items: itemsSelected })
          }}
        />

        <Modal {...itemsForm}>
          <SelectCompanyItem
            multiple
            itemsDisabled={itemsDisabled}
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
            //disabled={!!paymentIsComplete}
            amount={total}
            label="Pagar "
            setPayment={(payment) => {
              const payments = [...(order.payments || []), payment]
              setOrder({ ...order, payments })
            }}
          />
        )}

        {/* **** Save  */}
        <Button
          disabled={saving}
          onClick={async (e) => {
            try {
              setSaving(true)
              e.preventDefault()
              clientForm.onClose()
              shippingForm.onClose()
              itemsForm.onClose()
              await handleSave?.(order)
            } catch (e) {
              console.error(e)
            } finally {
              setSaving(false)
            }
          }}
        >
          Guardar
        </Button>
      </div>
    </div>
  )
}

export default OrderForm

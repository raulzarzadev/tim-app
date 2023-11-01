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
import AppIcon from '../AppIcon'
import ButtonSave from '../ButtonSave'
import ButtonClear from '../ButtonClear'

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
  const handleClearOrder = () => {
    setOrder({})
  }
  const handleSaveOrder = async (order: Partial<Order>) => {
    try {
      setSaving(true)
      clientForm.onClose()
      shippingForm.onClose()
      itemsForm.onClose()
      return await handleSave?.(order)
    } catch (e) {
      console.error(e)
    } finally {
      setTimeout(() => {
        setSaving(false)
      }, 1000)
    }
  }
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
        <CheckoutItems
          shippingAmount={shippingAmount}
          itemsSelected={order.items || []}
          setTotal={setItemsTotal}
          setItemsSelected={(itemsSelected) => {
            setOrder({ ...order, items: itemsSelected })
          }}
        />

        {/* **** Payment  section */}
        {order.payments && <OrderPaymentsTable payments={order.payments} />}
        {!!order?.items?.length && (
          <div className="my-4 flex w-full justify-center">
            <ModalPayment
              //disabled={!!paymentIsComplete}
              amount={total}
              label="Pagar "
              setPayment={(payment) => {
                const payments = [...(order.payments || []), payment]
                const orderPaid = { ...order, payments }
                setOrder(orderPaid)
                handleSaveOrder(orderPaid)
              }}
            />
          </div>
        )}

        {/* **** Save  */}
        <div className="flex justify-evenly w-full my-4">
          <ButtonClear onClick={handleClearOrder} />
          <ButtonSave
            disabled={saving}
            onClick={async (e) => {
              return handleSaveOrder(order)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default OrderForm

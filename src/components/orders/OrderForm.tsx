import useModal from '@/hooks/useModal'
import ClientForm from './ClientForm'
import { Button, Typography } from '@mui/material'
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
import ButtonSave from '../ButtonSave'
import ButtonClear from '../ButtonClear'
import onSaveOrder from './lib/onSaveOrder'

const OrderForm = ({
  handleSave,
  defaultOrder,
  shippingEnabled
}: {
  defaultOrder?: Partial<Order>
  handleSave?: (order: Partial<Order>) => Promise<void> | void
  shippingEnabled?: boolean
}) => {
  const clientForm = useModal({ title: 'Datos de cliente' })
  const shippingForm = useModal({ title: 'Datos de entrega' })
  const itemsForm = useModal({ title: 'Unidades' })
  const [saving, setSaving] = useState(false)
  const [itemsTotal, setItemsTotal] = useState(0)
  const [order, setOrder] = useState<Partial<Order>>({
    items: [],
    // client: {},
    // shipping: {},
    // payments: [],
    // changes: [],
    ...defaultOrder
  })

  // const paymentIsComplete = orderPaymentsCharged >= itemsTotal

  const handleClearOrder = () => {
    setOrder({})
  }

  const handleSaveOrder = async (order: Partial<Order>) => {
    setSaving(true)
    const res = await onSaveOrder(order, {
      alreadyStart: false,
      shippingEnabled: shippingEnabled
    })
      .then((res) => {
        const validOrder = typeof res === 'object'
        if (validOrder) {
          setOrder({ ...order })
          return handleSave?.(res)
        }
        console.log('res', res)
      })
      .catch(console.error)
      .finally(() => {
        setTimeout(() => {
          setSaving(false)
        }, 1000)
      })
    //@ts-ignore
    if (res?.ok) {
      //@ts-ignore
      const orderId = res?.res?.id || ''
      setOrder({ ...order, id: orderId })
    }
  }

  const orderId = order?.id || ''
  const orderPaymentsCharged =
    order.payments?.reduce(
      (acc, { amount = 0, method = 'mxn', usdPrice = 1 }) => {
        if (method === 'usd') return acc + amount * usdPrice
        return acc + amount
      },
      0
    ) || 0

  const disableSave = saving || !order?.client?.name
  const shippingAmount = asNumber(order?.shipping?.amount) || 0
  const total = itemsTotal - orderPaymentsCharged + shippingAmount
  const itemsDisabled: ArticleType['id'][] = []
  return (
    <div>
      <div className="grid gap-2">
        {order.id && (
          <Typography variant="caption" className="text-end my-0">
            Id:{order.id}
          </Typography>
        )}
        {/* **** Client Form section */}
        <Button onClick={clientForm.onOpen} variant="outlined">
          1. Cliente
        </Button>
        {order?.client && <ClientInfo client={order?.client} />}
        <Modal {...clientForm}>
          <ClientForm
            isClientOrder
            client={order?.client}
            setClient={(client) => {
              setOrder({
                ...order,
                client
              })
              clientForm.onClose()
            }}
            searchClient
          />
        </Modal>
        {/* **** Shipping Form section */}
        <Button
          onClick={shippingForm.onOpen}
          variant="outlined"
          disabled={!shippingEnabled}
        >
          2. Entrega
        </Button>
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
        <Button onClick={itemsForm.onOpen} variant="outlined">
          3. Seleccionar unidades
        </Button>
        <Modal {...itemsForm}>
          <SelectCompanyItem
            multiple
            itemsDisabled={itemsDisabled}
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
        {(shippingAmount > 0 || asNumber(order.items?.length) > 0) && (
          <CheckoutItems
            shippingAmount={shippingAmount}
            itemsSelected={order.items || []}
            setTotal={setItemsTotal}
            setItemsSelected={(itemsSelected) => {
              setOrder({ ...order, items: itemsSelected })
            }}
          />
        )}

        {/* **** Payment  section */}
        {order.payments && <OrderPaymentsTable payments={order.payments} />}
        {!!order?.items?.length && (
          <div className="my-4 flex w-full justify-center">
            <ModalPayment
              //disabled={!!paymentIsComplete}
              amount={total}
              label="Pagar"
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
          <div>
            <ButtonSave
              label={orderId ? 'Actualizar' : 'Guardar'}
              disabled={disableSave}
              onClick={async (e) => {
                return handleSaveOrder(order)
              }}
            />
            {saving && (
              <div className="mt-2">
                <Typography variant="caption">{`Guardando`}</Typography>
              </div>
            )}
            {!order?.client?.name && (
              <div className="mt-2">
                <Typography
                  color={'error'}
                  variant="caption"
                >{`Nombre de cliente requerido*`}</Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderForm

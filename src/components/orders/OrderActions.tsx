import { Button, Typography } from '@mui/material'
import ModalOrderForm from './ModalOrderForm'
import {
  rentFinishAt,
  useUserCompaniesContext
} from '@/context/userCompaniesContext2'
import {
  addOrderReport,
  changeItem,
  createOrder,
  finishOrderRent,
  onPayOrder,
  startOrderRent,
  updateOrder
} from '@/firebase/orders'

import { useState } from 'react'
import { Order, Payment } from '@/types/order'
import ModalPayment from '../ModalPayment3'
import { calculateOrderTotal } from '@/lib/calculateOrderTotal'
import ModalConfirm from '../ModalConfirm'
import ServiceForm from '../ServiceForm'
import { createService } from '@/firebase/services'
import AssignForm from '../AssignForm'
import ClientForm from './ClientForm'
import { updateClient } from '@/firebase/clients'
import { Client } from '@/types/client'
import ModalItemChange from '../ModalItemChange'
import { orderStatus } from '@/lib/orderStatus'
import OrderDetails from '../OrderDetails'

const OrderActions = ({
  orderId,
  onAction
}: {
  orderId: string
  onAction?: (action: 'start' | 'finish' | 'edit' | 'error' | 'renew') => void
}) => {
  const { orders, currentCompany } = useUserCompaniesContext()
  const order = orders?.find((o) => o?.id === orderId)
  const itemsInUse = order?.items?.some((i) => i.rentStatus === 'taken')

  const totalOrder = calculateOrderTotal({ company: currentCompany, order })

  const [loading, setLoading] = useState(false)
  const handleStartRent = async () => {
    try {
      setLoading(true)
      const res = await startOrderRent(orderId)
      console.log(res)
      onAction?.('start')
    } catch (e) {
      onAction?.('error')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  const handleFinishRent = async () => {
    try {
      setLoading(true)
      const res = await finishOrderRent(orderId)
      console.log(res)
      onAction?.('finish')
    } catch (e) {
      onAction?.('error')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveOrder = async (order: Partial<Order>) => {
    try {
      setLoading(true)
      const res = await updateOrder(orderId, order)
      console.log(res)
      onAction?.('edit')
    } catch (e) {
      onAction?.('error')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelRent = async () => {
    try {
      setLoading(true)
      const res = await updateOrder(orderId, { status: 'canceled' })
      console.log(res)
      onAction?.('edit')
    } catch (e) {
      onAction?.('error')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handlePayOrder = async (payment: Payment) => {
    try {
      const res = await onPayOrder(orderId, payment)
      console.log([res])
      return res
    } catch (error) {
      console.error(error)
    }
  }
  const handleRenewRent = async () => {
    //* 1. finish rent
    //* 2. update status
    //* 3. update items with start rent (is when las order supoust be finished)
    //* 4. start new rent

    try {
      setLoading(true)
      const resFinish = await finishOrderRent(orderId)
      const resRenew = await updateOrder(orderId, { status: 'renewed' })
      const updatedItems = order?.items?.map((i) => {
        const rentFinishedAt = rentFinishAt(i.rentStartedAt, i.qty || 0, i.unit)
        if (i.rentStatus === 'taken') i.rentStartedAt = rentFinishedAt
        return i
      })
      const resCreateRent = await createOrder({
        changes: order?.changes || [],
        companyId: currentCompany?.id || '',
        items: updatedItems || [],
        payments: [],
        shipping: order?.shipping || {},
        client: order?.client || {}
      })
      console.log([resRenew, resFinish, resCreateRent])
      onAction?.('renew')
    } catch (e) {
      onAction?.('error')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const status = orderStatus(order)
  const disabledStartRent =
    status === 'expired' || status === 'taken' || status === 'finished'
  return (
    <div>
      <Typography variant="h5" className="mt-4">
        Acciones de orden
      </Typography>
      {status === 'expired' && (
        <div className="my-4">
          <ModalConfirm
            modalTitle="Renovar orden"
            fullWidth
            handleConfirm={() => {
              console.log('renovar', { order })

              handleRenewRent()
            }}
            label="Renovar"
            acceptLabel="Renovar orden"
          >
            <OrderDetails order={order} />
          </ModalConfirm>
        </div>
      )}
      <div className="my-4">
        <ModalPayment
          amount={totalOrder}
          setPayment={handlePayOrder}
          fullWidth
        />
      </div>
      <div className="grid grid-cols-2">
        <ServiceForm
          companyId={currentCompany?.id || ''}
          orderId={orderId}
          setService={async (s) => {
            try {
              const res = await createService({
                ...s,
                orderId,
                clientId: order?.client?.id || ''
              })
              const rep = await addOrderReport(orderId, res.res.id)

              console.log({ res, rep })
            } catch (error) {
              console.error({ error })
            }
          }}
        />
        <AssignForm
          handleAssign={async (email, date) => {
            try {
              const res = await updateOrder(orderId, {
                // @ts-ignore
                'shipping.assignedToEmail': email
              })
              console.log({ res })
              if (date) {
                const res = await updateOrder(orderId, {
                  // @ts-ignore
                  'shipping.date': date
                })
                console.log({ res })
              }
              return res
            } catch (error) {
              console.error(error)
            }
          }}
          assignedTo={order?.shipping?.assignedToEmail}
        />
      </div>
      <div className="grid gap-2 my-6 sm:grid-flow-col ">
        {/* <Button
          variant="outlined"
          disabled={loading || !itemsPending}
          onClick={(e) => {
            e.preventDefault()
            handleStartRent()
          }}
        >
          Comenzar renta
        </Button> */}
        <ModalStartRent
          disabled={disabledStartRent}
          orderId={orderId}
          handleStartRent={handleStartRent}
        />
        <Button
          variant="outlined"
          disabled={loading || !itemsInUse}
          onClick={(e) => {
            e.preventDefault()
            handleFinishRent()
          }}
        >
          Finalizar renta
        </Button>
      </div>
      <div className="w-full flex grid-cols-2 gap-4 my-6">
        <ModalConfirm
          fullWidth
          label="Cancelar orden"
          color="error"
          handleConfirm={handleCancelRent}
        >
          <Typography className="text-center">
            ¿Desea cancelar esta orden?
          </Typography>
        </ModalConfirm>
        <ModalOrderForm
          label="Editar orden"
          icon="edit"
          order={order}
          handleSave={handleSaveOrder}
        />
      </div>
    </div>
  )
}

const ModalStartRent = ({
  orderId,
  handleStartRent,
  disabled
}: {
  orderId: string
  handleStartRent: () => void
  disabled: boolean
}) => {
  const { orders } = useUserCompaniesContext()
  const order = orders?.find((o) => o?.id === orderId)
  //* should be disabled in this seccion if identification and signature are not added
  const handleUpdateClient = async (client: Partial<Client>) => {
    await updateClient(client.id || '', {
      imageID: order?.client?.imageID || '',
      signature: order?.client?.signature || '',
      ...client
    })
      .then((res) => console.log(res))
      .catch((e) => console.error(e))

    await updateOrder(orderId, {
      client: {
        ...order?.client,
        ...client
      }
    })
      .then((res) => console.log(res))
      .catch((e) => console.error(e))
  }
  const isCanceled = order?.status === 'canceled'

  const disabledConfirm =
    !order?.client.imageID || !order?.client.signature || isCanceled
  return (
    <div>
      <ModalConfirm
        disabled={disabled}
        label="Comenzar renta"
        color="primary"
        handleConfirm={handleStartRent}
        modalTitle="Confirmar datos "
        fullWidth
        acceptLabel="Comenzar renta"
        disabledAccept={disabledConfirm}
      >
        {/* <SelectCompanyItem
          itemsSelected={items?.map((i) => i.itemId || '') || []}
          setItems={(items) => {}}
          multiple
        /> */}
        <div className="text-center">
          <Typography variant="h5" className="my-4">
            Unidades entregadas:{' '}
          </Typography>
          {order?.items.map((item) => {
            return (
              <div key={item.itemId} className="flex justify-center my-2 ">
                <ModalItemChange
                  // @ts-ignore FIXME: quantity should don't exist
                  itemSelected={{ ...item, qty: item.qty || item?.quantity }}
                  handleChangeItem={async (newItem) => {
                    console.log({ newItem })
                    const changedItem = {
                      //* It will change just the id of the item, it  don't change category or prices  */
                      amount: 0,
                      newItemId: newItem.itemId || '',
                      oldItemId: item.itemId || '',
                      resolved: true,
                      newPrice: {
                        price: item.price || 0,
                        quantity: item.qty || 1,
                        unit: item.unit || 'hour'
                      }
                    }
                    console.log({ changedItem })
                    try {
                      const res = await changeItem(orderId, changedItem)
                    } catch (error) {
                      console.error(error)
                    }
                  }}
                />
              </div>
            )
          })}
        </div>
        <Typography variant="h5" className="my-4 text-center">
          Datos de cliente
        </Typography>
        <ClientForm
          searchClient={false}
          client={order?.client}
          setClient={(newClient) => {
            if (newClient) return handleUpdateClient(newClient)
          }}
        />
        <div className="grid place-content-center">
          {!order?.client.imageID && (
            <Typography className="" variant="caption">
              *Imagen de identificación es necesaria
            </Typography>
          )}
          {!order?.client.signature && (
            <Typography className="" variant="caption">
              * Firma de cliente es necesaria
            </Typography>
          )}
        </div>
      </ModalConfirm>
    </div>
  )
}

export default OrderActions

import { Button, Typography } from '@mui/material'
import ModalOrderForm from './ModalOrderForm'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import {
  addOrderReport,
  changeItem,
  createOrder,
  deleteOrder,
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
import { rentFinishAt } from '@/context/lib'
import { itemStatus } from '@/lib/itemStatus'
import { useUserShopContext } from '@/context/userShopContext'
import { CompanyType } from '@/types/company'

const OrderActions = ({
  orderId,
  onAction
}: {
  orderId: string
  onAction?: (action: 'start' | 'finish' | 'edit' | 'error' | 'renew') => void
}) => {
  // const { orders, currentCompany } = useUserCompaniesContext()
  const { userShop } = useUserShopContext()
  const shopId = userShop?.id || ''
  const shippingEnabled = userShop?.shippingEnabled || false
  const order = userShop?.orders?.find((o) => o?.id === orderId)
  const itemsInUse = order?.items?.some((i) => i.rentStatus === 'taken')
  const totalOrder = calculateOrderTotal({
    company: userShop as CompanyType,
    order: order as Order
  })
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

  const handleResumeOrder = async () => {
    try {
      setLoading(true)
      const res = await updateOrder(orderId, { status: 'pending' })
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
      //* 1. finish rent
      const resFinish = await finishOrderRent(orderId)
      //* 2. update status
      const resRenew = await updateOrder(orderId, { status: 'renewed' })
      //* 3. update items with start rent (is when last order should  finished)
      const updatedItems = order?.items?.map((i) => {
        if (i.rentStartedAt === null) return i
        if (i.rentStartedAt && i.rentStatus === 'taken')
          i.rentStartedAt = rentFinishAt(i.rentStartedAt, i.qty || 0, i.unit)

        return i
      })
      //* 4. start new rent
      const resCreateRent = await createOrder({
        changes: order?.changes || [],
        companyId: userShop?.id || '',
        items: updatedItems || [],
        payments: [],
        shipping: {
          address: order?.shipping?.address || '',
          amount: order?.shipping?.amount || 0,
          assignedToEmail: order?.shipping?.assignedToEmail || ''
          // date: order?.shipping?.date || new Date()
        },
        client: order?.client || {}
      })
      onAction?.('renew')
    } catch (e) {
      onAction?.('error')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteOrder = async () => {
    await deleteOrder(orderId)
      .then(console.log)
      .catch(console.error)
      .finally(() => {
        setDisableAll(true)
        onAction?.('edit')
      })
    // try {
    //   setLoading(true)
    //   const res = await deleteOrder(orderId)
    //   console.log(res)
    //   onAction?.('edit')
    // } catch (e) {
    //   onAction?.('error')
    //   console.error(e)
    // } finally {
    //   setLoading(false)
    // }
  }

  const status = orderStatus(order)
  const disabledStartRent =
    status === 'expired' || status === 'taken' || status === 'finished'

  const [disableAll, setDisableAll] = useState(false)
  return (
    <div>
      <Typography variant="h5" className="mt-4">
        Acciones de orden
      </Typography>
      <div className="grid grid-cols-2 gap-2 my-2 place-content-center items-center">
        {status === 'expired' && (
          <div className="col-span-2 ">
            <ModalConfirm
              disabled={disableAll}
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
        <div className="col-span-2">
          <ModalPayment
            disabled={disableAll}
            amount={totalOrder}
            setPayment={handlePayOrder}
            fullWidth
          />
        </div>
        <Button
          variant="outlined"
          disabled={disableAll || loading || !itemsInUse}
          onClick={(e) => {
            e.preventDefault()
            handleFinishRent()
          }}
          fullWidth
        >
          Finalizar renta
        </Button>
        <ModalStartRent
          disabled={disableAll || disabledStartRent}
          orderId={orderId}
          handleStartRent={handleStartRent}
        />

        {/* BUTTONS AREA */}
        <ServiceForm
          disabled={disableAll}
          companyId={shopId || ''}
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
          disabled={!shippingEnabled}
          handleAssign={async (email, date) => {
            updateOrder(orderId, {
              //@ts-ignore
              'shipping.assignedToEmail': email,
              'shipping.date': date || null
            })
              .then(console.log)
              .catch(console.error)
          }}
          assignedAt={order?.shipping?.date}
          assignedTo={order?.shipping?.assignedToEmail}
        />

        {status === 'canceled' ? (
          <ModalConfirm
            fullWidth
            color="primary"
            label="Restaurar orden"
            handleConfirm={handleResumeOrder}
            disabled={disableAll}
          >
            <Typography className="text-center">
              ¿Desea restaurar esta orden?
            </Typography>
          </ModalConfirm>
        ) : (
          <ModalConfirm
            fullWidth
            label="Cancelar orden"
            color="error"
            disabled={disableAll}
            handleConfirm={handleCancelRent}
          >
            <Typography className="text-center">
              {` Se restaurara esta orden como 'pendiente'`}
            </Typography>
            <Typography className="text-center">¿Esta de acuerdo?</Typography>
          </ModalConfirm>
        )}
        <ModalOrderForm
          label="Editar orden"
          icon="edit"
          order={order}
          disabled={disableAll}
          handleSave={handleSaveOrder}
          shippingEnabled={shippingEnabled}
          companyId={shopId || ''}
          shopClients={userShop?.clients || []}
        />
        <ModalConfirm
          fullWidth
          color="error"
          label={`${disableAll ? 'Orden borrada' : 'Eliminar orden'}`}
          disabled={disableAll}
          handleConfirm={handleDeleteOrder}
          acceptColor="error"
          acceptIcon="trash"
          acceptLabel="Eliminar"
          openIcon="trash"
        >
          <Typography className="text-center" variant="h6">
            Eliminar orden
          </Typography>
          <p className="text-center">
            <Typography className="text-center" variant="caption">
              Elimina esta orden de forma permanente, esta acción no es
              reversible.
            </Typography>
          </p>
          <p>
            <Typography className="text-center">
              {/* Eliminar esta orden  */}
            </Typography>
            <Typography className="text-center">
              {/* Este folio desaparecera de la lista de ordenes. Es preferible que la orden sea cancelada */}
            </Typography>
          </p>
        </ModalConfirm>
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
  const { orders, currentCompany } = useUserCompaniesContext()
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
  const confirmClientData = !!currentCompany?.confirmClientData

  const someItemAlreadyInUse = order?.items.some((i) => {
    const currentStatus = itemStatus(i.itemId || '', {
      companyOrders: orders
    }).status
    return currentStatus === 'taken'
  })

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
        disabledAccept={
          (confirmClientData ?? disabledConfirm) || someItemAlreadyInUse
        }
        openVariant="contained"
      >
        {/* <SelectCompanyItem
          itemsSelected={items?.map((i) => i.itemId || '') || []}
          setItems={(items) => {}}
          multiple
        /> */}

        <Typography variant="h5" className="my-4 text-center">
          Datos de cliente
        </Typography>
        <ClientForm
          searchClient={false}
          client={order?.client}
          setClient={(newClient) => {
            if (newClient) return handleUpdateClient(newClient)
          }}
          canClearForm={false}
        />
        <div className="text-center">
          <Typography variant="h5" className="my-4">
            Entregar unidades:{' '}
          </Typography>
          {order?.items.map((item) => {
            return (
              <div key={item.itemId} className="flex justify-center my-2 ">
                <ModalItemChange
                  // @ts-ignore FIXME: quantity should don't exist
                  itemSelected={{ ...item, qty: item.qty || item?.quantity }}
                  handleChangeItem={async (newItem) => {
                    const changedItem = {
                      //* It will change just the id of the item, it  don't change category or prices  */
                      amount: 0,
                      newItemId: newItem.itemId || '',
                      oldItemId: item.itemId || '',
                      resolved: true,
                      newPrice: {
                        price: item.price || 0,
                        qty: item.qty || 1,
                        unit: item.unit || 'hour'
                      }
                    }
                    try {
                      await changeItem(orderId, changedItem)
                        .then(console.log)
                        .catch(console.error)
                    } catch (error) {
                      console.error(error)
                    }
                  }}
                />
              </div>
            )
          })}
        </div>
        {confirmClientData && (
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
        )}

        {someItemAlreadyInUse && (
          <div className="text-center">
            <Typography variant="caption">
              * Las unidades ya estan en uso
            </Typography>
          </div>
        )}
      </ModalConfirm>
    </div>
  )
}

export default OrderActions

import { Button, Typography } from '@mui/material'
import ModalOrderForm from './ModalOrderForm'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { finishOrderRent, startOrderRent, updateOrder } from '@/firebase/orders'

import { useState } from 'react'
import { Order } from '@/types/order'

const OrderActions = ({
  orderId,
  onAction
}: {
  orderId: string
  onAction?: (action: 'start' | 'finish' | 'edit' | 'error') => void
}) => {
  const { orders } = useUserCompaniesContext()
  const order = orders?.find((o) => o?.id === orderId)

  const allItemsArePending = order?.items?.every(
    (i) => i.rentStatus === 'pending' || !i.rentStatus
  )
  const itemsPending = order?.items.some(
    (i) => i.rentStatus === 'pending' || !i.rentStatus
  )

  const itemsInUse = order?.items?.some((i) => i.rentStatus === 'taken')

  const itemsFinished = order?.items?.some((i) => i.rentStatus === 'finished')

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

  return (
    <div>
      <Typography variant="h5" className="mt-4">
        Acciones de la orden
      </Typography>
      <div className="grid gap-2 my-2 sm:grid-flow-col ">
        <ModalOrderForm
          label="Editar orden"
          icon="edit"
          order={order}
          handleSave={handleSaveOrder}
        />
        <Button
          disabled={loading || !itemsPending}
          onClick={(e) => {
            e.preventDefault()
            handleStartRent()
          }}
        >
          Comenzar renta
        </Button>
        <Button
          disabled={loading || !itemsInUse}
          onClick={(e) => {
            e.preventDefault()
            handleFinishRent()
          }}
        >
          Finalizar renta
        </Button>

        <Button
          disabled={loading || !allItemsArePending}
          onClick={(e) => {
            e.preventDefault()
            handleCancelRent()
          }}
        >
          Cancelar orden
        </Button>
      </div>
    </div>
  )
}

export default OrderActions

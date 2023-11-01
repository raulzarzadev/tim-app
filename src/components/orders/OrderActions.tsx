import { Button, Typography } from '@mui/material'
import ModalOrderForm from './ModalOrderForm'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import {
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

const OrderActions = ({
  orderId,
  onAction
}: {
  orderId: string
  onAction?: (action: 'start' | 'finish' | 'edit' | 'error') => void
}) => {
  const { orders, currentCompany } = useUserCompaniesContext()
  const order = orders?.find((o) => o?.id === orderId)

  const allItemsArePending = order?.items?.every(
    (i) => i.rentStatus === 'pending' || !i.rentStatus
  )
  const itemsPending = order?.items.some(
    (i) => i.rentStatus === 'pending' || !i.rentStatus
  )

  const itemsInUse = order?.items?.some((i) => i.rentStatus === 'taken')

  const itemsFinished = order?.items?.some((i) => i.rentStatus === 'finished')

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

  return (
    <div>
      <Typography variant="h5" className="mt-4">
        Acciones de orden
      </Typography>
      <div className="my-4">
        <ModalPayment
          amount={totalOrder}
          setPayment={handlePayOrder}
          fullWidth
        />
      </div>
      <div className="grid gap-2 my-6 sm:grid-flow-col ">
        <Button
          variant="outlined"
          disabled={loading || !itemsPending}
          onClick={(e) => {
            e.preventDefault()
            handleStartRent()
          }}
        >
          Comenzar renta
        </Button>
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

export default OrderActions

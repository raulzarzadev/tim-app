import {
  ItemOrder,
  useUserCompaniesContext
} from '@/context/userCompaniesContext2'
import asDate from '@/lib/asDate'
import { calculateFullTotal } from '@/lib/calculateTotalItem'
import { isAfter } from 'date-fns'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import { Box, Button, Typography } from '@mui/material'
import React, { ReactNode } from 'react'
import { finishItemRent, resumeRent, startItemRent } from '@/firebase/orders'
import ModalPayment from './ModalPayment2'

const ItemRentStatus = ({ item }: { item: ItemOrder }) => {
  const { companyItems } = useUserCompaniesContext()
  const pending = item.rentStatus === 'pending'
  const inUse = item.rentStatus === 'taken'
  const finished = item.rentStatus === 'finished'

  const onTime = isAfter(asDate(item.rentFinishAt) || new Date(), new Date())
  const orderTotal = calculateFullTotal(
    item.order.items,
    item.order.items?.map((i) => companyItems.find((c) => c.id === i.itemId))
  )

  const paymentsAmount =
    item?.order?.payments?.reduce((a, b) => a + b?.amount, 0) || 0

  const total = orderTotal - paymentsAmount

  const handleStartItemRent = async () => {
    return await startItemRent(item?.order?.id, item?.id || '')
  }
  const handleFinishRent = async () => {
    return await finishItemRent(item.order.id, item?.id || '')
  }
  const handleResumeRent = async () => {
    return await resumeRent({
      itemId: item?.id || '',
      orderId: item?.order?.id || ''
    })
  }

  return (
    <div className="grid gap-4 ">
      {total !== 0 && (
        <ModalItemStatus
          label={`${total < 0 ? 'Devolver ' : 'Cobrar'} pendiente $${Math.abs(
            total
          ).toFixed(2)}`}
          status="warning"
        >
          <Typography className="text-center my-4">
            {total < 0 ? 'Devolver' : 'Cobrar'} Diferencia
          </Typography>
          <Box className="text-center">
            <ModalPayment amount={total} orderId={item?.order?.id} />
          </Box>
        </ModalItemStatus>
      )}
      {pending && (
        <ModalItemStatus
          label="Entrega pendiente"
          status="pending"
          onAction={handleStartItemRent}
          actionLabel="Entregar"
          closeModal
        >
          <Typography>Entrega pendiente</Typography>
        </ModalItemStatus>
      )}
      {inUse && !onTime && (
        <ModalItemStatus
          label="Fuera de tiempo"
          status="error"
          onAction={() => {
            return handleFinishRent()
          }}
          actionLabel="Recibir"
          closeModal
        >
          <Typography className="text-center">
            Unidad fuera de tiempo
          </Typography>
        </ModalItemStatus>
      )}
      {inUse && onTime && (
        <ModalItemStatus
          label="En uso"
          status="success"
          onAction={handleFinishRent}
          actionLabel="Recibir"
          closeModal
        >
          <Typography className="text-center">Unidad en uso</Typography>
        </ModalItemStatus>
      )}

      {finished && onTime && (
        <ModalItemStatus
          label="Terminado"
          status="success"
          actionLabel="Devolver"
          onAction={handleResumeRent}
          closeModal
        >
          <Typography className="text-center">
            Renta finalizada. ¿Retomar?
          </Typography>
        </ModalItemStatus>
      )}
    </div>
  )
}
type ItemStatusCard = {
  status: 'error' | 'success' | 'pending' | 'warning'
  label: string
}
type ModalItemStatus = ItemStatusCard & {
  onAction?: () => Promise<any> | void
  actionLabel?: string
  children?: ReactNode
  closeModal?: boolean
}
const ModalItemStatus = ({
  status,
  label,
  onAction,
  actionLabel = 'Action label',
  closeModal,
  children
}: ModalItemStatus) => {
  const modal = useModal({ title: label })
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          modal.onOpen()
        }}
      >
        <ItemStatus label={label} status={status} />
      </button>
      <Modal {...modal}>
        {children}
        {onAction && (
          <Box className="flex justify-center mt-4">
            <Button
              className=""
              variant="outlined"
              color={status === 'pending' ? 'info' : status}
              onClick={async (e) => {
                e.stopPropagation()
                e.preventDefault()
                closeModal && modal.onClose()
                await onAction?.()
              }}
            >
              {actionLabel}
            </Button>
          </Box>
        )}
      </Modal>
    </>
  )
}

const ItemStatus = ({ status, label = '' }: ItemStatusCard) => {
  const statusColor = {
    error: 'bg-red-400',
    success: 'bg-green-400',
    pending: 'bg-blue-400',
    warning: 'bg-yellow-400'
  }
  return (
    <div
      className={`${statusColor[status]} uppercase  sm:p-2 sm:text-sm rounded-md  truncate  items-center flex justify-center text-xs shadow-md whitespace-pre-line `}
    >
      <Typography className="text-sm">{label}</Typography>
    </div>
  )
}

export default ItemRentStatus

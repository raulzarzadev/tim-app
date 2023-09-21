'use client'
import useModal from '@/hooks/useModal'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import Modal from './Modal'
import {
  cancelClientPayment,
  deleteClient,
  getClient,
  updateClient
} from '@/firebase/clients'

import ModalConfirm from './ModalConfirm'
import { PaymentMethods, paymentMethods } from '@/CONSTS/paymentMethods'
import CurrencySpan from './CurrencySpan'
import asNumber from '@/lib/asNumber'
import ButtonLoading from './ButtonLoading'
import { Payment } from '@/types/payment'
import addDiscount from '@/lib/addDiscount'
import { dateFormat } from '@/lib/utils-date'
import asDate from '@/lib/asDate'
import PaymentForm from './PaymentForm'

const ModalPayment = ({ amount }: { amount: number }) => {
  const USD_PRICE = 16
  const modalPayment = useModal({ title: 'Pagar ' })

  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault()
          modalPayment.onOpen()
        }}
        size="small"
      >
        {'Pagar'}
      </Button>
      <Modal {...modalPayment}>
        <Box>
          <Typography variant="h5" className="text-center">
            Total: <CurrencySpan quantity={amount} />
          </Typography>
          <Typography variant="body2" className="text-center">
            (usd): <CurrencySpan quantity={amount / USD_PRICE} />
          </Typography>
        </Box>
        <PaymentForm amount={amount} usdPrice={USD_PRICE} />
      </Modal>
    </>
  )
}

const AmountInfo = ({
  subtotal = 0,
  discount = 0,
  dollarPrice = 0,
  payment
}: {
  subtotal?: number
  discount?: number
  dollarPrice?: number
  payment?: Payment
}) => {
  const total = addDiscount(subtotal, discount)
  return (
    <>
      {payment ? (
        <Box className="text-center">
          <Typography>Pagado</Typography>
          <Typography variant="h5">
            <CurrencySpan
              quantity={addDiscount(payment.amount, payment.discount)}
            />
          </Typography>
          {payment.discount > 0 && (
            <p>
              <span>Descuento:</span>
              <Typography color={'green'} component={'span'}>
                -{payment.discount}%
              </Typography>
            </p>
          )}
          <span className="text-sm font-normal">
            Metodo de pago:{' '}
            {paymentMethods.find((p) => p.type === payment.method)?.label}
            {payment.method === 'usd' && ` ($${payment.dollarPrice})`}
          </span>
          <Typography>
            {dateFormat(
              asDate(payment.created.at || payment.date),
              'dd/MMM HH:mm'
            )}
          </Typography>
        </Box>
      ) : (
        <Box className="text-end">
          {!!discount && (
            <>
              <Typography>
                Subtotal:
                <CurrencySpan quantity={subtotal} />{' '}
              </Typography>
              <Typography>
                Descuento:
                <Typography component={'span'}> %{discount}</Typography>
              </Typography>
            </>
          )}
          <Typography>
            <Typography component={'span'}>
              <CurrencySpan quantity={total} />
              {'mxn'}
            </Typography>
          </Typography>
          <Typography>
            <Typography component={'span'} className="text-xs">
              (<CurrencySpan quantity={dollarPrice} />)
            </Typography>
            <Typography component={'span'}>
              <CurrencySpan quantity={total / dollarPrice} />
              {'usd'}
            </Typography>
          </Typography>
        </Box>
      )}
    </>
  )
}

const ModalCancelPayment = ({ clientId }: { clientId: string }) => {
  const modal = useModal({ title: 'Cancelar pago' })
  const handleCancelPayment = (clientId: string) => {
    console.log('cancel', clientId)
    //updateClient(clientId,{payment})
    return cancelClientPayment({ clientId })
  }
  return (
    <Box>
      <ModalConfirm
        handleConfirm={() => handleCancelPayment(clientId)}
        label="Cancelar pago"
        color="success"
      >
        <Typography className="text-center my-6">
          ¿Estas seguro de que desas cancelar este pago?
        </Typography>
      </ModalConfirm>
    </Box>
  )
}

const ModalEditPayment = ({ payment }: { payment: Payment }) => {
  const modalEdit = useModal({ title: 'Editar pago' })

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={(e) => {
          e.preventDefault()
          modalEdit.onOpen()
        }}
      >
        Editar
      </Button>
      <Modal {...modalEdit}>
        <AmountInfo payment={payment} />
      </Modal>
    </>
  )
}
export default ModalPayment

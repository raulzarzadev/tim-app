'use client'
import useModal from '@/hooks/useModal'
import { Box, Button, Typography } from '@mui/material'
import Modal from './Modal'
import CurrencySpan from './CurrencySpan'
import PaymentForm from './PaymentForm'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import useCashboxContext from '@/context/useCompanyCashbox'
import { Payment } from '@/types/order'
import { useAuthContext } from '@/context/authContext'

const ModalPayment = ({
  amount,
  disabled,
  setPayment,
  label = 'Pagar'
}: {
  label?: string
  setPayment?: (payment: Payment) => void
  amount: number
  disabled?: boolean
}) => {
  const { user } = useAuthContext()
  const modalPayment = useModal({ title: 'Pagar ' })

  const { currentCompany } = useUserCompaniesContext()
  const USD_PRICE = currentCompany?.usdPrice || 1

  const onPay = async (payment: Payment) => {
    setPayment?.(payment)
    modalPayment.onClose()
    // const res = await handlePay?.(payment, orderId)
    // console.log(res)
    // onClearOrder?.()
    // onCloseParent?.()
  }
  const staffEmail = user?.email
  return (
    <>
      <Button
        variant="outlined"
        onClick={(e) => {
          e.preventDefault()
          modalPayment.onOpen()
        }}
        size="large"
        color="success"
        disabled={disabled}
      >
        {label}{' '}
        <span className="font-bold ml-2 text-lg">
          <CurrencySpan quantity={amount} />
        </span>
      </Button>
      <Modal {...modalPayment}>
        <Box>
          <Typography variant="h5" className="text-center">
            Total: <CurrencySpan quantity={amount} />
          </Typography>
          <Typography variant="body2" className="text-center">
            (precio del dolar <CurrencySpan quantity={USD_PRICE} />
            ):{' '}
            <span className="font-bold">
              <CurrencySpan quantity={amount / USD_PRICE} />
            </span>
          </Typography>
        </Box>
        <PaymentForm
          exactAmount={false}
          amount={amount}
          usdPrice={USD_PRICE}
          onPay={async (payment) => {
            //TODO: should be created in the fact and add an id and save order in this moment?
            onPay?.({
              ...payment,
              amount: payment.charged || 0,
              created: {
                by: staffEmail || '',
                at: new Date()
              }
            })
          }}
        />
      </Modal>
    </>
  )
}

export default ModalPayment

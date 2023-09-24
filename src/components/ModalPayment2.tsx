'use client'
import useModal from '@/hooks/useModal'
import { Box, Button, Typography } from '@mui/material'
import Modal from './Modal'
import CurrencySpan from './CurrencySpan'
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
        <PaymentForm
          amount={amount}
          usdPrice={USD_PRICE}
          onPay={(props) => {
            console.log({ props })
          }}
        />
      </Modal>
    </>
  )
}

export default ModalPayment

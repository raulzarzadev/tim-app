'use client'
import useModal from '@/hooks/useModal'
import { Box, Button, Typography } from '@mui/material'
import Modal from './Modal'
import CurrencySpan from './CurrencySpan'
import PaymentForm from './PaymentForm'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import AppIcon from './AppIcon'
import useCashboxContext from '@/context/useCompanyCashbox'
import { Payment } from '@/types/order'

const ModalPayment = ({
  amount,
  disabled,
  onCloseParent
}: {
  amount: number
  disabled?: boolean
  onCloseParent?: () => void
}) => {
  const modalPayment = useModal({ title: 'Pagar ' })
  const { handleOrder, handlePayOrder, setItemsSelected, setClient } =
    useCashboxContext()
  const { currentCompany } = useUserCompaniesContext()
  const USD_PRICE = currentCompany?.usdPrice || 1

  const handlePay = async (payment: Partial<Payment>) => {
    // create order
    const order = await handleOrder?.({
      companyId: currentCompany?.id || ''
    })
    //@ts-ignore
    const orderId = order?.res?.id
    if (orderId) {
      const res = await handlePayOrder?.(orderId || '', payment)
      // pay order
      modalPayment.onClose()
      setItemsSelected?.([])
      setClient?.({})
      onCloseParent?.()
    }
  }
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
        {'Pagar'} <AppIcon icon="money" />
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
          amount={amount}
          usdPrice={USD_PRICE}
          onPay={async (payment) => {
            handlePay?.(payment)
          }}
        />
      </Modal>
    </>
  )
}

export default ModalPayment

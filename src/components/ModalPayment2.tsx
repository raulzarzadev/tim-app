'use client'
import useModal from '@/hooks/useModal'
import { Box, Button, Typography } from '@mui/material'
import Modal from './Modal'
import CurrencySpan from './CurrencySpan'
import PaymentForm from './PaymentForm'
import { useContext } from 'react'
import { CashboxContext } from './CompanyCashbox'
import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import AppIcon from './AppIcon'

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
  const { handlePay, items, setItems, setClient } = useContext(CashboxContext)
  const { currentCompany } = useUserCompaniesContext()
  const USD_PRICE = currentCompany?.usdPrice || 1
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
            await handlePay?.({
              startAt: new Date(),
              companyId: currentCompany?.id || '',
              items: items || [],
              payment: { ...payment, date: new Date() }
            })
            modalPayment.onClose()
            setItems?.([])
            setClient?.({})
            onCloseParent?.()
            return
          }}
        />
      </Modal>
    </>
  )
}

export default ModalPayment

'use client'
import { Box, Button, Typography } from '@mui/material'
import Modal from '../Modal'
import useModal from '@/hooks/useModal'
import BalanceForm, { Balance } from './BalanceForm'
import {
  ItemOrder,
  useUserCompaniesContext
} from '@/context/userCompaniesContext2'
import { isAfter, isBefore } from 'date-fns'
import asDate from '@/lib/asDate'
import forceAsDate from '@/lib/forceAsDate'
import { Order } from '@/types/order'
import { useState } from 'react'
import CurrencySpan from '../CurrencySpan'

type BalanceItem = Pick<ItemOrder, 'id' | 'name' | 'serialNumber' | 'category'>
const getOrdersByBalanceForm = (
  balance: Balance,
  orders?: Partial<Order>[]
): Partial<Order>[] => {
  const filteredByDate = orders?.filter(
    (o) =>
      isAfter(forceAsDate(o?.created?.at), forceAsDate(balance.from)) &&
      isBefore(forceAsDate(o?.created?.at), forceAsDate(balance.to))
  )
  const filteredByUser = filteredByDate?.filter((o) =>
    balance.cashier === 'all' ? true : o.created?.byEmail === balance.cashier
  )
  return filteredByUser || []
}

type BalanceDataFromOrders = {
  changes?: Order['changes'] & {
    order?: Partial<Order>
  }
  payments?: Order['payments'] & { order?: Partial<Order> }
  totalFromPayments?: number

  items: BalanceItem[]
}
const balanceDataFromOrders = (
  orders?: Partial<Order>[]
): BalanceDataFromOrders => {
  const payments = orders
    ?.map((o) => o.payments?.map((p) => ({ ...p, order: o })) || [])
    ?.flat()
  const changes = orders
    ?.map((o) => o?.changes?.map((c) => ({ ...c, order: o })) || [])
    ?.flat()
  const totalFromPayments = payments
    ?.flat()
    ?.map((p) => p?.amount)
    ?.reduce((p, c) => (p || 0) + (c || 0), 0)
  const items: any[] =
    orders?.map((o) => o.items?.map((i) => ({ ...i })) || []).flat() || []
  console.log({ items })
  return { changes, payments, totalFromPayments, items }
}
type BalanceData = {
  orders?: Partial<Order>[]
} & BalanceDataFromOrders
const calculateBalance = (
  balance: Balance,
  orders?: Partial<Order>[]
): BalanceData => {
  const matchOrders = getOrdersByBalanceForm(balance, orders)
  const balanceData = balanceDataFromOrders(matchOrders)
  return {
    orders: matchOrders,
    ...balanceData
  }
}
const ModalBalanceForm = () => {
  const modal = useModal({ title: 'Nuevo corte' })
  const { orders, currentCompany } = useUserCompaniesContext()
  const [balance, setBalance] = useState<BalanceData>()
  const handleCalculateBalance = async (balance: Balance) => {
    const balanceData = calculateBalance(balance, orders)
    setBalance(balanceData)
    //console.log({ balanceData })
  }
  return (
    <div className="flex w-full justify-center my-4">
      <Button
        variant="outlined"
        onClick={(e) => {
          e.preventDefault()
          modal.onOpen()
        }}
      >
        Nuevo corte
      </Button>
      <Modal {...modal}>
        <BalanceForm onCalculateBalance={handleCalculateBalance} />
        {balance && <BalanceCard balance={balance} />}
      </Modal>
    </div>
  )
}

const BalanceCard = ({ balance }: { balance: BalanceData }) => {
  return (
    <Box>
      <Typography>Ordenes: {balance?.orders?.length || 0}</Typography>
      <Typography>Pagos: {balance?.payments?.length || 0}</Typography>
      <Typography>Cambios: {balance?.changes?.length}</Typography>
      <Typography>Unidades: {balance?.items?.length}</Typography>
      <Typography>
        Total estimado: <CurrencySpan quantity={balance.totalFromPayments} />
      </Typography>
    </Box>
  )
}

export default ModalBalanceForm

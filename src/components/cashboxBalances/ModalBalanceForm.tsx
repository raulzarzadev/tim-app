'use client'
import { Button } from '@mui/material'
import Modal from '../Modal'
import useModal from '@/hooks/useModal'
import BalanceForm, { Balance } from './BalanceForm'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { isAfter, isBefore } from 'date-fns'
import asDate from '@/lib/asDate'

const ModalBalanceForm = () => {
  const modal = useModal({ title: 'Nuevo corte' })
  const { orders, currentCompany } = useUserCompaniesContext()
  const handleCalculateBalance = async (balance: Balance) => {
    // console.log(balance.cashier, currentCompany?.staff)
    const cashierId =
      balance.cashier !== 'all' &&
      currentCompany?.staff?.find((s) => s.email === balance.cashier)?.email
    console.log(orders?.map((o) => o.created.byEmail))
    // console.log({ cashierId })
    // console.log(
    //   orders?.filter(
    //     (o) =>
    //       isAfter(asDate(o.created.at), balance.from) &&
    //       isBefore(asDate(o.created.at), balance.to)
    //   )
    // )
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
      </Modal>
    </div>
  )
}

export default ModalBalanceForm

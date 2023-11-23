'use client'
import { Button } from '@mui/material'
import Modal from '../Modal'
import useModal from '@/hooks/useModal'
import BalanceForm from './BalanceForm'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'

import { useState } from 'react'
import BalanceCard from './BalanceCard'
import AppIcon from '../AppIcon'
import { Balance, BalanceData } from '@/types/balance'
import { balanceItemsData } from './balance.lib'
import { CreateBalance, createBalance } from '@/firebase/balances'
import forceAsDate from '@/lib/forceAsDate'
import { calculateBalance } from './calculateBalance.lib'

const ModalBalanceForm = () => {
  const modal = useModal({ title: 'Nuevo corte' })
  const { orders, currentCompany } = useUserCompaniesContext()
  const [saved, setSaved] = useState(false)
  const [balance, setBalance] = useState<BalanceData>()
  const [balanceProps, setBalanceProps] = useState<Balance>()
  const handleCalculateBalance = async (balance: Balance) => {
    setSaved(false)
    setBalanceProps(balance)
    const b = calculateBalance(balance, orders)
    setBalance(b)
  }
  const handleSave = async () => {
    setSaved(true)
    const newBalance: CreateBalance = {
      orders: balance?.orders || [],
      from: forceAsDate(balanceProps?.from),
      to: forceAsDate(balanceProps?.to),
      cashier: balanceProps?.cashier || '',
      companyId: currentCompany?.id || ''
    }
    try {
      const res = await createBalance(newBalance)
      console.log({ res })
    } catch (error) {
      setSaved(false)
      console.error(error)
    }
  }
  return (
    <div className="flex w-full justify-center my-4">
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault()
          modal.onOpen()
        }}
      >
        Nuevo corte
      </Button>

      <Modal {...modal}>
        <BalanceForm onCalculateBalance={handleCalculateBalance} />
        {balance && (
          <>
            <Button
              disabled={saved}
              variant="outlined"
              color="secondary"
              onClick={async (e) => {
                e.preventDefault()
                return await handleSave()
              }}
              fullWidth
            >
              Guardar <AppIcon icon="save"></AppIcon>
            </Button>
            <BalanceCard balance={balance} />
          </>
        )}
      </Modal>
    </div>
  )
}

export default ModalBalanceForm

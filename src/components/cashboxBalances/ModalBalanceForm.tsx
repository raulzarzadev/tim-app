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
import { balanceItemsData, calculateBalance } from './balance.lib'
import { CreateBalance, createBalance } from '@/firebase/balances'
import forceAsDate from '@/lib/forceAsDate'

const ModalBalanceForm = () => {
  const modal = useModal({ title: 'Nuevo corte' })
  const { orders, currentCompany } = useUserCompaniesContext()
  const [saved, setSaved] = useState(false)
  const [balance, setBalance] = useState<BalanceData>()
  const [balanceProps, setBalanceProps] = useState<Balance>()
  const handleCalculateBalance = async (balance: Balance) => {
    setSaved(false)
    setBalanceProps(balance)
    const balanceData = calculateBalance(balance, orders)
    const itemsData = balanceItemsData(
      balanceData.items || [],
      currentCompany?.articles || []
    )
    setBalance({ ...balanceData, ...balance, itemsStats: itemsData })
    //console.log({ balanceData })
  }
  const handleSave = async () => {
    const newBalance: CreateBalance = {
      orders: balance?.orders || [],
      from: forceAsDate(balanceProps?.from),
      to: forceAsDate(balanceProps?.to),
      cashier: balanceProps?.cashier || '',
      companyId: currentCompany?.id || ''
    }
    await createBalance(newBalance).then((res) => {
      setSaved(true)
    })
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
              onClick={(e) => {
                e.preventDefault()
                handleSave()
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

import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { listenCompanyBalances } from '@/firebase/balances'
import { BalanceData, BalanceType } from '@/types/balance'
import { useEffect, useState } from 'react'
import MyTable, { MyTableData } from '../MyTable'
import { dateFormat } from '@/lib/utils-date'
import forceAsDate from '@/lib/forceAsDate'
import Modal from '../Modal'
import useModal from '@/hooks/useModal'
import { balanceItemsData, calculateBalance } from './balance.lib'
import BalanceCard from './BalanceCard'
import { Typography } from '@mui/material'
import ErrorBoundary from '../ErrorBoundary'

const BalancesTable = () => {
  const { currentCompany } = useUserCompaniesContext()
  const [balances, setBalances] = useState<BalanceType[]>()
  useEffect(() => {
    listenCompanyBalances(currentCompany?.id || '', setBalances)
  }, [currentCompany?.id])

  const table: MyTableData = {
    headers: [
      {
        key: 'created.at',
        label: 'fecha creación',
        format(value) {
          return dateFormat(forceAsDate(value), 'dd/MM/yy HH:mm')
        }
      },
      {
        key: 'created.byEmail',
        label: 'Creado por',
        format(value) {
          return currentCompany?.staff?.find((s) => s.email === value)?.name
        }
      },
      {
        key: 'orders',
        label: 'Ordenes',
        format(value) {
          return value?.length
        }
      }
    ],
    body: balances || []
  }
  const modal = useModal({ title: 'Detalle de corte' })
  const [balanceDetails, setBalanceDetails] = useState<BalanceData>()
  const onRowClick = (balanceId: string) => {
    modal.onOpen()
    const balance = balances?.find((b) => b.id === balanceId)
    const balanceData = calculateBalance(
      {
        from: forceAsDate(balance?.from),
        to: forceAsDate(balance?.to),
        cashier: balance?.cashier || ''
      },
      balance?.orders
    )
    const itemsData = balanceItemsData(
      balanceData?.items || [],
      currentCompany?.articles || []
    )
    setBalanceDetails({ ...balanceData, ...balance, itemsStats: itemsData })
  }
  return (
    <div>
      <ErrorBoundary componentName="BalancesTable">
        <MyTable data={table} onRowClick={onRowClick} />
        <Modal {...modal}>
          {balanceDetails ? (
            <BalanceCard balance={balanceDetails} />
          ) : (
            <Typography>No hay detalles de este corte</Typography>
          )}
        </Modal>
      </ErrorBoundary>
    </div>
  )
}

export default BalancesTable

import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { listenCompanyBalances } from '@/firebase/balances'
import { BalanceData, BalanceType } from '@/types/balance'
import { useEffect, useState } from 'react'
import MyTable, { MyTableData } from '../MyTable'
import { dateFormat } from '@/lib/utils-date'
import forceAsDate from '@/lib/forceAsDate'
import Modal from '../Modal'
import useModal from '@/hooks/useModal'
import { balanceItemsData } from './balance.lib'
import BalanceCard from './BalanceCard'
import { Typography } from '@mui/material'
import ErrorBoundary from '../ErrorBoundary'
import { calculateBalance } from './calculateBalance.lib'

const BalancesTable = () => {
  const { currentCompany, orders } = useUserCompaniesContext()
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

  if (balances === undefined) return <div>Cargando...</div>
  if (table.body.length === 0) return <div>No hay balances aún</div>
  return (
    <div>
      <ErrorBoundary componentName="BalancesTable">
        <MyTable
          modalTitle="Detalles de corte"
          modalChildren={(value) => {
            const b = calculateBalance(value, value?.orders || [])
            return <BalanceCard balance={b} />
          }}
          data={table}
        />
        {/* <Modal {...modal}>
          {balanceDetails ? (
            <BalanceCard balance={balanceDetails} />
          ) : (
            <Typography>No hay detalles de este corte</Typography>
          )}
        </Modal> */}
      </ErrorBoundary>
    </div>
  )
}

export default BalancesTable

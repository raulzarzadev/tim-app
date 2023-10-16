import { Box, Typography } from '@mui/material'
import ErrorBoundary from '../ErrorBoundary'
import ModalBalanceForm from './ModalBalanceForm'
import BalancesTable from './BalancesTable'

const CompanyBalances = () => {
  return (
    <ErrorBoundary>
      <div>
        <Typography variant="h5" className="text-center mt-4">
          Cortes de caja
        </Typography>
        <Box>
          <ModalBalanceForm />
        </Box>
      </div>
      <BalancesTable />
    </ErrorBoundary>
  )
}

export default CompanyBalances

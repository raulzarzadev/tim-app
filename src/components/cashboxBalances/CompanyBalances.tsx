import { Box, Typography } from '@mui/material'
import ErrorBoundary from '../ErrorBoundary'
import ModalBalanceForm from './ModalBalanceForm'

const CompanyBalances = () => {
  return (
    <ErrorBoundary>
      <div>
        <Typography variant="h5" className="text-center">
          Cortes de caja
        </Typography>
        <Box>
          <ModalBalanceForm />
        </Box>
      </div>
    </ErrorBoundary>
  )
}

export default CompanyBalances

import ErrorBoundary from '@/components/ErrorBoundary'
import UserCompanies from '@/components/UserCompanies'
import { Container } from '@mui/material'

const Page = async () => {
  return (
    <>
      <ErrorBoundary componentName="Dashboard">
        <UserCompanies />
      </ErrorBoundary>
    </>
  )
}

export default Page

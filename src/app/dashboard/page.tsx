import ErrorBoundary from '@/components/ErrorBoundary'
import UserCompanies from '@/components/UserCompanies'
import { Container } from '@mui/material'

const Page = async () => {
  return (
    <Container>
      <ErrorBoundary componentName="Dashboard">
        <UserCompanies />
      </ErrorBoundary>
    </Container>
  )
}

export default Page

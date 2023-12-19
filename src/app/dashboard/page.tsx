import ErrorBoundary from '@/components/ErrorBoundary'
import UserCompanies from '@/components/UserCompanies'

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

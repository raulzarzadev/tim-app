import BasicTabs from '@/components/BasicTabs'
import CompanyArticles from '@/components/CompanyArticles'
import CompanyCategories from '@/components/CompanyCategories'
import CompanyStaff from '@/components/CompanyStaff'
import ErrorBoundary from '@/components/ErrorBoundary'
import UserCompanies from '@/components/UserCompanies'
import { Container } from '@mui/material'

const Page = async () => {
  return (
    <ErrorBoundary componentName="Dashboard">
      <Container>
        <UserCompanies />
        <BasicTabs
          tabs={[
            { label: 'Categorias', content: <CompanyCategories /> },
            { label: 'Articulos', content: <CompanyArticles /> },
            { label: 'Staff', content: <CompanyStaff /> }
          ]}
        />
      </Container>
    </ErrorBoundary>
  )
}

export default Page

import BasicTabs from '@/components/BasicTabs'
import CompanyArticles from '@/components/CompanyArticles'
import CompanyCategories from '@/components/CompanyCategories'
import UserCompanies from '@/components/UserCompanies'
import { Container } from '@mui/material'

const Page = async () => {
  return (
    <Container>
      <UserCompanies />
      <BasicTabs
        tabs={[
          { label: 'Categorias', content: <CompanyCategories /> },
          { label: 'Articulos', content: <CompanyArticles /> }
        ]}
      />
    </Container>
  )
}

export default Page

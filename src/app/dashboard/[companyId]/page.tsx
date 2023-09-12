import CompanyArticles from '@/components/CompanyArticles'
import CompanyCategories from '@/components/CompanyCategories'
import UserCompanies from '@/components/UserCompanies'
import { Container } from '@mui/material'

const Page = async () => {
  return (
    <Container>
      <UserCompanies />
      <CompanyCategories />
      <CompanyArticles />
    </Container>
  )
}

export default Page

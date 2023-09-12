import CompanyArticles from '@/components/CompanyArticles'
import UserCompanies from '@/components/UserCompanies'
import { Container } from '@mui/material'

const Page = async () => {
  return (
    <Container>
      <UserCompanies />
      <CompanyArticles />
    </Container>
  )
}

export default Page

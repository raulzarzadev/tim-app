import CompanyForm from '@/components/CompanyForm'

import { Container, Typography } from '@mui/material'

const Page = () => {
  return (
    <Container>
      <Typography
        component={'h2'}
        className="text-center text-xl font-bold my-4"
      >
        Crea una empresa
      </Typography>
      <Typography component={'p'} className="text-center my-4">
        Y comienza a rentar ahora
      </Typography>
      <CompanyForm />
    </Container>
  )
}

export default Page

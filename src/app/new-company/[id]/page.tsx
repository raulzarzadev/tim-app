'use client'
import CompanyForm from '@/components/CompanyForm'
import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { Container, Typography } from '@mui/material'

const Page = () => {
  const { companies, selected } = useUserCompaniesContext()
  const company = companies.find((company) => company?.id === selected)
  if (!company) return <div>Cargando...</div>
  return (
    <Container>
      <Typography
        component={'h2'}
        className="text-center text-xl font-bold my-4"
      >
        Editar empresa
      </Typography>

      <CompanyForm company={company} />
    </Container>
  )
}

export default Page

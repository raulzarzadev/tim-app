'use client'
import CompanyForm from '@/components/CompanyForm'
import ModalConfirm from '@/components/ModalConfirm'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { deleteCompany } from '@/firebase/companies'
import { Button, Container, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const Page = () => {
  const { currentCompany } = useUserCompaniesContext()

  const router = useRouter()
  const handleDeleteCompany = async () => {
    await deleteCompany(currentCompany?.id || '')
    router.back()
  }
  if (!currentCompany) return <div>Cargando...</div>
  return (
    <Container>
      <Typography
        component={'h2'}
        className="text-center text-xl font-bold my-4"
      >
        Editar empresa
      </Typography>
      <div className="max-w-md mx-auto">
        <CompanyForm company={currentCompany} />
      </div>
      <div className="flex justify-center mt-20">
        <ModalConfirm
          label="Eliminar empresa"
          color="error"
          handleConfirm={handleDeleteCompany}
        >
          <Typography>
            Se eliminara esta empresa, incluyendo articulos y categorias
          </Typography>
          <Typography className="text-center my-4">
            ¿Desas continuar?
          </Typography>
        </ModalConfirm>
      </div>
    </Container>
  )
}

export default Page

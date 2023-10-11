'use client'
import CategoryForm from '@/components/CategoryForm'
import ModalConfirm from '@/components/ModalConfirm'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { removeCategory } from '@/firebase/categories'
import { Box, Container, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

const Page = () => {
  const router = useRouter()
  const params = useParams()
  const categoryName = decodeURIComponent(String(params.name))

  const { currentCompany } = useUserCompaniesContext()
  const category = currentCompany?.categories?.find(
    (c) => c.name === categoryName
  )
  const [done, setDone] = useState(false)
  const handleRemoveCategory = () => {
    removeCategory(currentCompany?.id || '', categoryName)
      .then((res) => {
        router.back()
        console.log(res)
      })
      .catch(console.error)
      .finally(() => {
        setDone(true)
      })
  }
  if (!category) return <div>Cargando...</div>
  return (
    <Container>
      <Typography
        component={'h2'}
        className="text-center text-xl font-bold my-4"
      >
        Editar categoria
      </Typography>
      <CategoryForm category={category} />
      <Box className=" flex w-full py-4 my-4 justify-center">
        <ModalConfirm
          label="Eliminar categoria"
          color="error"
          handleConfirm={handleRemoveCategory}
          disabled={done}
        >
          Eliminar categoria
        </ModalConfirm>
      </Box>
    </Container>
  )
}

export default Page

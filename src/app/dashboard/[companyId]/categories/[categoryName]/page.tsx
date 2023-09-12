'use client'
import CategoryDetails from '@/components/CategoryDetails'
import { useCategory } from '@/context/userCompaniesContext'
import { Container } from '@mui/material'
import { useParams } from 'next/navigation'

const Page = () => {
  const { categoryName } = useParams()
  const category = useCategory({
    categoryName: decodeURIComponent(String(categoryName))
  })
  if (!category) return <div>Cargando...</div>
  return (
    <Container>
      <CategoryDetails category={category} />
    </Container>
  )
}

export default Page

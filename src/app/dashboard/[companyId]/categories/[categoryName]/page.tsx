'use client'
import CategoryDetails from '@/components/CategoryDetails'
import { useCategory } from '@/context/userCompaniesContext2'
import { Container } from '@mui/material'
import { useParams } from 'next/navigation'

const Page = () => {
  const { categoryName } = useParams()
  const category = useCategory({
    categoryName: decodeURIComponent(String(categoryName))
  })
  if (!category) return <div>Cargando...</div>
  return (
    <>
      <CategoryDetails category={category} />
    </>
  )
}

export default Page

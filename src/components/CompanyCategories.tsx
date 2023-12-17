'use client'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material'
import Link from 'next/link'
import { CategoryType } from '@/types/category'
import MyTable from './MyTable'
import CategoryDetails from './CategoryDetails'

const CompanyCategories = () => {
  const { currentCompany } = useUserCompaniesContext()
  if (!currentCompany) return <div>Cargando...</div>
  const categoryItems = (categoryName: string) => {
    return currentCompany?.articles?.filter(
      (article) => article.category === categoryName
    )
  }
  return (
    <div>
      <MyTable
        modalTitle="Categoria"
        modalChildren={(value) => <CategoryDetails category={value} />}
        data={{
          headers: [
            {
              label: 'Nombre',
              key: 'name'
            },
            // {
            //   label: 'Descripción',
            //   key: 'description'
            // },
            {
              label: 'Articulos',
              key: 'name',
              format: (value) => `${categoryItems(value)?.length || 0}`
            },
            {
              label: 'En uso',
              key: 'name',
              format: (value) =>
                `${
                  categoryItems(value)?.filter((i) => i.rentStatus === 'taken')
                    ?.length || 0
                }`
            },
            {
              label: 'Vencidos',
              key: 'name',
              format: (value) =>
                `${
                  categoryItems(value)?.filter(
                    (i) => i.rentStatus === 'expired'
                  )?.length || 0
                }`
            },

            {
              label: 'Disponibles',
              key: 'name',
              format: (value) =>
                `${
                  categoryItems(value)?.filter(
                    (i) => i.rentStatus === 'available'
                  )?.length || 0
                }`
            }
          ],
          body: currentCompany?.categories || []
        }}
      />
    </div>
  )
}

export default CompanyCategories

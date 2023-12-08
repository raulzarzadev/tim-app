'use client'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography
} from '@mui/material'
import AppIcon from './AppIcon'
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

const Category = ({ category }: { category: CategoryType }) => {
  const { currentCompany } = useUserCompaniesContext()
  const categoryItems = currentCompany?.articles?.filter(
    (article) => article.category === category.name
  )
  return (
    <Card sx={{ minWidth: 125 }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="div">
          {category.name}{' '}
          <span className="text-md"> ({categoryItems?.length})</span>
        </Typography>

        {/* <Typography sx={{ mb: 0.5 }} color="text.secondary">
          adjective
        </Typography> */}
        <Typography variant="body2">{category.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          LinkComponent={Link}
          href={`/dashboard/${currentCompany?.id}/categories/${category.name}`}
        >
          Ver más
        </Button>
      </CardActions>
    </Card>
  )
}

export default CompanyCategories

'use client'
import { useUserCompaniesContext } from '@/context/userCompaniesContext'
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

const CompanyCategories = () => {
  const { currentCompany } = useUserCompaniesContext()
  if (!currentCompany) return <div>Cargando...</div>
  return (
    <div>
      <Typography className="text-start font-bold text-lg" component={'h2'}>
        Categorias{' '}
        <IconButton color="success" LinkComponent={Link} href={'/new-category'}>
          <AppIcon icon="add" />
        </IconButton>
      </Typography>
      <Box className="grid grid-cols-2 gap-4">
        {currentCompany?.categories?.map((category) => (
          <Category key={category.name} category={category} />
        ))}
      </Box>
    </div>
  )
}

const Category = ({ category }: { category: CategoryType }) => {
  const { currentCompany } = useUserCompaniesContext()
  return (
    <Card sx={{ minWidth: 125 }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="div">
          {category.name}
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

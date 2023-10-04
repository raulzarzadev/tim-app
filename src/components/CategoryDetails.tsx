import {
  useCategoryArticles,
  useUserCompaniesContext
} from '@/context/userCompaniesContext'
import { CategoryType } from '@/types/category'
import { Box, Button, IconButton, Typography } from '@mui/material'
import ArticleCard from './ArticleCard'
import AppIcon from './AppIcon'
import Link from 'next/link'
import PricesList from './PricesList'
import ArticlesList from './ArticlesList'

const CategoryDetails = ({ category }: { category?: CategoryType }) => {
  const articles = useCategoryArticles({ categoryName: category?.name })
  const { currentCompany } = useUserCompaniesContext()
  return (
    <div>
      <Typography
        component={'h2'}
        className="text-center text-xl font-bold my-4"
      >
        {category?.name}{' '}
        <IconButton
          LinkComponent={Link}
          href={`/dashboard/${currentCompany?.id}/categories/${category?.name}/edit`}
        >
          <AppIcon icon="edit"></AppIcon>
        </IconButton>
      </Typography>
      <Typography className="text-center">{category?.description}</Typography>
      <Typography variant="h5">Precios</Typography>
      <PricesList prices={category?.prices || []} />
      <Typography variant="h5">Aticlulos</Typography>
      <Button
        LinkComponent={Link}
        href={`/dashboard/${currentCompany?.id}/articles/new?category=${category?.name}`}
      >
        Agregar articulo <AppIcon icon="add" />
      </Button>
      <ArticlesList articles={articles || []} />
    </div>
  )
}

export default CategoryDetails

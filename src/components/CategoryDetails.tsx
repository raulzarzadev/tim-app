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
      <Button
        LinkComponent={Link}
        href={`/dashboard/${currentCompany?.id}/articles/new?category=${category?.name}`}
      >
        Agregar articulo <AppIcon icon="add" />
      </Button>
      <PricesList prices={category?.prices || []} />
      <Typography>{category?.description}</Typography>
      <Box className="grid grid-cols-2 gap-4">
        {articles?.map((a) => (
          <ArticleCard article={a} key={a.id} />
        ))}
      </Box>
    </div>
  )
}

export default CategoryDetails

import {
  useCategoryArticles,
  useUserCompaniesContext
} from '@/context/userCompaniesContext'
import { CategoryType } from '@/types/category'
import { Button, IconButton, Typography } from '@mui/material'
import AppIcon from './AppIcon'
import Link from 'next/link'
import PricesList from './PricesList'
import ArticlesList from './ArticlesList'

const CategoryDetails = ({ category }: { category?: CategoryType }) => {
  const articles = useCategoryArticles({ categoryName: category?.name })
  const { currentCompany } = useUserCompaniesContext()
  if (!currentCompany) return <div>Cargando...</div>
  return (
    <div>
      <Typography
        component={'h2'}
        className="text-center text-xl font-bold my-4"
      >
        {category?.name}{' '}
        <IconButton
          color="info"
          LinkComponent={Link}
          href={`/dashboard/${currentCompany?.id}/categories/${category?.name}/edit`}
        >
          <AppIcon icon="edit"></AppIcon>
        </IconButton>
      </Typography>
      <Typography className="text-center">{category?.description}</Typography>
      <Typography variant="h5">Precios</Typography>
      <PricesList prices={category?.prices || []} />

      <ArticlesList articles={articles || []} companyId={currentCompany?.id} />
    </div>
  )
}

export default CategoryDetails

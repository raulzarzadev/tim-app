import { useCategoryArticles } from '@/context/userCompaniesContext'
import { CategoryType } from '@/types/category'
import { Box, Typography } from '@mui/material'
import ArticleCard from './ArticleCard'

const CategoryDetails = ({ category }: { category?: CategoryType }) => {
  const articles = useCategoryArticles({ categoryName: category?.name })
  return (
    <div>
      <Typography
        component={'h2'}
        className="text-center text-xl font-bold my-4"
      >
        {category?.name}
      </Typography>
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

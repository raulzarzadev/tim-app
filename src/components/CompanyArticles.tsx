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
import { ArticleType } from '@/types/article'

const CompanyArticles = () => {
  const { currentCompany } = useUserCompaniesContext()
  if (!currentCompany) return <div>Cargando...</div>
  return (
    <div>
      <Typography className="text-start font-bold text-lg" component={'h2'}>
        Articulos{' '}
        <IconButton
          color="success"
          LinkComponent={Link}
          href={`/dashboard/${currentCompany.id}/articles/new`}
        >
          <AppIcon icon="add" />
        </IconButton>
      </Typography>
      <Box className="grid grid-cols-2 gap-4">
        {currentCompany?.articles?.map((article) => (
          <Article key={article?.id} article={article} />
        ))}
      </Box>
    </div>
  )
}

const Article = ({ article }: { article: ArticleType }) => {
  const { currentCompany } = useUserCompaniesContext()
  return (
    <Card sx={{ minWidth: 125 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {article.category}
        </Typography>
        <Typography variant="h5" component="div">
          {article.name}
        </Typography>
        <Typography sx={{ mb: 0.5 }} color="text.secondary">
          {article.color}
        </Typography>
        {/* <Typography variant="body2">{article.color}</Typography> */}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          LinkComponent={Link}
          href={`/dashboard/${currentCompany?.id}/articles/${article.id}`}
        >
          Ver más
        </Button>
      </CardActions>
    </Card>
  )
}

export default CompanyArticles

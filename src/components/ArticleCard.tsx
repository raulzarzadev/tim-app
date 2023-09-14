import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { ArticleType } from '@/types/article'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material'
import Link from 'next/link'
import { removeArticle } from '@/firebase/articles'
import { useRouter } from 'next/navigation'

const ArticleCard = ({ article }: { article: ArticleType }) => {
  const { currentCompany } = useUserCompaniesContext()
  return (
    <Card sx={{ minWidth: 125 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {article.category}
        </Typography>
        <Typography variant="h5" component="div">
          {article.serialNumber}
          <Typography component={'span'} color="text.secondary">
            {' '}
            {article.name}
          </Typography>{' '}
        </Typography>
        <Typography sx={{ mb: 0.5 }} color="text.secondary">
          {article.color}
        </Typography>
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

export default ArticleCard

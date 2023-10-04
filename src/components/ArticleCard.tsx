import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { ArticleType } from '@/types/article'
import { Button, Card, CardActions, CardContent } from '@mui/material'
import Link from 'next/link'
import ArticleDetails from './ArticleDetails'

const ArticleCard = ({ article }: { article?: ArticleType }) => {
  const { currentCompany } = useUserCompaniesContext()
  return (
    <Card sx={{ minWidth: 125 }}>
      <CardContent>
        <ArticleDetails article={article} />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          LinkComponent={Link}
          href={`/dashboard/${currentCompany?.id}/articles/${article?.id}`}
        >
          Ver más
        </Button>
      </CardActions>
    </Card>
  )
}

export default ArticleCard

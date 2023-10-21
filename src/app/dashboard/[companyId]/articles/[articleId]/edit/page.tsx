'use client'
import ArticleForm from '@/components/ArticleForm'
import { useArticle } from '@/context/userCompaniesContext2'
import { Container, Typography } from '@mui/material'
import { useParams } from 'next/navigation'

const Page = () => {
  const { articleId } = useParams()
  const article = useArticle({ articleId: String(articleId) })
  if (!article) return <div>Cargando...</div>
  return (
    <Container className="my-4">
      <Typography variant="h4" className="my-4 text-center">
        Editar articulo
      </Typography>
      <ArticleForm article={article} />
    </Container>
  )
}

export default Page

'use client'
import ArticleManage from '@/components/AritcleManage'
import ArticleDetails from '@/components/ArticleDetails'
import { useArticle } from '@/context/userCompaniesContext'
import { Container } from '@mui/material'
import { useParams } from 'next/navigation'

const Page = () => {
  const { articleId } = useParams()
  const article = useArticle({ articleId: String(articleId) })
  if (!article) return <div>Cargando...</div>
  return (
    <Container>
      <ArticleDetails article={article} />
      <ArticleManage article={article} />
    </Container>
  )
}

export default Page

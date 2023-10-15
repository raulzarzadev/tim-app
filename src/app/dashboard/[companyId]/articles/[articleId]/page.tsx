'use client'
import ArticleManage from '@/components/AritcleManage'
import ArticleDetails from '@/components/ArticleDetails'
import { ItemOrder, useArticle } from '@/context/userCompaniesContext2'
import { Container } from '@mui/material'
import { useParams } from 'next/navigation'

const Page = () => {
  const { articleId } = useParams()
  const article = useArticle({ articleId: String(articleId) })
  if (!article) return <div>Cargando...</div>
  return (
    <Container>
      {/* FIXME: should pase a item with order or recept a item without order */}
      <ArticleDetails article={article as ItemOrder} />
      <ArticleManage article={article} />
    </Container>
  )
}

export default Page

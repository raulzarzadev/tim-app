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
    <>
      <Typography variant="h4" className="my-4 text-center">
        Editar unidad
      </Typography>
      <ArticleForm article={article} />
    </>
  )
}

export default Page

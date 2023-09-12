import { arrayRemove, arrayUnion } from 'firebase/firestore'
import { getCompany, updateCompany } from './companies'
import { ArticleType } from '@/types/article'
import { v4 as uidGenerator } from 'uuid'

export const addArticle = async (companyId: string, article: ArticleType) => {
  return await updateCompany(companyId, {
    articles: arrayUnion({ ...article, id: uidGenerator() })
  })
}

export const removeArticle = async (companyId: string, articleId: string) => {
  const { articles } = await getCompany(companyId)
  const article = articles.find(
    (c: { name: string; id: string }) => c.id === articleId
  )
  return await updateCompany(companyId, {
    articles: arrayRemove(article)
  })
}

export const updateArticle = async (
  companyId: string,
  articleId: string,
  updates: Partial<ArticleType>
) => {
  const { articles } = await getCompany(companyId)
  const article = articles.find(
    (c: { name: string; id: string }) => c.id === articleId
  )
  await updateCompany(companyId, {
    articles: arrayRemove(article)
  })
  await updateCompany(companyId, {
    articles: arrayUnion(updates)
  })
}

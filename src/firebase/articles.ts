import { arrayRemove, arrayUnion } from 'firebase/firestore'
import { getCompany, updateCompany } from './companies'
import { ArticleType } from '@/types/article'
import { v4 as uidGenerator } from 'uuid'
import { getItem, setItem, updateItem } from './items'

export const addArticle = async (
  companyId: string,
  article: Partial<ArticleType>
) => {
  return await updateCompany(companyId, {
    // @ts-ignore FIXME: Type 'ArticleType' is not assignable to type 'ArticleType'.
    articles: arrayUnion({ ...article, id: uidGenerator() })
  })
}

export const removeArticle = async (companyId: string, articleId: string) => {
  const { articles } = await getCompany(companyId)
  const article = articles.find(
    (c: { name: string; id: string }) => c.id === articleId
  )
  return await updateCompany(companyId, {
    // @ts-ignore FIXME: Type 'ArticleType' is not assignable to type 'ArticleType'.

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
    // @ts-ignore FIXME: Type 'ArticleType' is not assignable to type 'ArticleType'.

    articles: arrayRemove(article)
  })
    .then(console.log)
    .catch(console.error)
  await updateCompany(companyId, {
    // @ts-ignore FIXME: Type 'ArticleType' is not assignable to type 'ArticleType'.

    articles: arrayUnion({ ...article, ...updates })
  })
    .then(console.log)
    .catch(console.error)
}

export const toggleVisibleItem = async ({
  companyId,
  itemId
}: {
  companyId: string
  itemId: string
}) => {
  const storeItem = await getItem(itemId).catch(console.error)
  const { articles } = await getCompany(companyId)

  const companyItem = articles.find(
    (c: { name: string; id: string }) => c.id === itemId
  )

  companyItem.companyId = companyId

  const storeVisible = companyItem?.storeVisible

  if (storeItem) {
    updateItem(itemId, { storeVisible: !storeVisible })
      .then(console.log)
      .catch(console.error)
  } else {
    companyItem.storeVisible = !storeVisible
    setItem(itemId, companyItem).then(console.log).catch(console.error)
  }

  updateArticle(companyId || '', itemId, {
    storeVisible: !storeVisible
  })
    .then(console.log)
    .catch(console.error)
}

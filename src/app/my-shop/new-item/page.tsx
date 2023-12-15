'use client'
import ArticleFormShort from '@/components/ArticleFormShort'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'

const Page = () => {
  const { userShop } = useUserCompaniesContext()
  return (
    <ArticleFormShort
      onSaveArticle={async (data) => {
        console.log(data)
      }}
    />
  )
}

export default Page

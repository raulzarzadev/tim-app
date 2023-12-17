'use client'
import ArticleFormShort from '@/components/ArticleFormShort'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'

const Page = () => {
  return (
    <ArticleFormShort
      onSaveArticle={async (data) => {
        console.log(data)
      }}
    />
  )
}

export default Page

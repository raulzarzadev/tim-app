'use client'
import ArticleFormShort from '@/components/ArticleFormShort'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'

const Page = () => {
  const { userShop } = useUserCompaniesContext()
  return (
    <div>
      <ArticleFormShort companyId={userShop?.id || ''} />
    </div>
  )
}

export default Page

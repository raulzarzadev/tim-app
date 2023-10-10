'use client'
import { useUserCompaniesContext } from '@/context/userCompaniesContext'

import ArticlesList from './ArticlesList'

const CompanyArticles = () => {
  const { currentCompany } = useUserCompaniesContext()
  if (!currentCompany) return <div>Cargando...</div>
  return (
    <div>
      <ArticlesList
        companyId={currentCompany.id}
        articles={currentCompany.articles || []}
      />
    </div>
  )
}

export default CompanyArticles

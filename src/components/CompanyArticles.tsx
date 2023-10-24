'use client'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import ItemsTable from './ItemsTable'

const CompanyArticles = () => {
  const { currentCompany } = useUserCompaniesContext()
  if (!currentCompany) return <div>Cargando...</div>
  return (
    <div>
      <ItemsTable items={currentCompany.articles || []} />
    </div>
  )
}

export default CompanyArticles

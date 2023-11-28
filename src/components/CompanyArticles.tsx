'use client'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import ItemsTable from './ItemsTable'
import ModalItemForm from './ModalItemForm'

const CompanyArticles = () => {
  const { currentCompany } = useUserCompaniesContext()
  if (!currentCompany) return <div>Cargando...</div>
  return (
    <div>
      <ModalItemForm label={`Unidades (${currentCompany.articles?.length})`} />
      <ItemsTable items={currentCompany.articles || []} />
    </div>
  )
}

export default CompanyArticles

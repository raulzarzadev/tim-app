'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import CompanyPayments from './CompanyPayments'
import BasicTabs from './BasicTabs'
import ItemsInUse from './ItemsInUse'
import CompanyCategories from './CompanyCategories'
import CompanyArticles from './CompanyArticles'
import CompanyStaff from './CompanyStaff'

const CompanyAdmin = () => {
  return (
    <div>
      <BasicTabs
        tabs={[
          { label: 'Clientes ', content: <CompanyPayments /> },
          { label: 'En uso', content: <ItemsInUse /> },
          { label: 'Categorias', content: <CompanyCategories /> },
          { label: 'Articulos', content: <CompanyArticles /> },
          { label: 'Staff', content: <CompanyStaff /> }
        ]}
      />
    </div>
  )
}

export default validatePermissions(CompanyAdmin, 'ADMIN')

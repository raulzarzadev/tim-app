'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import BasicTabs from './BasicTabs'
import ItemsInUse from './ItemsInUse'
import CompanyCategories from './CompanyCategories'
import CompanyArticles from './CompanyArticles'
import CompanyStaff from './CompanyStaff'
import ItemsFinished from './ItemsFinished'

const CompanyAdmin = () => {
  return (
    <div>
      <BasicTabs
        tabs={[
          { label: 'Clientes ', content: <></> }, //CompanyPayments
          { label: 'En uso', content: <ItemsInUse /> },
          { label: 'Terminados', content: <ItemsFinished /> },
          { label: 'Categorias', content: <CompanyCategories /> },
          { label: 'Articulos', content: <CompanyArticles /> },
          { label: 'Staff', content: <CompanyStaff /> }
        ]}
      />
    </div>
  )
}

export default validatePermissions(CompanyAdmin, 'ADMIN')

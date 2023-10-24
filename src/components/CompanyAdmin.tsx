'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import BasicTabs from './BasicTabs'
import ItemsInUse from './ItemsInUse'
import CompanyCategories from './CompanyCategories'
import CompanyArticles from './CompanyArticles'
import CompanyStaff from './CompanyStaff'
import ItemsFinished from './ItemsFinished'
import ItemsPending from './ItemsPending'
import CompanyBalances from './cashboxBalances/CompanyBalances'
import CompanyOrders from './CompanyOrders'
import CompanyItems from './CompanyItems'

const CompanyAdmin = () => {
  return (
    <div>
      <BasicTabs
        tabs={[
          //  { label: 'Clientes ', content: <></> }, //CompanyPayments
          { label: 'Ordenes', content: <CompanyOrders /> },
          { label: 'Unidades', content: <CompanyItems /> },
          { label: 'Staff', content: <CompanyStaff /> },
          { label: 'Cortes', content: <CompanyBalances /> }
        ]}
      />
    </div>
  )
}

export default validatePermissions(CompanyAdmin, 'ADMIN')

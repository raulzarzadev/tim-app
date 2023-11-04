'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import BasicTabs from './BasicTabs'
import CompanyStaff from './CompanyStaff'
import CompanyBalances from './cashboxBalances/CompanyBalances'
import CompanyOrders from './CompanyOrders'
import CompanyItems from './CompanyItems'
import CompanyClients from './CompanyClients'

const CompanyAdmin = () => {
  return (
    <div>
      <BasicTabs
        tabs={[
          //  { label: 'Clientes ', content: <></> }, //CompanyPayments
          { label: 'Clientes', content: <CompanyClients /> },
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

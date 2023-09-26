'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import CompanyPayments from './CompanyPayments'
import BasicTabs from './BasicTabs'
import ItemsInUse from './ItemsInUse'

const CompanyAdmin = () => {
  return (
    <div>
      <BasicTabs
        tabs={[
          { label: 'Clientes ', content: <CompanyPayments /> },
          { label: 'En uso', content: <ItemsInUse /> }
        ]}
      />
    </div>
  )
}

export default validatePermissions(CompanyAdmin, 'ADMIN')

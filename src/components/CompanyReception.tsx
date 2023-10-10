'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import ItemsInUse from './ItemsInUse'
import ItemsFinished from './ItemsFinished'
import BasicTabs from './BasicTabs'

const CompanyAdmin = () => {
  return (
    <div>
      <BasicTabs
        tabs={[
          { label: 'En uso ', content: <ItemsInUse /> },
          { label: 'Terminadas', content: <ItemsFinished /> }
        ]}
      />
    </div>
  )
}

export default validatePermissions(CompanyAdmin, 'RECEPTION')

'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import ItemsInUse from './ItemsInUse'
import ItemsFinished from './ItemsFinished'
import BasicTabs from './BasicTabs'
import ItemsPending from './ItemsPending'
import { CashboxContextProvider } from '@/context/useCompanyCashbox'

const CompanyAdmin = () => {
  return (
    <div>
      <CashboxContextProvider>
        <BasicTabs
          tabs={[
            { label: 'Pendientes ', content: <ItemsPending /> },
            { label: 'En uso ', content: <ItemsInUse /> },
            { label: 'Terminadas', content: <ItemsFinished /> }
          ]}
        />
      </CashboxContextProvider>
    </div>
  )
}

export default validatePermissions(CompanyAdmin, 'RECEPTION')

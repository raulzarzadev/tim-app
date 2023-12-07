import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import ErrorBoundary from './ErrorBoundary'

import ItemsTable from './ItemsTable'

const CategoryItems = ({ categoryName }: { categoryName: string }) => {
  const { currentCompany, ordersItems } = useUserCompaniesContext()
  const items = currentCompany?.articles
    ?.filter((i) => i.category === categoryName)
    .map((i) => ({
      ...i,
      inUse: ordersItems.inUse.some((o) => o.itemId === i.id)
    }))

  return (
    <div>
      <ErrorBoundary componentName="CategoryItems">
        <ItemsTable items={items || []} />
      </ErrorBoundary>
    </div>
  )
}

export default CategoryItems

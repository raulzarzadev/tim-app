import { useUserCompaniesContext } from '@/context/userCompaniesContext'

import ItemsStatusTable from './ItemsStatusTable'

const ItemsInUse = () => {
  const { itemsInUse } = useUserCompaniesContext()
  return <ItemsStatusTable items={itemsInUse || []} />
}

export default ItemsInUse

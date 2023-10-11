import { useUserCompaniesContext } from '@/context/userCompaniesContext2'

import ItemsStatusTable from './ItemsStatusTable'

const ItemsInUse = () => {
  const {
    ordersItems: { inUse }
  } = useUserCompaniesContext()
  return <ItemsStatusTable items={inUse || []} />
}

export default ItemsInUse

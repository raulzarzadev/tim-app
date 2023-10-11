import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import ItemsStatusTable from './ItemsStatusTable'

const ItemsPending = () => {
  const { itemsPending } = useUserCompaniesContext()
  return <ItemsStatusTable items={itemsPending || []} />
}

export default ItemsPending
